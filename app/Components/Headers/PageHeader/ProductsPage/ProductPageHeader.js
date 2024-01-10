import { View } from "react-native";
import { MediumText, SmallText } from "../../../Text/Headings/Headings";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { IconButton } from "../../../Icons/Icon";
import Logo from "../../../../Static/data/app/imgs/logo.png";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "../../../../utils/constants/fonts/fonts";
import { Colors } from "../../../../utils/constants/colors/colors";

export const ProductPageHeader = ({
  title,
  subTitle,
  showLogo = true,
  showSearch = true,
  showWishlist = true,
  showCart = true,
  showTitle = true,
  showSubTitle = true
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={styles.leftHeader}>
        {/* <TouchableOpacity></TouchableOpacity> */}
        <View style={{ position: "relative", top: -5 }}>
          <IconButton
            type="ionicon"
            name="arrow-back-outline"
            onPress={() => navigation.goBack()}
          />
        </View>
        {showLogo && (
          <Image
            style={styles.headerlogoImg}
            source={Logo}
            width={20}
            height={20}
          />
        )}
        <View style={[styles.titleArea, showLogo && {marginLeft: 15}]}>
          {showTitle && (
            <MediumText sx={{ fontFamily: fonts.Montserrat[600] }}>
              {title}
            </MediumText>
          )}
          {showSubTitle && (
            <SmallText color={Colors.lightBlack[1]}>{subTitle}</SmallText>
          )}
        </View>
      </View>
      <View style={styles.rightIcons}>
        {showSearch && (
          <IconButton
            type="ionicon"
            name="search-outline"
            onPress={() => navigation.navigate("searchScreen")}
          />
        )}

        {showWishlist && (
          <IconButton
            type="ionicon"
            name="heart-outline"
            onPress={() => navigation.navigate("searchScreen")}
          />
        )}
        {showCart && (
          <IconButton
            type="ionicon"
            name="cart-outline"
            onPress={() => navigation.navigate("cartScreen")}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6
  },
  leftHeader: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerlogoImg: {
    width: 30,
    height: 30,
    borderRadius: 2
  },
  titleArea: {
    marginLeft: 0
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
    // gap: -10,
    position: "relative",
    top: -5
  }
});
