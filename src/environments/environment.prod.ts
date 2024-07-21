import { Utils } from "../utils/Utils";
import { Environment } from "./environment";

Utils.dotenvConfigs();

export const ProdEnvironment: Environment = {
  db_uri: process.env.PROD_DB_URI, 
  jwt_secret_key: process.env.PROD_JWT_SECRET_KEY,
  jwt_refresh_secret_key: process.env.PROD_JWT_REFRESH_TOKEN_SECRET,
  sendgrid: {
    api_key: process.env.PROD_SENDGRID_API_KEY,
    email_from: process.env.PROD_SENDGRID_SENDER_EMAIL,
  },
  gmail_auth: {
    user: process.env.PROD_GMAIL_USER,
    pass: process.env.PROD_GMAIL_PASS
  },
};