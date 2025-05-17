import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  database_url: process.env.DB_URL,
  env: process.env.NODE_ENV,
  round: process.env.SALT_ROUND,
  jwt_secret: process.env.JWT_SECRET,
  store_id: process.env.STORE_ID,
  store_password: process.env.STORE_PASSWORD,
};
