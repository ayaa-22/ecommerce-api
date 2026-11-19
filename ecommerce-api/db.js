import mongoose from "mongoose";

function connectToDB() {
  mongoose
    .connect("mongodb://localhost:27017/nodeMongoDB")
    .then(() => {
      console.log(`Connected To DB!`);
    })
    .catch((err) => {
      console.log(err);
    });
}

export default connectToDB;
