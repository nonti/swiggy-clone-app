
export class UserContoller {

  static login(req, res, next) {
    // const data = [{ name: 'Rhandzu' }];
    // res.status(200).send(data);
    const error = new Error('User Email or Password does not match');
    next();
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

