import express from 'express';
import * as userController from '../../../controller/user.js'
import * as evBunkController from '../../../controller/EVBunk/EVBunk.js'
import * as evBunkSlotController from '../../../controller/EVBunk/EVBunkSlot/EVBunkSlot.js'
import passport from '../../../config/passport-jwt.js';
const userRouter = express.Router();




userRouter.post('/create', userController.signUp);
userRouter.post('/signin',  userController.userSignIn);
userRouter.get('/getNearByBunkList',passport.authenticate('jwt', {session:false}), evBunkController.getNearByBunkList);
userRouter.get('/getEVBunkSlot/:id',passport.authenticate('jwt', {session:false}), evBunkSlotController.getEVBunkSlot);
userRouter.post('/bookEVBunk',passport.authenticate('jwt', {session:false}), evBunkSlotController.bookEVBunkSlot);





export default userRouter;