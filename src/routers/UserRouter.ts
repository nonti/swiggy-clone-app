import { Router } from "express";
import { UserContoller } from "../controllers/UserController";
import { UserValidators } from "../validators/UserValidators";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";

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
    this.router.get('/send/verification/email', UserValidators.verifyUserForResendEmail(), UserContoller.resendVerificationEmail);
  }

  postRoutes() {
    this.router.post('/signup', UserValidators.signup(), GlobalMiddleWare.checkError,  UserContoller.signup);
  }
  
  putRoutes() { }

  deleteRoutes() { }

  patchRoutes() {
    this.router.patch('/verify', UserValidators.verifyUser(),GlobalMiddleWare.checkError,  UserContoller.verify);
  }
}

export default new UserRouter().router;