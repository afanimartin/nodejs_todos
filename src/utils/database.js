// import MongoMemoryServer from "mongodb-memory-server";
// import mongoose from "mongoose";

// const mongoServer = new MongoMemoryServer();

// const connect = async () => {
//   const uri = await mongoServer.getUri();
//   const mongoOptions = {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//   };

//   await mongoose.connect(uri, mongoOptions);
// };

// const disconnect = async () => {
//   await mongoose.connection.dropDatabase();
//   await mongoose.connection.close();
//   await mongoServer.stop();
// };

// export { connect, disconnect };
