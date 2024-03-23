import mongoose from "mongoose";

const MongoSchema = mongoose.Schema;

let roles = process.env.Roles.split(", ");
const UserSChema = new MongoSchema(
  {
    UserName: { type: String },
    UserId: { type: String, required: true },
    Mobile: {
      type: Number,
      min: 6000000000,
      max: 9999999999,
      unique: true,
      sparse: true,
    },
    Email: { type: String, unique: true, required: true },
    Password: {
      type: String,
      required: true,
    },
    RefreshToken: { type: String },
    Role: {
      type: String,
      required: true,
      enum: roles,
      default: "User",
    },
  },
  { timestamps: true }
);

const userSchema = mongoose.model("user", UserSChema);
export default userSchema;
