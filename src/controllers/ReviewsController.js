import {
  addReview,
  getReviews,
  updateReview,
  deleteReview,
} from "../services/ReviewService.js";
import CreateResponse from "../utilities/ResponseFormat.js";

export async function createReview(req, res) {
  try {
    let result = await addReview(req, res);
    let response = CreateResponse(result.code, "success", result.msg);
    return res.send(response);
  } catch (err) {
    let response = CreateResponse(501, "internal error", err);
    return res.send(response);
  }
}

export async function fetchReviews(req, res) {
  try {
    let result = await getReviews(req, res);
    let response = CreateResponse(result.code, "success", result.msg);
    return res.send(response);
  } catch (err) {
    let response = CreateResponse(501, "internal error", err);
    return res.send(response);
  }
}

export async function updateReviews(req, res) {
  try {
    let result = await updateReview(req, res);
    let response = CreateResponse(result.code, "success", result.msg);
    return res.send(response);
  } catch (err) {
    let response = CreateResponse(501, "internal error", err);
    return res.send(response);
  }
}

export async function removeReview(req, res) {
  try {
    let result = await deleteReview(req, res);
    let response = CreateResponse(result.code, "success", result.msg);
    return res.send(response);
  } catch (err) {
    let response = CreateResponse(501, "internal error", err);
    return res.send(response);
  }
}
