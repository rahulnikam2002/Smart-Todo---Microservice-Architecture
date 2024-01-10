import { Icon } from "@rneui/base";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { SmallHeadingText } from "../../Text/Headings/Headings";
import { IconButton } from "../../Icons/Icon";

export const BottomSheetHeader = ({ heading, closeBottomSheet }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContainerLeft}>
        {/* <Icon
          name="information-circle-outline"
          type="ionicon"
          size={30}
        /> */}
        <SmallHeadingText sx={{ fontFamily: "Montserrat_600SemiBold" }}>
          {heading}
        </SmallHeadingText>
      </View>
      <View style={styles.headerContainerRight}>
        <IconButton
          name="close-outline"
          type="ionicon"
          size={30}
          bg={"#00000010"}
          onPress={() => closeBottomSheet(-1)}
          bgSize="small"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: "#00000020",
    borderBottomWidth: 1
  },
  headerContainerLeft: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

  },
  headerContainerRight: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: -5
  }
});
