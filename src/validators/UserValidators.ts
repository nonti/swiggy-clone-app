import { body,query } from "express-validator";
import User from "../models/User";
import {  } from "express";

export class UserValidators {
  
  static signup() {
    return [
      body('name', 'Name is required').isString(),
      body('email', 'Email is required').isEmail()
        .custom((email, { req }) => {
          return User.findOne({
            email: email
          }).then(user => {
            if (user) {
              // throw new Error('User Already Exists');
              throw ('User Already Exists');
            } else {
              return true;
            }
          }).catch(err => {
            throw new Error(err);
          })
        }),
      body('password', 'Password is required').isAlphanumeric()
        .isLength({ min: 8, max: 20 })
        .withMessage('Password must be between 8  and 20 characters'),
      body('type', 'User role type is required').isString(),
      body('status', 'User status is required').isString(),
      body('phone', 'Phone number is required').isString(),         
    ];
  }

  static signin() {
    return [
      query('email', 'Email is required').isEmail()
        .custom((email, { req }) => {
          return User.findOne({
            email: email
          }).then(user => {
            if (user) {
              req.user = user;
              return true;
            } else {
              // throw new Error('User  Does Not Exist');
              throw ('No User Registered With Such Email');
            }
          }).catch(err => {
            throw new Error(err);
          })
        }),
      query('password', 'Password is required').isAlphanumeric()
    ];
  }

  static verifyUserEmailToken() {
    return [
      body('verification_token', 'Email verification token is required').isNumeric(),
    ];
  }

  static checkResetPasswordEmail() {
    return [
      query('email', 'Email is required').isEmail()
        .custom((email, { req }) => {
          return User.findOne({
            email: email
          }).then(user => {
            if (user) {
              return true;
            } else {
              // throw new Error('User  Does Not Exist');
              throw ('No User Registered With Such Email');
            }
          }).catch(err => {
            throw new Error(err);
          })
        }),
    ];
  }

  static verifyResetPasswordToken() {
  return [
    query('email', 'Email is required').isEmail(),
    query('reset_password_token', 'Reser password token is required').isNumeric()
        .custom((reset_password_token, { req }) => {
          return User.findOne({
            email: req.query.email,
            reset_password_token: reset_password_token,
            reset_password_token_time: {$gt: Date.now()}
          }).then(user => {
            if (user) {
              return true;
            } else {
              // throw new Error('User  Does Not Exist');
              throw ('Reset Password Token doesn\'t exist. Please regenerate a token');
            }
          }).catch(err => {
            throw new Error(err);
          })
        }),
    ];
  }
  
  static resetPassword() {
    return [
      body('email', 'Email is required').isEmail()
      .custom((email, { req }) => {
          return User.findOne({
            email: email
          }).then(user => {
            req.user = user;
            if (user) {
              return true;
            } else {
              // throw new Error('User  Does Not Exist');
              throw ('No User Registered with such Email');
            }
          }).catch(err => {
            throw new Error(err);
          })
        }),
    body('new_password', 'New password is required').isAlphanumeric(),
      body('otp', 'Reset password token is required').isNumeric()
        .custom((reset_password_token, { req }) => {
          if (req.user.reset_password_token == reset_password_token) {
              return true;
          } else {
            req.errorStatus = 422;
              // throw new Error('Reset Password Token is invalid, please try again');
              throw ('Reset Password Token is invalid. Please try again');
            }
        })
    ];
  }

  static verifyPhoneNumber() {
    return [
      body('phone', 'Phone Number is required').isString(),
    ];
  }

  static verifyUserProfile() {
    return [
      body('phone', 'Phone Number is required').isString(),
      body('email', 'Email is required').isEmail()
        .custom((email, { req }) => {
          console.log(email);
        // if (req.user.email === email) throw ('Please provide a new unique email address to update the user profile');
          return User.findOne({
            email: email
          }).then(user => {
            if (!user) {
              // throw new Error('A User witn entered email already exists, please provide a uniques email id');
              throw ('User entered email already exists, please provide a uniques email id');
            } else {
              return true;
            }
          }).catch(err => {
            throw new Error(err);
          })
      }),
      body('password', 'Password is required').isAlphanumeric(),
    ];
  }
}

  
