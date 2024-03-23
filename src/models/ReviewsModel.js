import mongoose from "mongoose";

const MongoSchema = mongoose.Schema;

const ReviewSchema = new MongoSchema(
  {
    BusinessId: { type: String, required: true },
    ReviewUserId: { type: String, required: true },
    ReviewId: { type: String, required: true },
    UserReview: { type: String },
    RespondMsg: { type: String },
    CreatedBy: { type: String },
    UpdatedBy: { type: String },
  },
  { timestamps: true }
);

const reviewSchema = mongoose.model("Review", ReviewSchema);
export default reviewSchema;
