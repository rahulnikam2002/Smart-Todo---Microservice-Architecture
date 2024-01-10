import React, { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  const loginUser = (token) => {
    setIsLoading(true);
    SecureStore.setItemAsync("smartUserAuthToken", token).then((res) => {
      setIsLoading(false);
      setIsLogin(true);
    });
  };

  const registerUser = (token, userDetails) => {
    setIsLoading(true);
    SecureStore.setItemAsync("smartUserAuthToken", token).then((res) => {
      SecureStore.setItemAsync("userDetails", JSON.stringify(userDetails)).then(
        (res) => {
          console.log("userDetailsFromStore ===> ", res);
          setIsLoading(false);
          setIsLogin(true);
        }
      );
    });
  };

  const getUserDetailsFromStore = async () => {
    let result = await SecureStore.getItemAsync("userDetails");
    if (result) {
      const data = JSON.parse(result);
      return data;
    }
    return null;
  };

  const logoutUser = () => {
    setIsLoading(true);
    SecureStore.deleteItemAsync("smartUserAuthToken").then((res) => {
      setIsLoading(false);
      setIsLogin(false);
    });
  };

  useEffect(() => {
    SecureStore.getItemAsync("smartUserAuthToken").then((res) => {
      if (res) {
        setIsLogin(true);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLogin,
        loginUser,
        registerUser,
        logoutUser,
        getUserDetailsFromStore
      }}>
      {children}
    </AuthContext.Provider>
  );
};
