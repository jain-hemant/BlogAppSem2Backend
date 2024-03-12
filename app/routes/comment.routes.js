import { Router } from "express";
import * as commentController from "../controllers/comment.controller.js";

const commentRoutes = Router();

commentRoutes.post("/create", commentController.createComment);
commentRoutes.delete("/delete/:commentId", commentController.deleteComment);
commentRoutes.patch("/update/:commentId", commentController.updateComment);
commentRoutes.get("/get/:commentId", commentController.getCommentById);
commentRoutes.get("/get-all", commentController.getAllComments);
commentRoutes.get("/get-all/:blogId", commentController.getAllCommentsByBlog);

export default commentRoutes