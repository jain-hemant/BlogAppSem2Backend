import {Router} from 'express'
import * as authController from '../controllers/auth.controller.js';

const authRoutes = Router();

authRoutes.post('/login',authController.login)
authRoutes.post('/logout', authController.logout);
authRoutes.get('/isAuthenticated', authController.isAuthenticated);


export default authRoutes;