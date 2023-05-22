import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../view/home/Home";
import Test4 from "../components/Test4";
import Login from "../view/login/Login";
import { SafeAreaView } from "react-native-safe-area-context";

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{ header: () => null, headerShown: true }}>
      <Drawer.Screen name="DrawerHome" component={Home} />
      <Drawer.Screen name="Draw1" component={Test4} />
      <Drawer.Screen name="Login" component={Login} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
