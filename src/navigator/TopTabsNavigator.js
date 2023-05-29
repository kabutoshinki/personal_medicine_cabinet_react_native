import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ListPills from "../view/list/ListPills";
import Reminder from "../view/pill/Reminder";
const Tab = createMaterialTopTabNavigator();

function TopTabsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AddPill" component={Reminder} />
      <Tab.Screen name="ListPills" component={ListPills} />
    </Tab.Navigator>
  );
}
export default TopTabsNavigator;
