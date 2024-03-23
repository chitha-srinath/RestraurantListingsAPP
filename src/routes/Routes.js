import express from "express";
import { Login, Logout, Register, GetRefreshAccessToken } from "../controllers/LoginController.js";
import { createBusiness, fetchBusiness, updateBusinessListing, removeBusiness } from "../controllers/BusinessListingsController.js";
import { createReview, fetchReviews, updateReviews, removeReview } from "../controllers/ReviewsController.js";
import VerifyToken from "../middlewares/Authorization.js";

const Routes = express.Router();

Routes.route("/login").post(Login);

Routes.route("/register").post(Register);

Routes.route("/logout").get(VerifyToken, Logout);

Routes.route("/getAccessToken").get(GetRefreshAccessToken);

// Business Listings
Routes.route("/addBusiness").post(VerifyToken, createBusiness);

Routes.route("/getBusiness").get(VerifyToken, fetchBusiness);

Routes.route("/updateBusiness").post(VerifyToken, updateBusinessListing);

Routes.route("/deleteBusiness/:BusinessId").get(VerifyToken, removeBusiness);

// Business Reviews
Routes.route("/addReview").post(VerifyToken, createReview);

Routes.route("/getReviews/:BusinessId").get(VerifyToken, fetchReviews);

Routes.route("/updateReview").post(VerifyToken, updateReviews);

Routes.route("/deleteReview").post(VerifyToken, removeReview);

export default Routes;
