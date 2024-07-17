import User from "../models/User";
import { Jwt } from "../utils/Jwt";
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
        // user_id: user._id,
        aud: user._id,
        email: user.email,
        type: user.type
      }
      const token = Jwt.jwtSign(payload);
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

  static async verifyUserEmailToken(req, res, next) {
    const verification_token = req.body.verification_token;
    const email = req.user.email;
    try {
      const user = await User.findOneAndUpdate(
        {
          email: email,
          verification_token: verification_token,
          verification_token_time: { $gt: Date.now() }
        },
        {
          email_verified: true,
          updated_at: new Date()
        },
        {
          new: true
        }
      );
      if (user) {
        //update and send 
        res.send(user);
      } else {
        throw new Error('Wrong Otp or Email verification token expired. Please try again');
      }
    } catch (err) {
      next(err);
    }
  }

  static async resendVerificationEmail(req, res, next) {
    const email = req.user.email;
    const verification_token = Utils.generateVerificationToken();
    try {
      const user = await User.findOneAndUpdate(
        { email: email },
        {
          updated_at: new Date(),
          verification_token: verification_token,
          verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME
        }
      );
      if (user) {
        //update and send 
        res.json({success: true});
        await NodeMailer.sendMail({
          to: [user.email],
          subject: 'Resend Email Verification',
          html: `<h1>Your otp is ${verification_token}</h1>`
        });
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
        // user_id: user._id,
        aud: user._id,
        email: user.email,
        type: user.type,
      }
      const token = Jwt.jwtSign(payload);
      res.json({
        token: token,
        user: user
      });
    } catch (err) {
      next(err);
    }
  }        

  static async sendResetPasswordOtp(req, res, next) { 
    const email = req.query.email;
    const reset_password_token = Utils.generateVerificationToken();
    try {
      const user = await User.findOneAndUpdate(
        { email: email },
        {
          updated_at: new Date(),
          reset_password_token: reset_password_token,
          reset_password_token_time: Date.now() + new Utils().MAX_TOKEN_TIME
        }
      );
      if (user) {
        //update and send 
        res.json({success: true});
        await NodeMailer.sendMail({
          to: [user.email],
          subject: 'Reset password email verification OTP',
          html: `<h1>Your otp is ${reset_password_token}</h1>`
        });
      } else {
        throw new Error('User Does Not Exist');
      }
    } catch (err) {
      next(err);
    }
  }

  static verifyResetPasswordToken(req, res, next) {
    res.json({ success: true });
  }

  static async resetPassword(req, res, next) {
    const user = req.user;
    const new_password = req.body.new_password;
    try {
      const encrypted_password = await Utils.encryptPassword(new_password);
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
          updated_at: new Date(),
          password: encrypted_password
        },
        { new: true }
      );
      if (updatedUser) {
        res.send(updatedUser);
      } else {
        throw new Error('User Does Not Exist');
      }
    } catch (err) {
      next(err);
    }
  }

  static async profile(req, res, next) {
    const user = req.user;
    try {
      const profile = await User.findById(user.aud);
      if (profile) {
        res.send(profile);
      } else {
        throw new Error('User Does Not Exist');
      }
    } catch (err) {
      next(err);
    }
  }

  static async updatePhoneNumber(req, res, next) {
    const user = req.user;
    const phone = req.body.phone;
    try {
      const userData = await User.findByIdAndUpdate(
        user.aud,
        { phone: phone, updated_at: new Date() },
        {new: true}
      );
      res.send(userData);
    } catch (error) {
      next(error);
    }
  }
  
  static async updateUserProfile(req, res, next) {
    const user = req.user;
    const phone = req.body.phone;
    const new_email = req.body.email;
    const plain_password = req.body.password;
    const verification_token = Utils.generateVerificationToken();
    try {
      const userData = await User.findById(user.aud);
        if(!userData) throw new Error('User doesn\'t exist');
      await Utils.comparePassword({
        password: plain_password,
        encrypt_password: userData.password
      });
      const updatedUser = await User.findByIdAndUpdate(
        user.aud,
        {
          phone: phone,
          email: new_email,
          email_verified: false,
          verification_token,
          verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
          updated_at: Date.now()
        },
        {new:true}
      );
      const payload = {
        // user_id: user._id,
        aud: user.aud,
        email: updatedUser.email,
        type: updatedUser.type
      }
      const token = Jwt.jwtSign(payload);
      res.json({
        token: token,
        user: updatedUser
      });
      await NodeMailer.sendMail({
        to: [updatedUser.email],
        subject: 'Email Verification',
        html: `<h1>Your otp is ${verification_token}</h1>`
      });
    } catch (error) {
      next(error);
    }
  }
}