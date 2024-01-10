import {} from "@rneui/base";
import { StyleSheet, Button, Text } from "react-native";
import { useGoogleFonts } from "../../Hooks/Fonts/useFonts";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../utils/constants/colors/colors";
import { ActivityIndicator } from "react-native";
import { Animated } from "react-native";
import { Easing } from "react-native";
import { useState } from "react";
import { View } from "react-native";
import { fonts } from "../../utils/constants/fonts/fonts";

export const TouchableButton = ({
  title,
  onPress,
  hidden = true,
  loading,
  btnWidth,
  txtWidth
}) => {
  const { fontsLoaded, fontError } = useGoogleFonts();
  const [scaleValue] = useState(new Animated.Value(1));
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <TouchableOpacity
      activeOpacity={(hidden && 1) || (loading && 1)}
      accessibilityElementsHidden={true}
      // style={[styles.button, !hidden && { backgroundColor: Colors.bgBlack }]}
      style={[
        styles.button,
        { width: btnWidth },
        !hidden && { backgroundColor: Colors.bgBlack },
        loading && { backgroundColor: Colors.lightBlack[1] }
      ]}
      onPress={() => !hidden && onPress()}>
      <Text style={[styles.buttonText, { width: txtWidth }]}>{title}</Text>
      {loading && (
        <ActivityIndicator
          style={[
            { marginLeft: 10 },
            btnWidth === "100%" && { position: "relative", right: 20 }
          ]}
          color={Colors.white}
        />
      )}
    </TouchableOpacity>
  );
};

export const SmallButton = ({ title, onPress, mode, sx }) => (
  <TouchableOpacity
    style={[
      { ...sx, alignSelf: "flex-start" },
      mode == "light"
        ? { backgroundColor: "white" }
        : { backgroundColor: Colors.bgBlack }
    ]}>
    <Text
      style={[
        mode == "light" ? { color: Colors.bgBlack } : { color: Colors.white },
        { fontFamily: fonts.Montserrat[500] }
      ]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: Colors.lightBlack[1],
    borderRadius: 2,
    position: "relative"
  },
  buttonText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 14,
    color: Colors.white,
    textAlign: "center"
  }
});
