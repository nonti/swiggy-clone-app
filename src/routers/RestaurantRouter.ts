import { Router } from "express";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { RestaurantController } from "../controllers/RestaurantController";
import { Utils } from "../utils/Utils";
import { RestaurantValidators } from "../validators/RestaurantValidators";

export class RestuarantRouter {
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
    this.router.get("/getRestaurants", GlobalMiddleWare.auth, GlobalMiddleWare.adminRole, RestaurantController.getRestaurants);
    this.router.get("/nearbyRestaurant", GlobalMiddleWare.auth, RestaurantValidators.getNearbyRestaurants(), GlobalMiddleWare.checkError,  RestaurantController.getNearbyRestaurants );
    this.router.get("/searchNearbyRestaurant",
      GlobalMiddleWare.auth,
      RestaurantValidators.searchNearbyRestaurants(),
      GlobalMiddleWare.checkError,
      RestaurantController.searchNearbyResturant);
  }

  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleWare.auth,
      GlobalMiddleWare.adminRole,
      new Utils().multer.single("restaurantImages"),
      RestaurantValidators.addRestaurants(),
      GlobalMiddleWare.checkError,
      RestaurantController.addRestaurant
    );
  }

  putRoutes() {}

  deleteRoutes() {}

  patchRoutes() {}
}

export default new RestuarantRouter().router;
