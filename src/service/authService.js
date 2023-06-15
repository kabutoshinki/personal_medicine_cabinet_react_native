import config from "../../config.json";
import axios from "axios";
const apiEndPoint = config.apiEndPoint;
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
const accessToken = "Access-Token";
// const options = {
//     headers: {
//       Authorization: "Bearer " + accessToken,
//     },
//   };

export async function login(user) {
  console.log("user");
  console.log(user);
  const { data } = await axios.post("http://10.0.2.2:8080/api/authentication", {
    phonenumber: user.phonenumber,
    password: user.password,
  });
  await AsyncStorage.setItem(accessToken, data?.accessToken);

  // await AsyncStorage.setItem(accessToken, jwt.token);
}

export function logout() {
  localStorage.removeItem(accessToken);
}

export async function getCurrentUser() {
  try {
    const token = await AsyncStorage.getItem(accessToken);
    console.log(token);
    const user = jwtDecode(token);
    console.log(user);
    return user;
  } catch (error) {
    return null;
  }
}
