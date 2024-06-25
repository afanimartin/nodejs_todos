import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer = null;

const connect = async () => {
  try {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    console.log(`connecting to ${uri}`);
    await mongoose.connect(uri);
    console.log(`connected to ${uri}`);
    return uri
  } catch (error) {
    throw new Error("Failed to connect ", error.message);
  }
};

const clearData = async () => {
  if(mongoServer){
    const collections = await mongoose.connection.db.collections()
    for(let collection of collections){
      await collection.remove()
    }
  }
}

const disconnect = async () => {
  if (mongoServer) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  }
};

export { connect };
