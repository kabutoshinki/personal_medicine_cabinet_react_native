import config from "../../config.json";
import axios from "axios";
const apiEndPoint = config.apiEndPoint;
import AsyncStorage from "@react-native-async-storage/async-storage";
let accessToken = AsyncStorage.getItem("Access-Token");
import { getAuthorizationHeader } from "../utils/authorization";
import { changeDateFormat } from "../utils/dataHandle";
// Đặt quyền truy cập vào api

export async function getRegimen() {
  const options = {
    headers: await getAuthorizationHeader(),
  };

  return axios.get(apiEndPoint + `regimen`, options);
}
export async function postRegimen(form) {
  const options = {
    headers: await getAuthorizationHeader(),
  };
  const [numberDate, typeDate] = form?.period.split(" ");
  const formatDate = changeDateFormat(form?.startDate);
  const formApi = {
    name: form?.name,
    image:
      form?.imageURI || "https://www.studentdoctor.net/wp-content/uploads/2018/08/20180815_prescription-1024x1024.png",
    period: typeDate,
    doseRegiment: parseInt(numberDate),
    startNow: form?.startNow,
    startDate: formatDate,
    deviceToken: form?.deviceToken,
    regimentDetailRequests: form?.regimentDetailRequests,
  };
  console.log(formApi);
  return axios.post(apiEndPoint + `regimen`, formApi, options);
}
export async function editRegimen(form) {
  const options = {
    headers: await getAuthorizationHeader(),
  };

  // const formatDate = changeDateFormat(form?.startDate);
  const formApi = {
    regimenId: form?.regimenId,
    regimenName: form?.regimenName,
    image:
      form?.image || "https://www.studentdoctor.net/wp-content/uploads/2018/08/20180815_prescription-1024x1024.png",
    dosageRegimen: parseInt(form?.dosageRegimen),
    period: form?.period,
    startDate: form?.startDate,
  };

  return axios.put(apiEndPoint + `regimen`, formApi, options);
}
export async function deleteRegimen(id) {
  const options = {
    headers: await getAuthorizationHeader(),
  };

  return axios.delete(apiEndPoint + `regimen/${id}`, options);
}
export async function finishRegimen(id) {
  const options = {
    headers: await getAuthorizationHeader(),
  };

  return axios.patch(apiEndPoint + `regimen/${id}`, id, options);
}
