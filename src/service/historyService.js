import config from "../../config.json";
import axios from "axios";
const apiEndPoint = config.apiEndPoint;
import AsyncStorage from "@react-native-async-storage/async-storage";
let accessToken = AsyncStorage.getItem("Access-Token");
let user = AsyncStorage.getItem("user");
import { getAuthorizationHeader } from "../utils/authorization";
export async function getHistory() {
  const options = {
    headers: await getAuthorizationHeader(),
  };

  return axios.get(apiEndPoint + `history`, options);
}
export async function postHistory(form) {
  const options = {
    headers: await getAuthorizationHeader(),
  };

  return axios.post(apiEndPoint + `history`, form, options);
}
export async function getHistoryId(id) {
  const options = {
    headers: await getAuthorizationHeader(),
  };

  return axios.get(apiEndPoint + `history/${id}`, id, options);
}
