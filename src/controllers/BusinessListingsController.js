import {
  addBusiness,
  getBusiness,
  updateBusiness,
  deleteBusiness,
} from "../services/BusinessListingsService.js";
import CreateResponse from "../utilities/ResponseFormat.js";

export async function createBusiness(req, res) {
  try {
    let result = await addBusiness(req, res);
    let response = CreateResponse(result.code, "success", result.msg);
    return res.send(response);
  } catch (err) {
    let response = CreateResponse(501, "internal error", err);
    return res.send(response);
  }
}

export async function fetchBusiness(req, res) {
  try {
    let result = await getBusiness(req, res);
    let response = CreateResponse(result.code, "success", result.msg);
    return res.send(response);
  } catch (err) {
    let response = CreateResponse(501, "internal error", err);
    return res.send(response);
  }
}

export async function updateBusinessListing(req, res) {
  try {
    let result = await updateBusiness(req, res);
    let response = CreateResponse(result.code, "success", result.msg);
    return res.send(response);
  } catch (err) {
    let response = CreateResponse(501, "internal error", err);
    return res.send(response);
  }
}

export async function removeBusiness(req, res) {
  try {
    let result = await deleteBusiness(req, res);
    let response = CreateResponse(result.code, "success", result.msg);
    return res.send(response);
  } catch (err) {
    let response = CreateResponse(501, "internal error", err);
    return res.send(response);
  }
}
