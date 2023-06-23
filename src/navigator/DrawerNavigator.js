import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../view/home/Home";
import Login from "../view/login/Login";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomDrawer from "../components/CustomDrawer";
import { HomeIcon, UserIcon } from "react-native-heroicons/outline";
import Profile from "../view/profile/Profile";
import color from "../utils/color";
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        header: () => null,
        headerShown: true,
        drawerActiveBackgroundColor: color.main_color,
        drawerActiveTintColor: color.white,
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: { marginLeft: -20, fontSize: 15 },
      }}
    >
      <Drawer.Screen
        name="Home Page"
        component={Home}
        options={{ drawerIcon: ({ color }) => <HomeIcon size={22} color={color} /> }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ drawerIcon: ({ color }) => <UserIcon size={22} color={color} /> }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
