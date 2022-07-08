import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
// const BASE_URL1 = process.env.REACT_APP_CRYPTO_URL;

//sign-up
export async function userSignup(data) {
  return await axios.post(`${BASE_URL}/crm/api/v1/auth/signup`, data);
}

//sign-in/log-in
export async function userSignin(data) {
  return await axios.post(`${BASE_URL}/crm/api/v1/auth/signin`, data);
}