import User from "../models/User";
import { Utils } from "../utils/Utils";

export class UserContoller {

  static async signup(req, res, next) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const type = req.body.type;
    const status = req.body.status;
    const phone = req.body.phone;

    const data = {
      email,
      verification_token: Utils.generateVerificationToken(5),
      verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
      password,
      name,
      type,
      phone,
      status
    };

    try {
      let user = await new User(data).save();
      //send email to user for verification
      res.send(user);
    } catch (error) {
      next(error);
    }
  }

  static async verify(req, res, next) {
    const verification_token = req.body.verification_token;
    const email = req.body.email;
    try {
      const user = await User.findOneAndUpdate(
        {
          email: email,
          verification_token: verification_token,
          verification_token_time: { $gt: Date.now() }
        },
        {
          email_verified: true
        },
        {
          new: true
        }
      );
      if (user) {
          //update and send 
      } else {
        throw new Error('Email verification token expired. Please try again');
      }
    } catch (err) {
      next(err);
    }
  }
}

