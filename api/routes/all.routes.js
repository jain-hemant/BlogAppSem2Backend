import authRoutes from "./auth.routes.js";
import blogRoutes from "./blog.routes.js";
import threadRoutes from "./thread.routes.js";
import userRoutes from "./user.routes.js"
import commentRoutes from "./comment.routes.js"
import categoryRoutes from "./category.routes.js"

export default async function routes(app) {
    app.use('/api/user', userRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/blog', blogRoutes);
    app.use('/api/thread', threadRoutes);
    app.use('/api/comment', commentRoutes);
    app.use('/api/category', categoryRoutes);
}