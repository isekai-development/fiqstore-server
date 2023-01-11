const mongoose = require("mongoose");

class Database {
  connectMongodb() {
    mongoose
      .connect(process.env.MONGODB)
      .then(() => {
        console.log("Mongodb is connected");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Database;
