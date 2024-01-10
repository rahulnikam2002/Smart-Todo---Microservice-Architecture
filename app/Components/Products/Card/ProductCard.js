import { ImageBackground, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { MediumText, SmallText } from "../../Text/Headings/Headings";
import { Icon } from "@rneui/base";
import { Colors } from "../../../utils/constants/colors/colors";
import { fonts } from "../../../utils/constants/fonts/fonts";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export const ProductCard = ({
  productName,
  productImg,
  productPrice,
  productSalePrice,
  stars,
  ratings,
  categories,
  offer,
  id,
  sx
}) => {
  const navigation = useNavigation();
  const mergeCat = categories[0] + ", " + categories[1];
  const newCategory =
    mergeCat.length > 27 ? mergeCat.substring(0, 27) + "..." : mergeCat;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("singleProductsScreen")}
      activeOpacity={0.8}
      style={[styles.singleProductCard, { ...sx }]}>
      <View style={styles.imgContainer}>
        <ImageBackground
          resizeMode="cover"
          style={styles.singleImg}
          source={{
            uri: productImg
          }}></ImageBackground>
      </View>
      <View style={styles.textContainer}>
        <View style={styles.textContainerHeader}>
          <MediumText
            sx={{
              fontFamily: fonts.Montserrat[600],
              width: "80%",
              fontSize: 13
            }}>
            {productName.length > 27
              ? productName.substring(0, 27) + "..."
              : productName}
          </MediumText>
          <TouchableOpacity>
            <Icon
              name="favorite-outline"
              type="material"
              size={20}
              color={Colors.lightWhite}
            />
          </TouchableOpacity>
        </View>
        <View>
          <SmallText color={Colors.lightBlack[1]}>{newCategory}</SmallText>
        </View>
        <View style={styles.pricingAndOfferSection}>
          {productSalePrice && (
            <SmallText
              sx={{ textDecorationLine: "line-through" }}
              color={Colors.lightBlack[3]}>
              ₹{productSalePrice}
            </SmallText>
          )}
          {productPrice && (
            <SmallText sx={{ fontFamily: fonts.Montserrat[500] }}>
              ₹{productPrice}
            </SmallText>
          )}
          {productSalePrice && (
            <LinearGradient
              style={{ borderRadius: 50 }}
              colors={["#43434385", "#00000095"]}
              start={[0, 1]}
              end={[1, 0.8]}
              location={[0.15, 0.26, 1]}>
              <SmallText
                color={"white"}
                sx={{ paddingHorizontal: 5, fontSize: 10 }}>
                80% off
              </SmallText>
            </LinearGradient>
          )}
        </View>
        <View>
          {offer ? (
            <SmallText
              sx={{ fontFamily: fonts.Montserrat[600] }}
              color={"#FF416C"}>
              {offer}
            </SmallText>
          ) : (
            <SmallText color={"white"}>h</SmallText>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  singleProductCard: {
    width: "50%",
    marginBottom: 2
  },
  imgContainer: {
    height: 200
  },
  textContainer: {
    backgroundColor: Colors.white,
    paddingVertical: 5,
    paddingHorizontal: 5
  },
  singleImg: {
    height: "100%"
  },
  textContainerHeader: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  pricingAndOfferSection: {
    flexDirection: "row",
    gap: 5
  }
});
