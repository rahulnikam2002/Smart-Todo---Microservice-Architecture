import {
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { HomeScreen } from "../../../screens/app/home/app";
import { Colors } from "../../../utils/constants/colors/colors";
import {DrawerContents} from './CustomDrawer.js'

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContents {...props}/>}
      screenOptions={{
        overlayColor:"transparent",
        drawerStyle: {backgroundColor: Colors.lightBlack[10]},
        headerShown: false,
        drawerType: "slide",
        swipeEdgeWidth: 400,
        sceneContainerStyle: {backgroundColor: Colors.lightBlack[10]}
      }}>
      <Drawer.Screen
        name="homeScreen"
        component={HomeScreen}
      />
    </Drawer.Navigator>
  );
};
