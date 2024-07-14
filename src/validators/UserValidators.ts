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
              throw('User Already Exists');
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

            
    ]
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
              throw('No User Registered With Such Email');
            }
          }).catch(err => {
            throw new Error(err);
          })
      }),  
      query('password', 'Password is required').isAlphanumeric()     
    ]
  }

  static verifyUser() {
    return [
      body('verification_token', 'Email verification token is required').isNumeric(),      
      body('email', 'Email is required').isEmail(),            
    ]
  }

  static verifyUserForResendEmail() {
    return [query('email', 'Email is required').isEmail()];
  }
}