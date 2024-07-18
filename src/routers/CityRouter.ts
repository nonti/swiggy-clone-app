
import { Router } from 'express';
import { GlobalMiddleWare } from '../middlewares/GlobalMiddleWare';
import { CityValidators } from '../validators/CityValidators';
import { CityController } from '../controllers/CityController';

export class CityRouter {

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
    this.router.get('/cities', CityController.getCities);
  }

  postRoutes() {
    this.router.post('/create', CityValidators.addCity(), GlobalMiddleWare.checkError, CityController.addCity);
  }
  
  putRoutes() { }

  deleteRoutes() { }

  patchRoutes() {  }
}

export default new CityRouter().router;

