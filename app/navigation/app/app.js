import {
  CardStyleInterpolators,
  createStackNavigator
} from "@react-navigation/stack";
import { DrawerNavigation } from "../../Components/NavigationComponents/Drawer/Drawer";
import { useGoogleFonts } from "../../Hooks/Fonts/useFonts";
import { useState } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { IconButton } from "../../Components/Icons/Icon";
import { MediumText } from "../../Components/Text/Headings/Headings";
import { fonts } from "../../utils/constants/fonts/fonts";
import { SelectAvatarScreen } from "../../screens/app/selectAvatar/app";
import { CreateSingleTask } from "../../screens/app/createTask/singleTask";

const Stack = createStackNavigator();

export const App = () => {
  const { fontError, fontsLoaded } = useGoogleFonts();
  const [fontLoading, setFontLoading] = useState(fontsLoaded);

  useEffect(() => {
    if (fontsLoaded) {
      setFontLoading(true);
      console.log({ fontsLoaded });
    }
  }, [fontsLoaded]);

  return fontLoading ? (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}>
      <Stack.Screen
        name="customDrawer"
        component={DrawerNavigation}
      />
      <Stack.Screen
        name="CreateSingleTask"
        options={{
          gestureEnabled: true,
          gestureDirection: "vertical",
          gestureResponseDistance: 700,
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
          headerShown: true,
          headerTitle: "New Task",
          headerTitleStyle: { fontFamily: fonts.Montserrat[600] }
        }}
        component={CreateSingleTask}
      />
    </Stack.Navigator>
  ) : (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
      }}>
      <ActivityIndicator
        size={50}
        color={"#000"}
      />
    </View>
  );
};
