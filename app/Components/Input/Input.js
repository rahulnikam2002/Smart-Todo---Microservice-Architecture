import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { useGoogleFonts } from "../../Hooks/Fonts/useFonts";
import { Colors } from "../../utils/constants/colors/colors";
import React, { useState } from "react";
import { View } from "react-native";

export const Input = ({ placeholder, onChange, sx, onSubmit, multiline=false }) => {
  const { fontsLoaded, fontError } = useGoogleFonts();
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <TextInput
      multiline={multiline}
      selectionColor={Colors.lightBlack[1]}
      style={[styles.input, sx]}
      placeholder={placeholder}
      onChangeText={(text) => onChange(text)}
      onSubmitEditing={() => onSubmit()}
    />
  );
};



export const PasswordInput = ({ placeholder, onChange, sx }) => {
  const { fontsLoaded, fontError } = useGoogleFonts();
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <TextInput
      secureTextEntry={true}
      selectionColor={Colors.lightBlack[1]}
      style={[styles.input, sx]}
      placeholder={placeholder}
      onChangeText={(password) => onChange(password)}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    fontFamily: "Montserrat_400Regular",
    borderWidth: 2,
    borderColor: Colors.bgGrey,
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 10,
    paddingVertical: 15
  },
});
