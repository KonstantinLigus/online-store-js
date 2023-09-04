import mongoose from "mongoose";

const { HOST_DB } = process.env;

export default async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  try {
    await mongoose.connect(HOST_DB);
    mongoose.Promise = global.Promise;
    console.log("database was connected");
  } catch (error) {
    console.log("database error connection:", error);
  }
}
