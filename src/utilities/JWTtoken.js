import jwt from "jsonwebtoken";
import "dotenv/config";

export function GenerateToken(Data, secretKey, expiry) {
  try {
    //generate token using jsonwebtoken package

    var token = jwt.sign(Data, secretKey, expiry);
    return token;
  } catch (err) {
    return err;
  }
}
