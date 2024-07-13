import User from "../models/User";
import { body, validationResult } from 'express-validator';

export class UserContoller {

  static signup(req, res, next) {
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
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array().map(x => x.msg)});
    }

  //   const user = new User({
  //     email,
  //     password
  //   });

  //   user.save().then((user) => {
  //     res.send(user);
  //   }).catch((err) => {
  //     next(err);
  //   });
  }

  static test(req, res, next) {
    console.log('test');
    (req as any).msg = 'This is a test';
    next();
  }

  static test2(req, res) {
    res.send((req as any).msg);
  }
}

