import { Text, StyleSheet } from "react-native";
import { fonts } from "../../../utils/constants/fonts/fonts";

export const SmallText = ({ children, weight, color, sx }) => {
  return (
    <Text
      style={[
        styles.fontFamily,
        styles.small,
        sx,
        { fontWeight: weight, color: color }
      ]}>
      {children}
    </Text>
  );
};

export const MediumText = ({ children, weight, color, sx }) => {
  return (
    <Text
      style={[
        styles.fontFamily,
        styles.medium,
        sx,
        { fontWeight: weight, color: color }
      ]}>
      {children}
    </Text>
  );
};

export const SmallHeadingText = ({ children, weight, color, sx }) => {
  return (
    <Text
      style={[
        styles.fontFamily,
        styles.smallHeadingText,
        sx,
        { fontWeight: weight, color: color }
      ]}>
      {children}
    </Text>
  );
};

export const SubHeadingText = ({ children, weight, color, sx }) => {
  return (
    <Text
      style={[
        styles.fontFamily,
        styles.subHeading,
        sx,
        { fontWeight: weight, color: color }
      ]}>
      {children}
    </Text>
  );
};

export const HeadingText = ({ children, weight, color }) => {
  return (
    <Text
      style={[
        styles.fontFamily,
        styles.HeadingText,
        { fontWeight: weight, color: color }
      ]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  small: {
    fontSize: 11
  },
  medium: {
    fontSize: 14
  },
  smallHeadingText: {
    fontSize: 17
  },
  subHeading: {
    fontSize: 22
  },
  HeadingText: {
    fontSize: 34
  },
  fontFamily: {
    fontFamily: fonts.Montserrat[400]
  }
});
