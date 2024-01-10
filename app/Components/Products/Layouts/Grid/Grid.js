import { Text } from "react-native";
import { View } from "react-native";
import { FlatList } from "react-native";
import { ProductCard } from "../../Card/ProductCard";
import { Colors } from "../../../../utils/constants/colors/colors";
import { Animated } from "react-native";
import { useRef } from "react";
import { Dimensions } from "react-native";

export const ProductGridLayout = ({ products, maxCount = "unlimited" }) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headMov = scrollY.interpolate({
    inputRange: [0, 180, 181],
    outputRange: [0, -180, -180]
  });

  const headColor = scrollY.interpolate({
    inputRange: [0, 180],
    outputRange: ["red", "blue"]
  });

  const { width } = Dimensions.get("window");

  return (
    <FlatList
      style={{ width: "100%", backgroundColor: Colors.backgroundWhite }}
      numColumns={2}
      scrollEnabled
      data={products}
      renderItem={({ item, index }) => (
        <ProductCard
          sx={index % 2 === 0 ? { paddingRight: 1 } : { paddingLeft: 1 }}
          productName={item.productName}
          categories={item.categories}
          id={item.id}
          productImg={item.img}
          productPrice={item.originPrice}
          productSalePrice={item.salePrice}
          ratings={item.ratings}
          stars={item.stars}
          key={item.id}
          offer={item.offer}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};
