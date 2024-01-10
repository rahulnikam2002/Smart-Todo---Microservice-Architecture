import { StyleSheet } from "react-native";
import { View } from "react-native";
import { MediumText, SmallHeadingText } from "../../Text/Headings/Headings";
import { fonts } from "../../../utils/constants/fonts/fonts";
import { IconButton } from "../../Icons/Icon";
import { Colors } from "../../../utils/constants/colors/colors";

export const SeactionHeader = ({ title, onPress }) => {
  return (
    <View style={styles.header}>
      <SmallHeadingText sx={{ fontFamily: fonts.Montserrat[600] }}>
        {title}
      </SmallHeadingText>
      <View style={styles.icon}>
        <IconButton
          bgSize="small"
          name="arrow-forward-outline"
          type="ionicon"
          onPress={onPress}
          color={Colors.lightBlack[2]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  icon: {
    position: "relative",
    top: -4
  }
});
