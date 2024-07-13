import { Router } from "express";
import { UserContoller } from "../controllers/UserController";

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
    this.router.post('/login', UserContoller.login);
    this.router.get('/test', UserContoller.login, UserContoller.test,  UserContoller.test2);
  }

  postRoutes() {
    // this.router.post('/login', UserContoller.login);
  }
  
  putRoutes() { }

  deleteRoutes() { }

  patchRoutes(){}
}

export default new UserRouter().router;