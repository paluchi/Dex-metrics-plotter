import mongoose from "mongoose";
import mongooseModels from "../mongooseModels";

// Create mongodb connection
async function mongooseLoader() {
  mongooseModels; // Loads all models when declared

  const dbRoute: string = process.env.MONGO_DB_URL
    ? process.env.MONGO_DB_URL
    : "AddMongoDBRoute";
  try {
    const connectReq = await mongoose.connect(`${dbRoute}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: true,
      useFindAndModify: false,
    });

    console.log(
      `database connected. connection status: ${connectReq.connection.readyState}`
    );
    return connectReq.connection;
  } catch (error: any) {
    console.log(`db can't be reached, ERROR: ${error}`);
    throw new Error(error);
  }
}

export = mongooseLoader;
