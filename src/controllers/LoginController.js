import {
  login,
  logout,
  Register as signup,
  refreshAccessToken,
} from "../services/loginService.js";
import CreateResponse from "../utilities/ResponseFormat.js";

export async function Login(req, res) {
  try {
    let result = await login(req.body, res);
    let response = CreateResponse(result.code, "success", result.msg);
    return res.send(response);
  } catch (err) {
    let response = CreateResponse(501, "internal error", err);
    return res.send(response);
  }
}
export async function Register(req, res) {
  try {
    let result = await signup(req.body);
    let response = CreateResponse(result.code, "success", result.msg);
    return res.send(response);
  } catch (err) {
    let response = CreateResponse(501, "internal error", err);
    return res.send(response);
  }
}
export async function Logout(req, res) {
  try {
    let result = await logout(req, res);
    let response = CreateResponse(200, "success", result.msg);
    return res.send(response);
  } catch (err) {
    let response = CreateResponse(501, "internal error", err);
    return res.send(response);
  }
}

export async function GetRefreshAccessToken(req, res) {
  try {
    let result = await refreshAccessToken(req, res);

    let response = CreateResponse(200, "success", result.msg);
    return res.send(response);
  } catch (err) {
    let response = CreateResponse(501, "internal error", err);
    return res.send(response);
  }
}
