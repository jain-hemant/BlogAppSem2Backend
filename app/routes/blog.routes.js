import {Router} from 'express'
import * as blogConroller from '../controllers/blog.controller.js';

const blogRoutes = Router();

blogRoutes.post('/create',blogConroller.createBlog)
blogRoutes.delete('/delete/:blogId', blogConroller.deleteBlog);
blogRoutes.patch('/update/:blogId', blogConroller.updateBlog);
blogRoutes.get('/get/:blogId', blogConroller.getBlogById);
blogRoutes.get('/get-all', blogConroller.getAllBlogs);
blogRoutes.get('/get-all/:categoryId', blogConroller.getAllBlogsByCategory);

export default blogRoutes;