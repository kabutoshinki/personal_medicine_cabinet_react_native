import config from "../../config.json";
import axios from "axios";
const apiEndPoint = config.apiEndPoint;
import AsyncStorage from "@react-native-async-storage/async-storage";
let accessToken = AsyncStorage.getItem("Access-Token");
import { getAuthorizationHeader } from "../utils/authorization";
// Đặt quyền truy cập vào api

export async function getRegimenDetailsList(regimenId) {
  const options = {
    headers: await getAuthorizationHeader(),
  };
  return axios.get(apiEndPoint + `regimen-detail/${regimenId}`, options);
}
export async function getRegimenDetail(regimenDetailId) {
  const options = {
    headers: await getAuthorizationHeader(),
  };
  return axios.get(apiEndPoint + `regimen-detail/view-detail/${regimenDetailId}`, options);
}

function changeDateFormat(dateString) {
  const dateParts = dateString.split("/");
  const day = dateParts[0];
  const month = dateParts[1];
  const year = dateParts[2];

  // Create a Date object with the provided date parts
  const date = new Date(year, month - 1, day);

  // Format the date as "yyyy-MM-dd"
  const formattedDate = date.toISOString().split("T")[0];

  return formattedDate;
}

export async function editRegimenDetail(form) {
  const options = {
    headers: await getAuthorizationHeader(),
  };

  const formApi = {
    ...form,
    medicineUrl:
      form?.medicineUrl || "https://img.freepik.com/premium-vector/red-white-capsule-pill_92242-102.jpg?w=2000",
  };

  return axios.put(apiEndPoint + `regimen-detail`, formApi, options);
}
