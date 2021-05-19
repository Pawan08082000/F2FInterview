const mongoose = require("mongoose");
const uri =
  "mongodb+srv://root:Pawan08082000@cluster0.mc3wi.mongodb.net/Backend?retryWrites=true&w=majority";
const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to database");
  } catch (e) {
    console.log(e);
    throw e;
  }
};
module.exports = InitiateMongoServer;
