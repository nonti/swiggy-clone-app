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
    this.router.get('/login', UserContoller.login);
    this.router.get('/test', UserContoller.test, UserContoller.test2);
    
  }

  postRoutes() { }
  
  putRoutes() { }

  deleteRoutes() { }

  patchRoutes(){}
}

export default new UserRouter().router;