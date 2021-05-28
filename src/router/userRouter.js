import express from 'express';
import { edit, remove, logout, detail } from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/logout', logout);
userRouter.get('/edit', edit);
userRouter.get('/remove', remove);
userRouter.get('/:id(\\d+)', detail);

export default userRouter;
