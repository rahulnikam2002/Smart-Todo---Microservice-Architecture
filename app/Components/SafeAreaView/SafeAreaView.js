import { View, StyleSheet } from "react-native";
import { DeviceInfo } from "../../utils/constants/constant";

export const CustomSafeAreaView = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    marginTop: DeviceInfo.notchHeight
  }
});
