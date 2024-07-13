import User from "../models/User";

export class UserContoller {

  static login(req, res, next) {
    // const data = [{ name: 'Rhandzu' }];
    // res.status(200).send(data);
    // (req as any).errorStatus = 422;
    // const error = new Error('User Email or Password does not match');
    // next(error);
    // res.send(req.body);

    const email = req.body.email;
    const password = req.body.password;

    const user = new User({
      email,
      password
    });

    user.save().then((user) => {
      res.send(user);
    }).catch((err) => {
      next(err);
    });
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

