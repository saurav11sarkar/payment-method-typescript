import mongoose from "mongoose";
import config from "./config";
import app from "./app";

const port = config.port;

const server = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("database connected successfully");
    app.listen(port, () => {
      console.log(`server is running on port http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

server();
