const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const logger = require("pino")(); //logger module

require("../mongooseModels"); // Loads all mongoose models

// Create mongodb connection
module.exports = async function mongooseLoader() {
  const dbRoute = process.env.MONGO_DB_URL;
  try {
    const connectReq = await mongoose.connect(`${dbRoute}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: true,
      useFindAndModify: false,
    });

    logger.info(
      `database connected. connection status: ${connectReq.connection.readyState}`
    );
    return connectReq.connection;
  } catch (error) {
    logger.fatal("db can't be reached, ERROR: " + error);
    throw new Error(error);
  }
};
