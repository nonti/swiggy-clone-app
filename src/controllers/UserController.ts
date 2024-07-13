import User from "../models/User";
import { body, validationResult } from 'express-validator';

export class UserContoller {

  static async signup(req, res, next) {
    // const data = [{ name: 'Rhandzu' }];
    // res.status(200).send(data);
    // (req as any).errorStatus = 422;
    // const error = new Error('User Email or Password does not match');
    // next(error);
    // res.send(req.body);
    const errors = validationResult(req);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const type = req.body.type;
    const status = req.body.status;
    const phone = req.body.phone;

    if (!errors.isEmpty()) {
      return next(new Error(errors.array()[0].msg));
    }

    const data = {
      email,
      password,
      name,
      type,
      phone,
      status
    };

    try {
      let user = await new User(data).save();
      res.send(user);
    } catch (error) {
      next(error);
    }
  }
}

