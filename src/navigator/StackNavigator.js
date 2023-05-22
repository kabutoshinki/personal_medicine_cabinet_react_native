import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../view/login/Login";
import Register from "../view/register/Register";
import Welcome from "../view/welcome/Welcome";
import TabsTest from "./TabsTest";
import PillReminder from "../view/pill/PillReminder";
import Reminder from "../view/pill/Reminder";
const Stack = createNativeStackNavigator();
const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};
const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ header: () => null }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="HomeScreen" component={TabsTest} />
      <Stack.Screen name="Medical" component={PillReminder} />
      <Stack.Screen name="PillReminder" component={Reminder} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
