import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Test3 from "../components/Test3";
import DrawerNavigator from "./DrawerNavigator";
import {
  PresentationChartBarIcon,
  Cog6ToothIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
  ClipboardDocumentListIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import Reminder from "../view/pill/Reminder";
import color from "../utils/color";
import History from "../view/history/History";
import Progress from "../view/progress/Progress";
const CustomTabBarButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        top: -30,
        justifyContent: "center",
        alignItems: "center",
        ...styles.shadow,

        shadowColor: "#7F5DF0",
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
      }}
    >
      <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: color.main_color }}>{children}</View>
    </TouchableOpacity>
  );
};

const TabsTest = () => {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();
  const onPressHandler = () => {
    navigation.navigate("PillReminder");
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => null,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={DrawerNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {/* <HomeIcon size={25} color={focused ? color.main_color : "#748c94"} /> */}
              <Image
                source={require("../../assets/icons/Home.png")}
                resizeMode="contain"
                style={{ width: 25, height: 25, tintColor: focused ? color.main_color : "#748c94" }}
              />
              <Text style={{ color: focused ? color.main_color : "#748c94", fontSize: 12 }}>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={Progress}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <PresentationChartBarIcon size={25} color={focused ? color.main_color : "#748c94"} />
              <Text style={{ color: focused ? color.main_color : "#748c94", fontSize: 12 }}>Progress</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={Reminder}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/icons/add_medicine_2.png")}
              resizeMode="contain"
              style={{ width: 30, height: 30, tintColor: "#fff" }}
            />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} onPress={onPressHandler} />,
        }}
      />

      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <ClipboardDocumentListIcon size={25} color={focused ? color.main_color : "#748c94"} />
              <Text style={{ color: focused ? color.main_color : "#748c94", fontSize: 12 }}>History</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={Test3}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <EllipsisHorizontalCircleIcon size={25} color={focused ? color.main_color : "#748c94"} />
              <Text style={{ color: focused ? color.main_color : "#748c94", fontSize: 12 }}>More</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default TabsTest;
