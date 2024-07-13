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
  }

  postRoutes() {
    this.router.post('/signup', UserValidators.signup(),  UserContoller.signup);
  }
  
  putRoutes() { }

  deleteRoutes() { }

  patchRoutes(){}
}

export default new UserRouter().router;