import express from 'express';
import { isUser } from '../middleware/auth.js';
import { userController } from '../controllers/users.controller.js';

export const usersRouter = express.Router();

usersRouter.get('/', userController.getAllUsers);
usersRouter.get('/premium/:uid', userController.getUserId);