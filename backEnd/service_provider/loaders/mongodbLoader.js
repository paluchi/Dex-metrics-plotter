const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const logger = require("pino")(); //logger module

module.exports = async function mongooseLoader() {
  try {
    const connectReq = await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: true,
      useFindAndModify: false,
    });

    logger.info("db connected");
    return connectReq.connection;
  } catch (error) {
    logger.fatal("db can't be reached, ERROR: " + err);
    throw new Error(error)
  }
};
