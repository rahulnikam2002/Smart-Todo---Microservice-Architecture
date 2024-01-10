import { StyleSheet, View } from "react-native";
import { SmallText, SubHeadingText } from "../../Text/Headings/Headings";
import { useGoogleFonts } from "../../../Hooks/Fonts/useFonts";
import { Colors } from "../../../utils/constants/colors/colors";
import { IconButton } from "../../Icons/Icon";

export const HeaderCard = ({ text, subText, enableBackButton = true, navigation }) => {
  let { fontError, fontsLoaded } = useGoogleFonts();
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View style={[styles.topContainer, enableBackButton && {justifyContent: "space-between"}]}>
      {enableBackButton && (
        <IconButton
          onPress={() => navigation.goBack()}
          color={Colors.white}
          type="ionicon"
          name={"arrow-back-outline"}
        />
      )}
      <View>
        <SmallText
          color={Colors.lightWhite}
          sx={{
            marginBottom: 5,
            fontFamily: "Montserrat_400Regular",
            letterSpacing: 2
          }}>
          {subText.toUpperCase()}
        </SmallText>
        <SubHeadingText
          color={Colors.white}
          sx={{ width: "70%", fontFamily: "GildaDisplay_400Regular" }}>
          {text}
        </SubHeadingText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    height: "30%",
    backgroundColor: Colors.bgBlack,
    paddingHorizontal: 25,
    justifyContent: "flex-end",
    paddingBottom: 20
  }
  // backButton: {
  //   pos
  // }
});
