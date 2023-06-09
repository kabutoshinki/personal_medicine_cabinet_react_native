import config from "../../config.json";
import axios from "axios";
const apiEndPoint = config.apiEndPoint;
import AsyncStorage from "@react-native-async-storage/async-storage";
let accessToken = AsyncStorage.getItem("Access-Token");
let user = AsyncStorage.getItem("user");
import { getAuthorizationHeader } from "../utils/authorization";

export async function getMedicines(query) {
  const options = {
    headers: await getAuthorizationHeader(),
  };

  return axios.get(apiEndPoint + `medicine/${query}`, options);
}
export async function postMedicine(form) {
  const options = {
    headers: await getAuthorizationHeader(),
  };

  return axios.post(apiEndPoint + `medicine`, form, options);
}
