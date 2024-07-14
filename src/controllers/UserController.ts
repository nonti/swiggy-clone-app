import User from "../models/User";
import { NodeMailer } from "../utils/NodeMailer";
import { Utils } from "../utils/Utils";
export class UserContoller {
  
  static async signup(req, res, next) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const type = req.body.type;
    const status = req.body.status;
    const phone = req.body.phone;
    const verification_token = Utils.generateVerificationToken();
    
    try {
      const hash = await Utils.encryptPassword(password);
      const data = {
        email,
        verification_token,
        verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
        password: hash,
        name,
        type,
        phone,
        status
    };

      let user = await new User(data).save();
      //send email to user for verification
      const payload = {
        user_id: user._id,
        email: user.email,
      }
      const token = Utils.jwtSign(payload);
      res.json({
        token: token,
        user: user
      });
      await NodeMailer.sendMail({
        to: [user.email],
        subject: 'Email Verification',
        html: `<h1>Your otp is ${verification_token}</h1>`
      });
      res.send(user);
    } catch (err) {
      next(err);
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

  static async resendVerificationEmail(req, res, next) {
    const email = req.query.email;
    const verification_token = Utils.generateVerificationToken();
    try {
      const user = await User.findOneAndUpdate(
        { email: email },
        {
          verification_token: verification_token,
          verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME
        }
      );
      if (user) {
        //update and send 
        await NodeMailer.sendMail({
          to: [user.email],
          subject: 'Resend Email Verification',
          html: `<h1>Your otp is ${verification_token}</h1>`
        });
        res.json({success: true});
      } else {
        throw new Error('User Does Not Exist');
      }
    } catch (err) {
      next(err);
    }
  }

  static async signin(req, res, next) {
    const user = req.user;
    const password = req.query.password;
    const data = {
      password,
      encrypt_password: req.user.password
    };
    try {
    await Utils.comparePassword(data);
      const payload = {
        user_id: user._id,
        email: user.email,
      }
      const token = Utils.jwtSign;
      res.json({
        token: token,
        user: user
      });
    } catch (err) {
      next(err);
    }
  }

        
}