import { View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DrawerNavigator from "./DrawerNavigator";
import {
  PlusCircleIcon,
  HomeIcon,
  PresentationChartBarIcon,
  Cog6ToothIcon,
  UserIcon,
} from "react-native-heroicons/solid";

import Reminder from "../view/pill/Reminder";
import Progress from "../view/progress/Progress";
import History from "../view/history/History";
import Profile from "../view/profile/Profile";

const CustomTabBarButton = ({ children, onPress }) => {
  // <TouchableOpacity
  //   onPress={onPress}
  //   style={{ top: -30, justifyContent: "center", alignItems: "center", ...styles.shadow }}
  // >
  <TouchableOpacity onPress={onPress} style={{ top: -30, justifyContent: "center", alignItems: "center" }}>
    <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: "#e32f45" }}>{children}</View>
  </TouchableOpacity>;
};

const TabsNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => null,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconComponent = <HomeIcon size={size} color={color} />;
              break;
            case "Progress":
              iconComponent = <PresentationChartBarIcon size={size} color={color} />;
              break;
            case "Post":
              iconComponent = <PlusCircleIcon size={size} color={color} />;
              break;
            case "Setting":
              iconComponent = <Cog6ToothIcon size={size} color={color} />;
              break;
            case "Profile":
              iconComponent = <UserIcon size={size} color={color} />;
              break;
          }

          return iconComponent;
        },
        tabBarButton: ({ accessibilityLabel, accessibilityRole, onPress, onLongPress, children, style }) => {
          if (accessibilityRole === "button" && route.name === "Post") {
            return (
              <TouchableOpacity
                style={{ position: "absolute", bottom: 20 }}
                onPress={onPress}
                onLongPress={onLongPress}
              >
                <View
                  style={{
                    backgroundColor: "#007AFF",
                    borderRadius: 35,
                    height: 70,
                    width: 70,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {children}
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              onPress={onPress}
              onLongPress={onLongPress}
              accessibilityRole={accessibilityRole}
              accessibilityLabel={accessibilityLabel}
              style={[style, { flex: 1 }]}
            >
              {children}
            </TouchableOpacity>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={DrawerNavigator} />
      <Tab.Screen name="Progress" component={Progress} />
      <Tab.Screen name="Post" component={Reminder} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default TabsNavigator;
