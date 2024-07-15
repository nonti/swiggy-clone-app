import { Environment } from "./environment";

export const DevEnvironment: Environment = {
  db_uri: 'mongodb+srv://nontis:<password>@swiggycloneapp.fdw8veb.mongodb.net/swiggyCloneApp?retryWrites=true&w=majority&appName=swiggyCloneApp', 
  jwt_secret_key: 'secretkey',
  sendgrid: {
    api_key: 'sendgrid',
    email_from: 'nonty8@gmail.com',
  },
  gmail_auth: {
    user: 'nonty@gmail.com',
    pass: 'password',
  },
};