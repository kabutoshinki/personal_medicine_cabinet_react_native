import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../view/login/Login";
import Register from "../view/register/Register";
import Welcome from "../view/welcome/Welcome";
import TabsTest from "./TabsTest";
import Reminder from "../view/pill/Reminder";
import ListPills from "../view/list/ListPills";
import Profile from "../view/profile/Profile";
import EditProfile from "../view/profile/EditProfile";

const Stack = createNativeStackNavigator();
const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};
const StackNavigator = () => {
  console.log("stack");
  return (
    <Stack.Navigator screenOptions={{ header: () => null }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="HomeScreen" component={TabsTest} />
      <Stack.Screen name="PillReminder" component={Reminder} />
      <Stack.Screen name="ListPill" component={ListPills} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
