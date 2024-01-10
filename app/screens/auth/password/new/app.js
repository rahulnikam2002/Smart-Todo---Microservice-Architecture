import { StatusBar } from "react-native";
import { CustomSafeAreaView } from "../../../../Components/SafeAreaView/SafeAreaView";
import { Colors } from "../../../../utils/constants/colors/colors";
import { HeaderCard } from "../../../../Components/containers/Header/HeaderCard";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Input, PasswordInput } from "../../../../Components/Input/Input";
import { TouchableButton } from "../../../../Components/Button/Button";
import { useContext, useEffect, useState } from "react";
import {
  phoneNumberValidation,
  usernamevalidation,
  validationByRegex
} from "../../../../utils/helpers/validation/validation";
import { AuthContext } from "../../../../context/auth/auth.context";
import axios from "axios";
import { networkIP, userServiceHost } from "../../../../utils/constants/ip";
import Toast from "react-native-toast-message";
import {
  errorToast,
  infoToast,
  showToast,
  successToast
} from "../../../../utils/toasts/toasts";
import { toastConfig } from "../../../../utils/toasts/config";
import { tokens } from "../../../../utils/constants/constant";

export const PasswordScreen = ({ route, navigation }) => {
  const { loginUser } = useContext(AuthContext);

  const { email, key, mode } = route.params;
  const [loading, setLoading] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [password, setPassword] = useState(null);

  // Sign up
  const [userName, setUserName] = useState(null);
  const [userNumber, setNumber] = useState(null);

  // Button
  const [buttonVisible, setButtonVisible] = useState(false);

  const handleValidatePassword = (password) => {
    const isPasswordValid = validationByRegex(
      password,
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!*])[A-Za-z\d@#$%^&+=!*]{8,}$/
    );
    setValidPassword(isPasswordValid);
    if (isPasswordValid) {
      setPassword(password);
    } else {
      setPassword(null);
    }
  };

  const handleValidateUsername = (userName) => {
    const isUsernameValid = usernamevalidation(userName);
    if (isUsernameValid) {
      setUserName(userName);
      return;
    }
    setUserName(null);
  };

  const handleValidatePhoneNumber = (phoneNumber) => {
    const isPhoneNumValid = phoneNumberValidation(phoneNumber);
    if (isPhoneNumValid) return setNumber(phoneNumber);
    return setNumber(null);
  };

  const handleCheckPassword = async () => {
    if (mode == "signIn") {
      await handleSignIn(key, password);
      return;
    } else {
      // console.log(first)
      if (!email || !password || !key || !userName || !userNumber) {
        return errorToast(
          "Incorrect credentials",
          "You must enter valid password"
        );
      }

      const userDetailsObject = {
        email, password, key, userName, userNumber
      }
      return navigation.navigate("selectAvatarScreen",userDetailsObject)
    }
  };

  const handleSignIn = async (token, password) => {
    try {
      // sign in code
      setLoading(true);
      const response = await axios.post(
        `${userServiceHost}/api/auth/signin`,
        { userPassword: password },
        {
          headers: {
            Authorization: tokens.authToken,
            "x-secret-token": key
          }
        }
      );
      const { userLoggedIn, token } = response.data;
      console.log({ response: response.data });
      setLoading(false);
      if (userLoggedIn) {
        return loginUser(token);
      } else {
        return infoToast(
          "Server issue 👉👈",
          "We're sorry, but our team is working on this!"
        );
      }
    } catch (error) {
      setLoading(false);
      const { status } = error.response;
      if (status === 401) {
        return infoToast(
          "Invalid details",
          "Make sure you enter all correct details"
        );
      }
    }
  };

  return (
    <CustomSafeAreaView style={{ height: "100%" }}>
      <StatusBar
        backgroundColor={Colors.bgBlack}
        style="inverted"
      />
      <HeaderCard
        navigation={navigation}
        enableBackButton={true}
        text={
          mode === "signUp"
            ? "Enter your basic details to continue"
            : "Enter your password to continue"
        }
        subText={mode === "signUp" ? "Basic details" : "Create Password"}
      />

      <View style={styles.bottomContainer}>
        {mode !== "signIn" && (
          <View style={styles.bottomInnerArea}>
            <Input
              placeholder={"Username"}
              onChange={(text) => handleValidateUsername(text)}
            />
            <Input
              placeholder={"Phone number"}
              onChange={(text) => handleValidatePhoneNumber(text)}
            />
          </View>
        )}
        <View
          style={
            mode == "signIn"
              ? { paddingHorizontal: 25, paddingTop: 20, height: "40%" }
              : styles.bottomInnerAreaPassword
          }>
          <PasswordInput
            placeholder={"Password"}
            onChange={(text) => handleValidatePassword(text)}
          />
        </View>

        <View style={styles.button}>
          <TouchableButton
            title={"Continue"}
            onPress={() => handleCheckPassword()}
            loading={loading}
            hidden={false}
          />
        </View>
      </View>
      <Toast
        config={toastConfig}
        autoHide={true}
        visibilityTime={5000}
        topOffset={60}
      />
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    height: "70%",
    backgroundColor: Colors.white
  },
  bottomInnerArea: {
    paddingHorizontal: 25,
    paddingTop: 20
  },
  button: {
    height: "50%",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingHorizontal: 25
  },
  bottomInnerAreaPassword: {
    paddingHorizontal: 25
  }
});
