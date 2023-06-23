import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAuthorizationHeader = async () => {
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
