import { Router } from 'express';
import { GlobalMiddleWare } from '../middlewares/GlobalMiddleWare';
import { BannerValidators } from '../validators/BannerValidators';
import { BannerController } from '../controllers/BannerController';
import { Utils } from '../utils/Utils';

export class BannerRouter {
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
    this.router.get(
      '/banners',
      GlobalMiddleWare.auth,
      BannerController.getBanners
    );
  }

  postRoutes() {
    this.router.post(
      '/create',
      GlobalMiddleWare.auth,
      GlobalMiddleWare.adminRole,
      new Utils().multer.single('bannerImages'),
      BannerValidators.addBanner(),
      GlobalMiddleWare.checkError,
      BannerController.addBanner
    );
  }

  putRoutes() {}

  deleteRoutes() {}

  patchRoutes() {}
}

export default new BannerRouter().router;
