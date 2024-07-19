import { Router } from 'express';
import { AddressController } from '../controllers/AddressController';
import { GlobalMiddleWare } from '../middlewares/GlobalMiddleWare';
import { AddressValidators } from '../validators/AddressValidators';

export class AddressRouter {

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
    this.router.get('/userAddresses', GlobalMiddleWare.auth, AddressController.getUserAddresses);
    this.router.get('/checkAddress', GlobalMiddleWare.auth, AddressValidators.checkAddress(), GlobalMiddleWare.checkError, AddressController.checkAddress);
    this.router.get('/getUserLimitedAddresses', GlobalMiddleWare.auth, AddressValidators.getUserLimitedAddresses(), GlobalMiddleWare.checkError, AddressController.getUserLimitedAddresses);
    // this.router.get('/:id', GlobalMiddleWare.auth, AddressController.getAddressesById);
  }

  postRoutes() {
    this.router.post(
      '/create',
      GlobalMiddleWare.auth,
      GlobalMiddleWare.adminRole,
      AddressValidators.addAddress(),
      GlobalMiddleWare.checkError,
      AddressController.addAddress
    );
  }

  putRoutes() {
    this.router.put(
      '/edit/:id',
      GlobalMiddleWare.auth,
      GlobalMiddleWare.adminRole,
      AddressValidators.editAddress(),
      GlobalMiddleWare.checkError,
      AddressController.editAddress
    );
  }

  deleteRoutes() {
    this.router.delete('/delete/:id', GlobalMiddleWare.auth, AddressController.deleteAddress);
  }

  patchRoutes() {
    // this.router.patch(
    //   '/edit/:id',
    //   GlobalMiddleWare.auth,
    //   GlobalMiddleWare.adminRole,
    //   AddressValidators.editAddress(),
    //   GlobalMiddleWare.checkError,
    //   AddressController.editAddress
    // );
  }
}

export default new AddressRouter().router;