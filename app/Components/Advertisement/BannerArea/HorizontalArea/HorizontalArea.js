import { View } from "react-native";
import { HorizontalBanner } from "../../Banners/Horizontal/Horizontal";

export const HorizontalBannerArea = ({data}) => {
  return (
    <View>
      <HorizontalBanner data={data} />
    </View>
  );
};
