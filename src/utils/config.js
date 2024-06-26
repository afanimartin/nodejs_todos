import dotenv from "dotenv";
dotenv.config();

const config = {
  MONGODB_URI:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_MONGODB_URI
      : process.env.DEV_MONGODB_URI,
};

export default config;
