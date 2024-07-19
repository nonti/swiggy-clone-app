import Address from "../models/Address";

export class AddressController {

  static async addAddress(req, res, next) {
    const data = req.body;
    const user_id = req.user.aud;
    try {
      const addressData = {
        user_id,
        title: data.title,
        address: data.address,
        landmark: data.landmark,
        house: data.house,
        lat: data.lat,
        lng: data.lng
      }
      const address = await new Address(addressData).save();
      delete address.user_id;
      res.send(address);
    } catch (err) {
      next(err);
    }
  }

  static async getAddresses(req, res, next) {
    const user_id = req.user.aud;
    try {
      const addresses = await Address.find({ user_id }, {user_id: 0, __v: 0});
      res.send(addresses);
    } catch (err) {
      next(err)
    }
  }
  static async getLimitedAddresses(req, res, next) {
    const user_id = req.user.aud;
    const limit = req.query.limit;
    try {
      const addresses = await Address.find({ user_id }, {user_id: 0, __v: 0}).limit(limit);
      res.send(addresses);
    } catch (err) {
      next(err)
    }
  }

  static async deleteAddress(req, res, next) {
    const user_id = req.user.aud;
    const id = req.params.id;
    try {
      await Address.findOneAndDelete(
        {
          user_id,
          _id: id
        }
      );
      res.json({success: true});
    } catch (err) {
      next(err)
    }
  }
  
  static async getAddressesById(req, res, next) {
    const user_id = req.user.aud;
    const id = req.params.id;
    try {
      const address = await Address.findOne(
        {
          user_id,
          _id: id
        }
      );
      res.send(address);
    } catch (err) {
      next(err)
    }
  }

  static async editAddress(req, res, next) {
    const user_id = req.user.aud;
    const id = req.params.id;
    const data = req.body;
    try {
      const address = await Address.findOneAndUpdate(
        {
          user_id,
          _id: id
        },
        {
          title: data.title,
          address: data.address,
          landmark: data.landmark,
          house: data.house,
          lat: data.lat,
          lng: data.lng,
          updated_at: new Date()
        },
        { new: true }
      );
      if (address) {
        res.send(address);
      } else {
        // throw new Error('Address does not exist');
        throw ('Address does not exist');
      }
    } catch (err) {
      next(err)
    }
  }

  static async checkAddress(req, res, next) {
    const user_id = req.user.aud;
    const data = req.query;
    try {
      const address = await Address.findOne(
        { user_id, lat: data.lat, lng: data.lng },
        { user_id: 0, __v: 0 });
      res.send(address);
    } catch (err) {
      next(err)
    }
  }
}