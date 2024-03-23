import jwt from "jsonwebtoken";
import "dotenv/config";
import CreateResponse from "../utilities/ResponseFormat.js";

export default async function VerifyToken(req, res, next) {
  try {
    // fecthing access token from cookie or request headers

    const token =
      req.cookies["AccessTokenKey"] ||
      req["headers"]["authorization"].split(" ")[1];

    if (!token) {
      return "User not authenticated";
    }

    // verifying access token

    try {
      var decoded = jwt.verify(token, process.env.AccessSecretKey);
    } catch (err) {
      let response = CreateResponse(400, "Authentication failed", err);
      return res.send(response);
    }

    // storing user information in request

    if (decoded) {
      req["UserInfo"] = decoded;
      next();
    }
  } catch (err) {
    return err;
  }
}
