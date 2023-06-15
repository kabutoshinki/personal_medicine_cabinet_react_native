import config from "../../config.json";
import axios from "axios";

const apiEndPoint = config.apiEndPoint;

const accessToken = "Access-Token";
// const options = {
//     headers: {
//       Authorization: "Bearer " + accessToken,
//     },
//   };

export async function register(user) {
  return await axios.post(apiEndPoint + "user", {
    password: user.password,
    email: user.email,
    phone: user.phone,
  });
}
