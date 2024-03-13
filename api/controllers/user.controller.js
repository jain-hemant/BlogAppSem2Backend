import { hashPassword } from '../lib/argon2.js';
import User from '../models/user.model.js'
import { isValidObjectId } from '../utility/db.utility.js';

async function createUser(req, res){
    const {name, email, password} = req.body;

    try {
            if(!name || !email || !password){
                 return res.status(400).json({ message: 'name, email and password all are required' });
            }
            // Check if the email already exists in the database
            const existingUser = await User.findOne({  email });
            
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            // Check if the password meets the length requirement
            if (password.length < 8) {
                return res.status(400).json({ message: 'Password should be at least 8 characters long' });
            }

            // Hash the password before storing it in the database
            const hashedPassword = await hashPassword(password)

            // Create a new user
            const user = new User({
            name,
            email,
            password: hashedPassword,
            });

            // Save the user to the database
            const savedUser = await user.save();

            // Send the saved user as the response
            res.json(savedUser);

        } catch (err) {
            // Send an error response if something goes wrong
            res.status(500).json({ message: err.message });
        }
    }


async function deleteUser(req, res) {
    const { userId } = req.params;

    try {
        // Check if the user ID is valid
    if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: 'Invalid user ID provided.' });
    }

    const user = await  User.findById(userId);

    if(!user){
        return res.status(400).json({ message: 'Invalid user ID provided.' });
    }
    
    await User.findByIdAndDelete(userId);

    res.json({
        userId, 
        message:'User deleted successfully.'
    })
    } catch (error) {
        // Send an error response if something goes wrong
        res.status(500).json({ message: error.message });
    }
    
}

async function updateUser(req, res){
    const updates = req.body;
    const { userId } = req.params;
    
    const {
        name,
        password,
        role,
    } = updates;
    

    if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: 'Invalid user ID provided.' });
    }
    try {
        const user = await User.findById(userId);

        if(!user){
            return res.status(400).json({ message: 'Invalid user ID provided.' });
        }

        if(name){
            user.name = name
        }

        if(role){
           user.role = role;
        }

        if(password){
            user.password  = await hashPassword(password)
        }

       await user.save()
       return res.json({user});

    } catch (error) {
         // Send an error response if something goes wrong
        res.status(500).json({ message: error.message });
    }
}

async function getUser(req, res){
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: 'Invalid user ID provided.' });
    }

    try {
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(400).send();
        }

        res.json(user);
    } catch (error) {
        // Send an error response if something goes wrong
        res.status(500).json({ message: error.message });
    }
}


async function getAllUsers(req, res){
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        // Send an error response if something goes wrong
        res.status(500).json({ message: error.message });
    }
}


export {
    createUser,
    deleteUser,
    updateUser,
    getUser,
    getAllUsers
}