import { Button, Text, View } from "react-native";
// Context
import { AuthContext } from "../../context/auth/auth.context";
import { useContext } from "react";
import {
  CardStyleInterpolators,
  createStackNavigator
} from "@react-navigation/stack";
import { OnBoarding } from "../../screens/auth/onboarding/app";
import { SignInScreen } from "../../screens/auth/signin/app";
import { SafeAreaView } from "react-native";
import { SignUpScreen } from "../../screens/auth/signup/app";
import { PasswordScreen } from "../../screens/auth/password/new/app";
import { OTPScreen } from "../../screens/auth/otp/app";
import Toast from "react-native-toast-message";
import { SelectAvatarScreen } from "../../screens/app/selectAvatar/app";

const Stack = createStackNavigator();

export const Auth = () => {
  const { loginUser } = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}>
      {/* <Stack.Screen
        name="onboarding"
        options={{
          headerShown: false,
          title: "On boarding"
        }}
        component={OnBoarding}
      /> */}
      <Stack.Screen
        name="signin"
        component={SignInScreen}
      />
      <Stack.Screen
        name="password"
        component={PasswordScreen}
      />
      <Stack.Screen
        name="otpscreen"
        component={OTPScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: "vertical",
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS
        }}
        name="selectAvatarScreen"
        component={SelectAvatarScreen}
      />
    </Stack.Navigator>
  );
};
