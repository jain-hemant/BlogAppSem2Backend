import { Router } from "express";
import * as categoryController from "../controllers/category.controller.js";

const categoryRoutes = Router();

categoryRoutes.post("/create", categoryController.createCategory);
categoryRoutes.delete("/delete/:categoryId", categoryController.deleteCategory);
categoryRoutes.patch("/update/:categoryId", categoryController.updateCategory);
categoryRoutes.get("/get/:categoryId", categoryController.getCategoryById);
categoryRoutes.get("/get-all", categoryController.getAllCategories);

export default categoryRoutes