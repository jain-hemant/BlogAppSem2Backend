import {Router} from 'express'
import * as userController from '../controllers/user.controller.js';

const userRoutes = Router();

userRoutes.post('/create', userController.createUser);
userRoutes.delete('/delete/:userId', userController.deleteUser);
userRoutes.patch('/update/:userId', userController.updateUser);
userRoutes.get('/get/:userId', userController.getUser);
userRoutes.get('/get-all', userController.getAllUsers);


export default userRoutes;