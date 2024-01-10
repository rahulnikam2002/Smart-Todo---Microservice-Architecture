import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import { Colors } from "../../../utils/constants/colors/colors";
import { MediumText, SmallHeadingText } from "../../Text/Headings/Headings";
import { Vibration } from "react-native";

export const InfoCard = ({
  iconType = "icon",
  img,
  icon = "cube-outline",
  iconClass = "ionicon",
  ctaIcon = "chevron-forward-outline",
  onPress,
  cardInfo
}) => {
  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={() => {
        onPress && onPress();
      }}>
      <View style={styles.leftContainer}>
        {iconType === "img" && (
          <Image
            source={{ uri: img }}
            width={50}
            height={50}
            style={styles.icon}
          />
        )}
        {iconType === "icon" && (
          <View style={styles.icon}>
            <Icon
              name={icon}
              type={iconClass}
              style={{ alignItems: "flex-start" }}
            />
          </View>
        )}
        <SmallHeadingText weight={500}>Sign In</SmallHeadingText>
        <View style={styles.textContainer}>
          <MediumText color={Colors.lightBlack}>{cardInfo}</MediumText>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Icon
          name={ctaIcon}
          type={iconClass}
          style={{ alignItems: "flex-start" }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.bgGrey,
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    marginVertical: 5
  },
  icon: {
    marginBottom: 5
  },
  leftContainer: {
    width: "90%"
  },
  rightContainer: {
    width: "10%",
    justifyContent: "center"
  },
  textContainer: { width: "75%", marginTop: 5 }
});
