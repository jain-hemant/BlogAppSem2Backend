import { verifyPassword } from "../lib/argon2.js";
import User from "../models/user.model.js"
import { createSession, decodeSession } from "../utility/session.utility.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    let user = await User.findOne({ email }).lean();
    if (!user) {
      return res.status(400).json({
        message: "This email is not registered, try to signup",
      });
    }

    if (user.status === "inactive") {
      return res.status(400).json({ message: "User is inactive" });
    }

    const isCorrectPassword = await verifyPassword(user.password, password);

    if (user && isCorrectPassword) {
      const cookieData = createSession(user._id, req.headers["user-agent"]);
      res.cookie("sessionId", cookieData.sessionId, {
        httpOnly: true,
        maxAge: cookieData.maxAge,
      });
      return res.json({
        isAuthenticated: true,
        user
      });
    }

    return res.status(400).json({
      message: "Invalid credentials",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to Login : ${error.message}` });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("sessionId", "", {
      httpOnly: true,
      maxAge: new Date(0), // Set the expiration date to the past
    });
    res.status(200).json({message: "Logout successful"});
  } catch (error) {
    res.status(500).json({message: `Failed to logout: ${error.message}`});
  }
};

async function isAuthenticated(req, res) {
  try {
    const { sessionId } = req.cookies;

    if (!sessionId) {
      return res.status(403).send("Unauthorized");
    }
    const { userId, error } = decodeSession(
      sessionId,
      req.headers["user-agent"]
    );

    let user = await User.findById(userId).select(
      "name email leaveBalance leaves status currentWorkspace workspaceThemes currentWorkspace timer"
    );

    if (error || !user) {
      return res.status(403).json({ message: "invalid session" });
    }

    const cookieData = createSession(user._id, req.headers["user-agent"]);
    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      maxAge: cookieData.maxAge,
    });

    return res.json({
      isAuthenticated: true,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}

export {
    login,
    logout,
    isAuthenticated
}