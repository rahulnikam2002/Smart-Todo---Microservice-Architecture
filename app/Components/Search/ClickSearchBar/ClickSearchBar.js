import { Icon } from "@rneui/base";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../../utils/constants/colors/colors";
import { MediumText } from "../../Text/Headings/Headings";
import { fonts } from "../../../utils/constants/fonts/fonts";
import { useGoogleFonts } from "../../../Hooks/Fonts/useFonts";

export const ClickSeachBar = ({ placeHolder, onPress }) => {
  const { fontError, fontsLoaded } = useGoogleFonts();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.searchBarMain}
      onPress={onPress}>
      <View>
        <Icon
          name="search-outline"
          type="ionicon"
          size={20}
        />
      </View>
      <MediumText sx={{ marginLeft: 10, fontFamily: fonts.Montserrat[500] }}>
        {placeHolder}
      </MediumText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchBarMain: {
    backgroundColor: Colors.backgroundWhite,
    flexDirection: "row",
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: 5
  }
});
