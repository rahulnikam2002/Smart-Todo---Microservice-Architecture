import { Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Colors } from "../../../utils/constants/colors/colors";
import { SmallText } from "../../Text/Headings/Headings";
import { fonts } from "../../../utils/constants/fonts/fonts";

export const RoundedCarousel = ({ data }) => {
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      data={data}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={[
            index !== data.length - 1 && { marginRight: 10 },
            styles.singleItem
          ]}
          key={index}>
          <SmallText sx={{fontFamily: fonts.Montserrat[500]}}>{item}</SmallText>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  singleItem: {
    backgroundColor: Colors.white,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.lightBlack[3]
  }
});
