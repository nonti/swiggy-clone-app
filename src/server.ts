import * as express from 'express';
import * as mongoose from 'mongoose';
import { getEnvironmentVariables } from './environments/environment';
import UserRouter from './routers/UserRouter';


export class Server {
  
  public app: express.Application = express();
  
  constructor() {
    this.setConfigs();
    this.setRoutes();
    this.error404Handler();
    this.handleErrors();
  }

  setConfigs() {
    this.connectMongoDB();
  }

  connectMongoDB() {
    mongoose.connect(getEnvironmentVariables().db_uri)
      .then(() => {
        console.log('Connected to MongoDB.');
      });
  }

  setRoutes() {
    this.app.use('/api/user/', UserRouter);
  }

  error404Handler() {
    this.app.use((req, res) => {
      res.status(404).json({
        message: 'Not Found',
        status_code: 404
      });
    });
  }

  handleErrors() {
    this.app.use((error, req, res, next) => {
      const errorStatus = req.errorStatus || 500;
        res.status(errorStatus).json({
          message: error.message || 'Something went wrong. Please try again',
          status_code: errorStatus
      });
    });
  }
}