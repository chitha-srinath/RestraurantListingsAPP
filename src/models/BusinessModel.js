import mongoose from "mongoose";

const MongoSchema = mongoose.Schema;

const BusinessSchema = new MongoSchema(
  {
    BusinessName: { type: String },
    BusinessId: { type: String, required: true },
    BusinessOwnerId: { type: String, required: true },
    Mobile: {
      type: Number,
      min: 6000000000,
      max: 9999999999,
      unique: true,
      sparse: true,
      required: true,
    },
    Address: { type: String, required: true },
    Images: { type: [String], required: true },
    CreatedBy: { type: String },
    UpdatedBy: { type: String },
  },
  { timestamps: true }
);

const businessSchema = mongoose.model("Business", BusinessSchema);
export default businessSchema;
