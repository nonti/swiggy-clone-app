import { Router } from "express";
import { UserContoller } from "../controllers/UserController";
import { UserValidators } from "../validators/UserValidators";

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
    this.router.post('/signup', UserValidators.signup(),  UserContoller.signup);
    this.router.get('/test', UserContoller.signup, UserContoller.test,  UserContoller.test2);
  }

  postRoutes() {
    // this.router.post('/login', UserContoller.login);
  }
  
  putRoutes() { }

  deleteRoutes() { }

  patchRoutes(){}
}

export default new UserRouter().router;