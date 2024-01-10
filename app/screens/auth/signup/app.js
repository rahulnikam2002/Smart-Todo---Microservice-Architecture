import { Text, View } from "react-native";
import { CustomSafeAreaView } from "../../../Components/SafeAreaView/SafeAreaView";
import { StyleSheet } from "react-native";
import { CustomLinearGradient } from "../../../Components/Gradients/Linear/Linear";
import {
  MediumText,
  SubHeadingText
} from "../../../Components/Text/Headings/Headings";
import { Colors } from "../../../utils/constants/colors/colors";

export const SignUpScreen = () => {
  return (
    <CustomSafeAreaView>
      <CustomLinearGradient>
        <View style={styles.mainContainer}>
          <View style={styles.mainBox}>
            <View style={styles.hiddenBox}>
              <View style={styles.hiddenInsideBox}></View>
            </View>
            <View>
              <SubHeadingText
                weight={500}
                sx={{ textAlign: "center", marginTop: 20 }}>
                Get Started Free
              </SubHeadingText>
              <MediumText
                sx={{ textAlign: "center", marginTop: 5 }}
                color={Colors.lightBlack}>
                Start purchasing fresh plants directly to your doorsteps!
              </MediumText>
            </View>
          </View>
        </View>
      </CustomLinearGradient>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    justifyContent: "flex-end"
  },
  mainBox: {
    backgroundColor: Colors.white,
    paddingVertical: 20,
    height: "60%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: "relative",
    zIndex: 20
  },
  hiddenBox: {
    position: "absolute",
    top: "-4.5%",
    width: "100%",
    height: 20,
    zIndex: 1,
    alignItems: "center"
  },
  hiddenInsideBox: {
    backgroundColor: "#00000050",
    width: "80%",
    height: 20,
    position: "relative",
    zIndex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  }
});
