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
  const { data: jwt } = await axios.post(apiEndpoint + "/", {
    username: user.username,
    password: user.password,
    email: user.email,
    phone: user.phone,
    age: user.age,
    gender: user.gender,
  });
  console.log(jwt);
}
