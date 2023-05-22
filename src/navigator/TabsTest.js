import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Test1 from "../components/Test1";
import Test2 from "../components/Test2";
import Test3 from "../components/Test3";
import DrawerNavigator from "./DrawerNavigator";
import { PresentationChartBarIcon, Cog6ToothIcon, UserIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import Reminder from "../view/pill/Reminder";

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
      <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: "#4D9FEC" }}>{children}</View>
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
              {/* <HomeIcon size={25} color={focused ? "#4D9FEC" : "#748c94"} /> */}
              <Image
                source={require("../../assets/icons/Home.png")}
                resizeMode="contain"
                style={{ width: 25, height: 25, tintColor: focused ? "#4D9FEC" : "#748c94" }}
              />
              <Text style={{ color: focused ? "#4D9FEC" : "#748c94", fontSize: 12 }}>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={Test1}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <PresentationChartBarIcon size={25} color={focused ? "#4D9FEC" : "#748c94"} />
              <Text style={{ color: focused ? "#4D9FEC" : "#748c94", fontSize: 12 }}>Progress</Text>
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
        name="Setting"
        component={Test2}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Cog6ToothIcon size={25} color={focused ? "#4D9FEC" : "#748c94"} />
              <Text style={{ color: focused ? "#4D9FEC" : "#748c94", fontSize: 12 }}>Setting</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Test3}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <UserIcon size={25} color={focused ? "#4D9FEC" : "#748c94"} />
              <Text style={{ color: focused ? "#4D9FEC" : "#748c94", fontSize: 12 }}>Profile</Text>
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
