import { Icon } from "@rneui/base";
import { View } from "react-native";
import { IconButton } from "../../Icons/Icon";
import { Colors } from "../../../utils/constants/colors/colors";
import { fonts } from "../../../utils/constants/fonts/fonts";
import { MediumText, SmallText } from "../../Text/Headings/Headings";
import { StyleSheet } from "react-native";

export const InfoBox = ({
  leftIcon = {
    iconColor: Colors.bgBlack,
    iconName: "search-outline",
    iconSize: 20,
    iconType: "ionicon"
  },
  boxTitle,
  showRightIcon = true,
  showRightText = false,
  children,
  rightTextColor = Colors.red.base,
  rightText,
  headerStyles,
  bodyStyles
}) => {
  return (
    <View>
      {/* Header */}
      <View
        style={[
          { ...headerStyles },
          styles.header,
          !showRightIcon || showRightText ? { paddingVertical: 15 } : null
        ]}>
        {/* Left */}
        <View style={styles.headerLeft}>
          <Icon
            name={leftIcon.iconName}
            type={leftIcon.iconType}
            color={leftIcon.iconColor}
            size={leftIcon.iconSize}
          />
          {boxTitle && boxTitle()}
        </View>

        {/* Right */}
        <View style={styles.headerRight}>
          {showRightIcon && !showRightText && (
            <View style={styles.rightIconStyle}>
              <IconButton
                type="ionicon"
                name="chevron-forward-outline"
              />
            </View>
          )}

          {!showRightIcon && showRightText && (
            <SmallText
              sx={{ fontFamily: fonts.Montserrat[500] }}
              color={rightTextColor}>
              {rightText && rightText()}
            </SmallText>
          )}
        </View>
      </View>

      {/* Body */}
      <View style={[styles.body, { ...bodyStyles }]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    paddingVertical: 0,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightBlack[3]
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  rightIconStyle: {
    position: "relative",
    top: -5
  },
  body: {
    backgroundColor: Colors.white,
    // paddingVertical: 0,
    paddingHorizontal: 15
  }
});
