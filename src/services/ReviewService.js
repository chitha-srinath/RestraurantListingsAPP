import "dotenv/config";
import mongoose from "mongoose";
import {
  findone,
  insertData,
  findwithproject,
  updateone,
  deleteone,
} from "../utilities/dbOperations.js";
import businessSchema from "../models/BusinessModel.js";
import reviewSchema from "../models/ReviewsModel.js";

export async function addReview(req, res) {
  try {
    let userInfo = req.UserInfo;
    if (userInfo && (userInfo.Role === "User" || userInfo.Role === "Admin")) {
      let businessid = req.body.BusinessId;
      if (businessid) {
        // checking if business is already present in database

        let businessdata = await findone(businessSchema, {
          BusinessId: businessid,
        });
        if (businessdata) {
          let reviewobj = { ...req.body };
          reviewobj.ReviewUserId = userInfo.UserId;
          reviewobj.CreatedBy = userInfo.UserId;
          reviewobj.UpdatedBy = null;
          reviewobj.ReviewId = new mongoose.Types.ObjectId().toString();
          await insertData(reviewSchema, reviewobj);
          return { msg: "Review Created Successfully", code: 200 };
        }
      }
      return { msg: "No Businesses Found", code: 200 };
    } else {
      // if business owner try to create review

      return { msg: "Unauthorized to Review", code: 401 };
    }
  } catch (err) {
    return err;
  }
}

export async function getReviews(req, res) {
  try {
    // fetching review data for a business
    let businessid = req.params.BusinessId;
    let projectData = {
      _id: 0,
      BusinessId: 1,
      ReviewUserId: 1,
      ReviewId: 1,
      UserReview: 1,
      RespondMsg: 1,
    };

    let businessreviewslist = await findwithproject(
      reviewSchema,
      {
        BusinessId: businessid,
      },
      projectData
    );
    if (businessreviewslist.length > 0) {
      return { msg: businessreviewslist, code: 200 };
    } else {
      return { msg: "No Reviews Found", code: 200 };
    }
  } catch (err) {
    return err;
  }
}

export async function updateReview(req, res) {
  try {
    let userInfo = req.UserInfo;
    let businessid = req.body.BusinessId;
    let reviewid = req.body.ReviewId;

    if (userInfo && userInfo.Role === "Business Owner" && req.body.RespondMsg) {
      if (businessid) {
        let businessdata = await findone(businessSchema, {
          BusinessId: businessid,
          BusinessOwnerId: userInfo.UserId,
        });
        if (businessdata) {
          if (reviewid) {
            let reviewdata = await findone(reviewSchema, {
              BusinessId: businessid,
              ReviewId: reviewid,
            });
            // repond msg to user review
            if (reviewdata) {
              await updateone(
                reviewSchema,
                { BusinessId: businessid, ReviewId: reviewid },
                { RespondMsg: req.body.RespondMsg, UpdatedBy: userInfo.UserId }
              );
              return { msg: "Review Updated Successfully", code: 200 };
            }
          }
          return { msg: "No Review Found with Business", code: 200 };
        }
      }
      // if any other business owner try to update

      return { msg: "Unauthorized to Modify Review", code: 200 };
    } else if (userInfo && userInfo.Role === "Admin") {
      if (businessid) {
        let businessdata = await findone(businessSchema, {
          BusinessId: businessid,
        });
        if (businessdata) {
          if (reviewid) {
            let reviewdata = await findone(reviewSchema, {
              BusinessId: businessid,
              ReviewId: reviewid,
            });
            if (reviewdata) {
              let reviewupdatedobj = { ...reviewdata };
              reviewupdatedobj.RespondMsg = req.body.RespondMsg;
              reviewupdatedobj.UserReview = req.body.UserReview;
              reviewupdatedobj.UpdatedBy = userInfo.UserId;
              await updateone(
                reviewSchema,
                { BusinessId: businessid, ReviewId: reviewid },
                reviewupdatedobj
              );
              return { msg: "Review Updated Successfully", code: 200 };
            }
          }
          return { msg: "No Review Found with Business", code: 200 };
        }
      }
    } else if (userInfo && userInfo.Role === "User" && req.body.UserReview) {
      if (businessid) {
        let businessdata = await findone(businessSchema, {
          BusinessId: businessid,
        });
        if (businessdata) {
          if (reviewid) {
            let reviewdata = await findone(reviewSchema, {
              BusinessId: businessid,
              ReviewId: reviewid,
              ReviewUserId: userInfo.UserId,
            });
            if (reviewdata) {
              let reviewupdatedobj = { ...reviewdata };
              reviewupdatedobj.UserReview = req.body.UserReview;
              reviewupdatedobj.UpdatedBy = userInfo.UserId;
              await updateone(
                reviewSchema,
                { BusinessId: businessid, ReviewId: reviewid },
                reviewupdatedobj
              );
              return { msg: "Review Updated Successfully", code: 200 };
            }
          }
          return { msg: "Unauthorized to Modify Review", code: 200 };
        }
      }
      return { msg: "No Businesses Found", code: 200 };
    } else {
      return { msg: "Unauthorized to Modify Review", code: 401 };
    }
  } catch (err) {
    return err;
  }
}

export async function deleteReview(req, res) {
  try {
    let userInfo = req.UserInfo;
    let businessid = req.body.BusinessId;
    let reviewid = req.body.ReviewId;
    if (userInfo && userInfo.Role === "Admin") {
      if (businessid) {
        // check if business is already present in db
        let businessdata = await findone(businessSchema, {
          BusinessId: businessid,
        });
        if (businessdata) {
          if (reviewid) {
            let reviewdata = await findone(reviewSchema, {
              BusinessId: businessid,
              ReviewId: reviewid,
            });
            if (reviewdata) {
              await deleteone(reviewSchema, {
                BusinessId: businessid,
                ReviewId: reviewid,
              });
              return { msg: "Review Deleted Successfully", code: 200 };
            }
          }
          return { msg: "No Review Found with Business", code: 200 };
        }
      }
      return { msg: "No Businesses Found", code: 200 };
    } else if (userInfo.Role === "User") {
      if (businessid) {
        // check if business is already present in db

        let businessdata = await findone(businessSchema, {
          BusinessId: businessid,
        });
        if (businessdata) {
          // remove his own review
          if (reviewid) {
            let reviewdata = await findone(reviewSchema, {
              BusinessId: businessid,
              ReviewId: reviewid,
              ReviewUserId: userInfo.UserId,
            });
            if (reviewdata) {
              await deleteone(reviewSchema, {
                BusinessId: businessid,
                ReviewId: reviewid,
              });
              return { msg: "Review Deleted Successfully", code: 200 };
            }
          }
          return { msg: "Unauthorized to Delete Review", code: 200 };
        }
      }
      return { msg: "No Businesses Found", code: 200 };
    } else {
      // if business owner try to delete review

      return { msg: "Unauthorized to Delete Review", code: 401 };
    }
  } catch (err) {
    return err;
  }
}
