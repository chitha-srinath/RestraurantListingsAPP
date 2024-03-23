import mongoose from "mongoose";
import "dotenv/config";
export default async function DbConnection() {
  // Create a new DB connection

  let db = await mongoose.connect(process.env.MongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return db;
}
