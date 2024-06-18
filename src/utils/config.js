import dotenv from "dotenv";
dotenv.config();

const config = {
  MONGODB_URI:
    process.env.NODE_ENV === "development"
      ? process.env.DEV_MONGODB_URI
      : process.env.PROD_MONGODB_URI,
  PORT: process.env.PORT
};

export { config };
