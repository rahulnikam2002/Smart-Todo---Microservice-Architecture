import { Text, View, Button, StyleSheet } from "react-native";
import { CustomSafeAreaView } from "../../../Components/SafeAreaView/SafeAreaView";
import {
  MediumText,
  SmallHeadingText,
  SmallText,
  SubHeadingText
} from "../../../Components/Text/Headings/Headings";
import { Colors } from "../../../utils/constants/colors/colors";
import { InfoCard } from "../../../Components/Cards/InfoCard/InfoCard";
import { DeviceInfo } from "../../../utils/constants/constant";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import { Vibration } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const paddingHorizontal = 25;

export const OnBoarding = ({ navigation }) => {
  return (
    <CustomSafeAreaView
      style={{
        //   paddingHorizontal: 15,
        backgroundColor: "white"
        // height: DeviceInfo.screenHeight
      }}>
      <View style={styles.mainView}>
        <View style={styles.logo}>
          <Image
            source={{
              uri: "https://res.cloudinary.com/dhelycucn/image/upload/v1698939606/native%20app/icons/logo_vjavdg.png"
            }}
            width={25}
            height={25}
          />
        </View>
        <View style={styles.texts}>
          <SubHeadingText weight={500}>Get Started</SubHeadingText>
          <MediumText color={Colors.lightBlack}>
            Start by choosing your option
          </MediumText>
        </View>

        <View style={styles.dataMappedContainer}>
          {OnBoardingScreenData &&
            OnBoardingScreenData.map((item, index) => (
              <InfoCard
                key={index}
                onPress={() => navigation.navigate(item.redirectScreenName)}
                iconType={item.iconType}
                ctaIcon={item.ctaIcon}
                cardInfo={item.cardInfo}
                img={item.icon}
                icon={item.icon}
              />
            ))}
        </View>
        {/* <View style={styles.troubleModal}>
          <TouchableOpacity  onPress={() => Vibration.vibrate(0.9 * 1000)}>
            <SmallHeadingText
              weight={500}
              color={Colors.white}>
              Having troubles
            </SmallHeadingText>
          </TouchableOpacity>
          <SmallText color={Colors.white}>
            Check our guide for more help about sign in and sign up
          </SmallText>
        </View> */}
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: "100%",
    justifyContent: "flex-end"
  },
  logo: {
    position: "absolute",
    top: 20,
    left: 25
  },
  dataMappedContainer: {
    paddingHorizontal: paddingHorizontal,
    marginTop: 20
  },
  texts: {
    paddingHorizontal: paddingHorizontal
  },
  troubleModal: {
    position: "absolute",
    top: "100%",
    width: "100%",
    backgroundColor: Colors.bgBlack,
    zIndex: 10,
    paddingHorizontal: paddingHorizontal,
    paddingVertical: 20,
    height: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  }
});

const OnBoardingScreenData = [
  {
    // icon: "https://res.cloudinary.com/dhelycucn/image/upload/v1698935268/native%20app/icons/forest_pqza1m.png",
    icon: "log-in-outline",
    title: "Sign In",
    cardInfo: "If already registered then choose this!",
    redirectScreenName: "signin",
    ctaIcon: "chevron-forward-outline",
    iconType: "icon"
  },
  {
    // icon: "https://res.cloudinary.com/dhelycucn/image/upload/v1698935268/native%20app/icons/tree_1_mjl0xi.png",
    icon: "person-add-outline",
    title: "Sign Up",
    cardInfo: "If you are new to Plant Mart then choose this!",
    redirectScreenName: "signup",
    ctaIcon: "chevron-forward-outline",
    iconType: "icon"
  }
];
