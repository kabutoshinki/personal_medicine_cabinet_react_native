import config from "../../config.json";
import axios from "axios";
const apiEndPoint = config.apiEndPoint;
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuthorizationHeader } from "../utils/authorization";
let accessToken = AsyncStorage.getItem("Access-Token");
let user = AsyncStorage.getItem("user");

export async function getPaymentPlan() {
  const options = {
    headers: await getAuthorizationHeader(),
  };

  return axios.get(apiEndPoint + `payment`, options);
}

export async function transactionPayment(formPayment) {
  const options = {
    headers: await getAuthorizationHeader(),
  };

  return axios.post(apiEndPoint + `transaction`, formPayment, options);
}
