import express from 'express';
import * as userController from '../../../controller/user.js'
import * as evBunkController from '../../../controller/EVBunk/EVBunk.js'
import * as evBunkSlotController from '../../../controller/EVBunk/EVBunkSlot/EVBunkSlot.js'
import passport from '../../../config/passport-jwt.js';
const adminRouter = express.Router();



adminRouter.post('/create', userController.signUp);
adminRouter.post('/signin',  userController.adminSignIn);
adminRouter.post('/createEVBunk',passport.authenticate('jwt', {session:false}), evBunkController.createEVBunk);
adminRouter.delete('/deleteEVBunk/:id',passport.authenticate('jwt', {session:false}), evBunkController.deleteEVBunk);
adminRouter.get('/getEVBunkList',passport.authenticate('jwt', {session:false}), evBunkController.getBunkList);
adminRouter.get('/getEVBunk/:id',passport.authenticate('jwt', {session:false}), evBunkController.getEVBunk);
adminRouter.post('/createEVBunkSlot',passport.authenticate('jwt', {session:false}), evBunkSlotController.createEVBunkSlot);
adminRouter.get('/getEVBunkWithSlot/:id',passport.authenticate('jwt', {session:false}), evBunkSlotController.getEVBunkWithSlot);






export default adminRouter;