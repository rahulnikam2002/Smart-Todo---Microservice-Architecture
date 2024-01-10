import { Icon } from "@rneui/base";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";

export const IconButton = ({
  name = "arrow-back-outline",
  type = "ionicon",
  color,
  onPress,
  size,
  bg,
  addBackground = true,
  bgSize = "large"
}) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View
        style={[
          styles.iconContainer,
          addBackground && bg && { backgroundColor: bg },
          bgSize === "small" && { paddingHorizontal: 4, paddingVertical: 3 },
          bgSize === "medium" && { paddingHorizontal: 7, paddingVertical: 6 },
          bgSize === "large" && { paddingHorizontal: 10, paddingVertical: 9 }
        ]}>
        <Icon
          size={size}
          name={name}
          type={type}
          color={color}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: "#ffffff10",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 50,
    marginTop: 10
  }
});
