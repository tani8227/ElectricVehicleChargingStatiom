import express from 'express';
import userRouter from './user.js';
import adminRouter from './admin.js';
import * as userController from '../../../controller/user.js'

import passport from '../../../config/passport-jwt.js'


const v1Router = express.Router();

v1Router.get('/getuser',passport.authenticate('jwt', {session:false}), userController.getUser);
v1Router.use('/user', userRouter);
v1Router.use('/admin', adminRouter);





export default v1Router;