import { View, Text, ActivityIndicator, Button } from "react-native";
import React, { useContext, useEffect } from "react";
import { App } from "./app/app";
import { Auth } from "./auth/auth";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/auth/auth.context";
import Toast from "react-native-toast-message";
import { useGoogleFonts } from "../Hooks/Fonts/useFonts";
import { useState } from "react";

export const Navigation = () => {
  const { isLogin, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View
        className="p-0"
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
  }
  return (
    <>
      <NavigationContainer>{isLogin ? <App /> : <Auth />}</NavigationContainer>
      <Toast />
      {/* <Button title="Click me" onPress={() => console.log("Hello")}/> */}
    </>
  );
};
