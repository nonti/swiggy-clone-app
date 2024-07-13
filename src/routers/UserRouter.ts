import { Router } from "express";

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
    this.router.get('/login', (req, res) => {
    const data = [{ name: 'Rhandzu' }];
    res.status(200).send(data);
  });

  this.router.get('/test', (req, res, next) => {
    console.log('test');
    (req as any).msg = 'This is a test';
    next();

  }, (req, res) => {
    res.send((req as any).msg);
  });
  }

  postRoutes() { }
  
  putRoutes() { }

  deleteRoutes() { }

  patchRoutes(){}
}

export default new UserRouter().router;