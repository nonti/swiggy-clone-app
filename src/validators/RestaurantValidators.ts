import { body,query } from "express-validator";
import User from "../models/User";

export class RestaurantValidators {
  
  static addRestaurants() {
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
      
      body('restaurantsImages', 'Resturant image is required')
        .custom((restaurants, { req }) => {
          if (req.file) {
            return true;
          } else {
            // throw new Error('File dnot uploaded');
            throw ('File not uploaded');
          }
        }),      
      body('phone', 'Phone number is required').isString(),      
      body('res_name', 'restaurants Name  is required').isString(),
      body('short_name', 'restaurants Short Name is required').isString(),
      body('open_time', 'Open Time is required').isString(),
      body('close_time', 'Close Time is required').isString(),
      body('delivery_time', 'Delivery Time is required').isNumeric(),
      body('price', 'Price is required').isNumeric(),
      body('address', 'Address is required').isString(),
      body('status', 'Status is required').isString(),
      body('location', 'Location is required').isString(),
      body('cuisines', 'Cuisines is required').isString(),
      body('city_id', 'City Id is required').isString(),
    ];
  }

  static getNearbyRestaurants() {
    return [
      query('lat', 'Latitude is required').isNumeric(),
      query('lng', 'Longitude is required').isNumeric(),
      query('radius', 'Radius is required').isNumeric()
    ]
  }
  static searchNearbyRestaurants() {
    return [
      query('lat', 'Latitude is required').isNumeric(),
      query('lng', 'Longitude is required').isNumeric(),
      query('radius', 'Radius is required').isNumeric(),
      query('name', 'Search query is required').isString()
    ]
  }
}