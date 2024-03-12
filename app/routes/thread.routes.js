import { Router } from "express";
import * as threadController from "../controllers/threadComment.controller.js";

const threadRoutes = Router();

threadRoutes.post("/create", threadController.createThread);
threadRoutes.delete("/delete/:threadId", threadController.deleteThread);
threadRoutes.patch("/update/:threadId", threadController.updateThread);
threadRoutes.get("/get/:threadId", threadController.getThreadById);
threadRoutes.get("/get-all", threadController.getAllThreads);

export default threadRoutes;
