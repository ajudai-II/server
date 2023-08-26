import mongoose from "mongoose";
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose
      .connect(process.env.MONGODB_URI!)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.error("Could not connect to Database", err));
  } catch (error) {
    console.error("Error on function connectToMongo", error);
  }
};

export default connectToMongo;
