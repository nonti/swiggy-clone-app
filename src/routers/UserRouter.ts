import { Router } from 'express';
import { UserContoller } from '../controllers/UserController';
import { UserValidators } from '../validators/UserValidators';
import { GlobalMiddleWare } from '../middlewares/GlobalMiddleWare';

class UserRouter {

  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.deleteRoutes();
    this.patchRoutes();
    this.postRoutes();
    this.putRoutes();
  }

  getRoutes() {
    this.router.get('/send/verification/email', GlobalMiddleWare.auth, UserContoller.resendVerificationEmail);
    this.router.get('/signin', UserValidators.signin(), GlobalMiddleWare.checkError, UserContoller.signin);
    this.router.get('/send/reset/password/token', UserValidators.checkResetPasswordEmail(), GlobalMiddleWare.checkError, UserContoller.sendResetPasswordOtp);
    this.router.get('/verify/resetPasswordToken', UserValidators.verifyResetPasswordToken(), GlobalMiddleWare.checkError, UserContoller.verifyResetPasswordToken);
    this.router.get('/profile',  GlobalMiddleWare.auth, UserContoller.profile);
  }

  postRoutes() {
    this.router.post('/signup', UserValidators.signup(), GlobalMiddleWare.checkError,  UserContoller.signup);
    this.router.post('/refresh_token', GlobalMiddleWare.decodeRefreshToken,  UserContoller.getNewToken);
    this.router.post('/logout', GlobalMiddleWare.auth, GlobalMiddleWare.decodeRefreshToken, UserContoller.logout);
  }
  
  putRoutes() { }

  deleteRoutes() { }

  patchRoutes() {
    this.router.patch('/reset/password', UserValidators.resetPassword(), GlobalMiddleWare.checkError, UserContoller.resetPassword);
    this.router.patch('/verify/emailToken', GlobalMiddleWare.auth, UserValidators.verifyUserEmailToken(),GlobalMiddleWare.checkError, UserContoller.verifyUserEmailToken);
    this.router.patch('/update/phone', GlobalMiddleWare.auth, UserValidators.verifyPhoneNumber(),GlobalMiddleWare.checkError, UserContoller.updatePhoneNumber);
    this.router.patch('/update/profile', GlobalMiddleWare.auth, UserValidators.verifyUserProfile(),GlobalMiddleWare.checkError, UserContoller.updateUserProfile);
  }
}

export default new UserRouter().router;