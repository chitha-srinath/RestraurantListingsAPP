import userSchema from "../models/UserModel.js";
import { CheckPassword, HashPassword } from "../utilities/HashPassword.js";
import { GenerateToken } from "../utilities/JWTtoken.js";
import {
  findData,
  findone,
  insertData,
  updateById,
  updateone,
} from "../utilities/dbOperations.js";
import "dotenv/config";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export async function login(reqBody, resPonse) {
  try {
    let userData = null;
    let { Email, Password } = reqBody;

    // checking user is registered or not

    if (Email) {
      userData = await findData(userSchema, { Email });
    }
    if (userData[0]) {
      let { _id, UserName, Email, Mobile, Role, UserId } = userData[0];

      // checking passwords matches

      let isPasswordMatched = await CheckPassword(
        Password,
        userData[0].Password
      );

      // generating access token , refresh token and refresh token is stored in db

      if (isPasswordMatched) {
        let acessToken = GenerateToken(
          { _id, UserName, Email, Mobile, Role, UserId },
          process.env.AccessSecretKey,
          { expiresIn: process.env.AccessTokenExpiry }
        );
        let refreshToken = GenerateToken(
          { _id },
          process.env.RefreshSecretKey,
          { expiresIn: process.env.RefreshTokenExpiry }
        );
        let updateUserData = { RefreshToken: refreshToken };
        await updateById(userSchema, userData[0], updateUserData);

        // setting access token in cookies
        let cookieOptions = {
          httpOnly: true,
          secure: true,
        };
        resPonse
          .cookie("AccessTokenKey", acessToken, cookieOptions)
          .cookie("RefreshTokenKey", refreshToken, cookieOptions);

        return { msg: `${Role || "User"} login successfull`, code: 200 };
      } else {
        return { msg: "credentiails are incorrect", code: 401 };
      }
    } else {
      return { msg: "User not registered", code: 401 };
    }
  } catch (err) {
    return err;
  }
}

export async function Register(reqBody) {
  try {
    let userData = null;

    // checking email is already registered

    if (reqBody?.Email) {
      userData = await findData(userSchema, { Email: reqBody?.Email });
    }
    if (userData[0]) {
      return { msg: "email already taken", code: 401 };
    }
    let { UserName, Email, Password, Role, Mobile } = reqBody;

    // stroring hashed password in db

    let hashPassword = await HashPassword(Password);
    let result = await insertData(userSchema, {
      UserName,
      Mobile,
      Role,
      UserId: new mongoose.Types.ObjectId().toString(),
      Email,
      Password: hashPassword,
    });

    if (result.code === 11000) {
      return {
        msg: `${Object.keys(result.keyValue)[0]} is already taken`,
        code: 401,
      };
    }

    if (result.errors) {
      return { msg: `Invalid ${Object.keys(result.errors)[0]}`, code: 404 };
    }

    return { msg: `${Role || "User"} registered sucessfully`, code: 200 };
  } catch (err) {
    return { msg: err.issues[0].message, code: 500 };
  }
}

export async function logout(req, res) {
  try {
    // remove refresh token from db

    await updateone(
      userSchema,
      { _id: req["CustomerDetails"]._id },
      { RefreshToken: "" }
    );

    // remove access token from cookie

    let cookieOptions = {
      httpOnly: true,
      secure: true,
    };

    res.clearCookie("AccessTokenKey", cookieOptions);
    res.clearCookie("RefreshTokenKey", cookieOptions);
    return "User logged out successfully";
  } catch (err) {
    return err;
  }
}

export async function refreshAccessToken(req, res) {
  try {
    // acsseing refresh token from cookie or request payload

    let incomingRefreshToken =
      req.cookies.RefreshTokenKey || req.body.refreshToken;

    // verifying refresh token

    var decodedRefreshToken = jwt.verify(
      incomingRefreshToken,
      process.env.RefreshSecretKey
    );

    let userData = await findone(userSchema, { _id: decodedRefreshToken._id });

    // checking incoming refresh token and databse refresh token

    if (incomingRefreshToken === userData.RefreshToken) {
      // generating access token

      let { _id, UserName, Email, Mobile } = userData;

      let acessToken = GenerateToken(
        { _id, UserName, Email, Mobile },
        process.env.AccessSecretKey,
        { expiresIn: process.env.AccessTokenExpiry }
      );

      // setting new acess token

      let cookieOptions = {
        httpOnly: true,
        secure: true,
      };
      res.cookie("AccessTokenKey", acessToken, cookieOptions);
    } else {
      return "failed to get refreshToken";
    }
  } catch (err) {
    return err;
  }
}
