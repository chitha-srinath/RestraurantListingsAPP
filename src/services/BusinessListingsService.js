import "dotenv/config";
import mongoose from "mongoose";
import {
  findData,
  findone,
  insertData,
  deleteone,
  updateone,
} from "../utilities/dbOperations.js";
import businessSchema from "../models/BusinessModel.js";
import userSchema from "../models/UserModel.js";

export async function addBusiness(req, res) {
  try {
    let userInfo = req.UserInfo;

    let { Mobile, BusinessName, Address, Images, BusinessOwnerId } = req.body;
    let result = null;
    if (userInfo && userInfo.Role === "Business Owner") {
      // creating a new business with login business ownerid

      result = await insertData(businessSchema, {
        BusinessName,
        Mobile,
        BusinessOwnerId: userInfo.UserId,
        BusinessId: new mongoose.Types.ObjectId().toString(),
        Address,
        Images,
        CreatedBy: userInfo.UserId,
        UpdatedBy: null,
      });
    } else if (userInfo.Role === "Admin") {
      // creating a new business by selecting a business ownerid

      let hasOwner = await findData(userSchema, { UserId: BusinessOwnerId });
      if (hasOwner[0]) {
        result = await insertData(businessSchema, {
          BusinessName,
          Mobile,
          BusinessOwnerId,
          BusinessId: new mongoose.Types.ObjectId().toString(),
          Address,
          Images,
          CreatedBy: userInfo.UserId,
          UpdatedBy: null,
        });
      } else {
        return { msg: "Business user not found", code: 401 };
      }
    } else {
      return { msg: "Unauthorized to Create Business", code: 401 };
    }

    //  catch errors while inserting data to db

    if (result.code === 11000) {
      return {
        msg: `${Object.keys(result.keyValue)[0]} is already taken`,
        code: 401,
      };
    }

    if (result.errors) {
      return { msg: `Invalid ${Object.keys(result.errors)[0]}`, code: 404 };
    }

    // if no errors then business is created

    return { msg: "Business Created Successfully", code: 200 };
  } catch (err) {
    return err;
  }
}

export async function getBusiness(req, res) {
  try {
    // fetching all business

    let businesslist = await findData(businessSchema, {});
    if (businesslist.length > 0) {
      return { msg: businesslist, code: 200 };
    } else {
      return { msg: "No Businesses present", code: 200 };
    }
  } catch (err) {
    return err;
  }
}

export async function updateBusiness(req, res) {
  try {
    let userInfo = req.UserInfo;
    let businessid = req.body.BusinessId;
    if (userInfo && userInfo.Role === "Business Owner") {
      // cheking business is himself or not to update business

      if (businessid) {
        let businessdata = await findone(businessSchema, {
          BusinessId: businessid,
          BusinessOwnerId: userInfo.UserId,
        });
        if (businessdata) {
          let updatedbusinessdata = req.body;
          updatedbusinessdata.UpdatedBy = userInfo.UserId;
          await updateone(
            businessSchema,
            { BusinessId: businessid },
            updatedbusinessdata
          );
          return { msg: "Business Updated Successfully", code: 200 };
        }
      }
    } else if (userInfo.Role === "Admin") {
      if (businessid) {
        // cheking business is his or not to update business

        let businessdata = await findone(businessSchema, {
          BusinessId: businessid,
        });
        if (businessdata) {
          let updatedbusinessdata = req.body;
          updatedbusinessdata.UpdatedBy = userInfo.UserId;
          await updateone(
            businessSchema,
            { BusinessId: businessid },
            updatedbusinessdata
          );
          return { msg: "Business Updated Successfully", code: 200 };
        }
      }
    }
    // if any normal user or another business owner try to modify business

    return { msg: "Unauthorized to Modify Business", code: 401 };
  } catch (err) {
    return err;
  }
}

export async function deleteBusiness(req, res) {
  try {
    let userInfo = req.UserInfo;
    if (userInfo && userInfo.Role === "Admin") {
      let businessid = req.params.BusinessId;
      if (businessid) {
        let businessdata = await findone(businessSchema, {
          BusinessId: businessid,
        });
        if (businessdata) {
          await deleteone(businessSchema, { BusinessId: businessid });
          return { msg: "Business Deleted Successfully", code: 200 };
        }
      }
      return { msg: "No Businesses Found", code: 200 };
    } else {
      // if any normal user or  business owner try to remove business
      return { msg: "Unauthorized to Delete Business", code: 401 };
    }
  } catch (err) {
    return err;
  }
}
