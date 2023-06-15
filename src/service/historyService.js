import config from "../../config.json";
import axios from "axios";
const apiEndPoint = config.apiEndPoint;
import AsyncStorage from "@react-native-async-storage/async-storage";
let accessToken = AsyncStorage.getItem("Access-Token");
let user = AsyncStorage.getItem("user");
// Đặt quyền truy cập vào api
// const options = {
//   headers: {
//     Authorization: "Bearer " + accessToken,
//   },
// };
const getAuthorizationHeader = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("Access-Token");
    const headers = {
      Authorization: "Bearer " + accessToken,
    };
    return headers;
  } catch (error) {
    console.log("Error retrieving access token:", error);
    throw error;
  }
};
export async function getHistory() {
  const options = {
    headers: await getAuthorizationHeader(),
  };

  return axios.get(apiEndPoint + `history`, options);
}
