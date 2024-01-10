import { View } from "react-native";
import {
  MediumText,
  SmallHeadingText,
  SmallText,
  SubHeadingText
} from "../../../Text/Headings/Headings";
import { fonts } from "../../../../utils/constants/fonts/fonts";
import { Colors } from "../../../../utils/constants/colors/colors";
import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import { SmallButton, TouchableButton } from "../../../Button/Button";
import { FlatList } from "react-native-gesture-handler";

export const HorizontalBanner = ({ data, swipeable = false }) => {
  const isSingle = data.length === 1;

  return isSingle && swipeable === false ? (
    <View style={[styles.singleBannerBox]}>
      <ImageBackground
        source={{ uri: data[0].backgroundImage }}
        resizeMode="cover"
        style={styles.image}
        borderRadius={5}>
        <View style={[styles.opacity, styles.justifyBetween]}>
          <View>
            <SubHeadingText
              color={Colors.white}
              sx={{ fontFamily: fonts.Montserrat[600] }}>
              {data[0].title}
            </SubHeadingText>
            <MediumText color={Colors.white}>{data[0].subTitle}</MediumText>
          </View>
          <View>
            <SmallButton
              title={"Shop now"}
              mode={"light"}
              sx={{
                borderRadius: 50,
                paddingHorizontal: 15,
                paddingVertical: 8
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  ) : (
    <View>
      <FlatList
        alwaysBounceHorizontal
        bouncesZoom
        horizontal
        scrollEventThrottle={50}
        // aria-valuemax={20}
        // bounces
        // alwaysBounceHorizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={[styles.singleBannerBox, { marginRight: 10, width: 350 }]}>
            <ImageBackground
              // width={60}
              source={{ uri: item.backgroundImage }}
              resizeMode="cover"
              style={[styles.image, { width: 350, alignSelf: "flex-start" }]}
              borderRadius={5}>
              <View
                style={[
                  styles.opacity,
                  styles.justifyBetween,
                  { width: "100%" }
                ]}>
                <View>
                  <SubHeadingText
                    color={Colors.white}
                    sx={{ fontFamily: fonts.Montserrat[600], width: "100%" }}>
                    {item.title}
                  </SubHeadingText>
                  <MediumText
                    color={Colors.white}
                    sx={{ width: "100%" }}>
                    {item.subTitle}
                  </MediumText>
                </View>
                <View>
                  <SmallButton
                    title={"Shop now"}
                    mode={"light"}
                    sx={{
                      borderRadius: 50,
                      paddingHorizontal: 15,
                      paddingVertical: 8
                    }}
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
        )}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  singleBannerBox: {
    height: 180,
    borderRadius: 5
  },
  image: {
    height: "100%"
  },
  opacity: {
    height: "100%",
    backgroundColor: "#00000090",
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  justifyBetween: {
    justifyContent: "space-between"
  }
});

/*

*/
