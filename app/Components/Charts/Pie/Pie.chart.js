import { View } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { MediumText } from "../../Text/Headings/Headings";
import { fonts } from "../../../utils/constants/fonts/fonts";
import { useState } from "react";

export const PieChar = ({ percentage = 91, innerRadius = 100 }) => {

  const [strokeColor, setStrokeColor] = useState("238, 90, 36")

  const data = {
    labels: ["Tasks"], // optional
    data: [percentage / 100]
  };

  const color = {
    low: "238, 90, 36",
    medium: "60, 64, 198",
    high: "5, 196, 107"
  };

  // convertToRGBA(46, 213, 115)
  // convertToRGBA(#3c40c6)

  const getColor = () => {
    if (percentage <= 35) return color.low;
    if (percentage > 35 && percentage <= 75) return color.medium;
    if (percentage > 75) return color.high;
  };

  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    backgroundGradientToOpacity: 0,
    backgroundGradientFromOpacity: 0,
    color: (opacity = 1) => `rgba(${getColor()}, ${opacity})`
  };

  return (
    <View style={{ width: 80, height: 80, position: "relative" }}>
      <ProgressChart
        style={{ backgroundColor: "white" }}
        data={data}
        width={80}
        height={80}
        strokeWidth={8}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={true}
      />
      <MediumText
        sx={{
          fontFamily: fonts.Montserrat[500],
          position: "absolute",
          top: "40%",
          left: "35%"
        }}>
        {percentage}%
      </MediumText>
    </View>
  );
};
