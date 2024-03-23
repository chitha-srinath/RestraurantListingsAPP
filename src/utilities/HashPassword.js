import bcrypt from "bcrypt";
import "dotenv/config";

export async function HashPassword(password) {
  try {
    // generate hashed password using bcrypt package

    let saltRounds = await bcrypt.genSalt(Number(process.env.SaltRounds));
    let hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    return err;
  }
}

export async function CheckPassword(password, dbpassword) {
  try {
    // comparing the password and returning true or false

    let isMatched = await bcrypt.compare(password, dbpassword);
    return isMatched;
  } catch (err) {
    return err;
  }
}
