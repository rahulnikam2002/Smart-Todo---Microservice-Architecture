import { MotiText, MotiView } from "moti";
import {
  MediumText,
  SmallText,
  SubHeadingText
} from "../Text/Headings/Headings";
import { StyleSheet, View } from "react-native";
import { fonts } from "../../utils/constants/fonts/fonts";
import { Colors } from "../../utils/constants/colors/colors";
import { PieChar } from "../Charts/Pie/Pie.chart";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export const TaskProgressTracker = ({ percentage }) => {
  const currentDate = new Date();
  // Options for formatting the date
  const options = { month: "long", day: "numeric" };
  // Format the date as "mm dd"
  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  const navigation = useNavigation();

  return (
    <View style={styles.main}>
      <View
        style={{
          backgroundColor: "white",
          width: "68%",
          padding: 15,
          borderRadius: 10,
          height: 120
        }}>
        <View>
          <SubHeadingText
            sx={{ fontSize: 19, fontFamily: fonts.Montserrat[600] }}>
            Task Progress
          </SubHeadingText>
        </View>
        <View style={styles.taskCounter}>
          <MediumText
            color={Colors.lightBlack[1]}
            sx={{ fontFamily: fonts.Montserrat[500] }}>
            20/35 task completed
          </MediumText>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateSingleTask")}
            style={styles.todaysDate}>
            <MediumText
              sx={{ fontFamily: fonts.Montserrat[500] }}
              color={Colors.white}>
              {formattedDate}
            </MediumText>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "white",
          width: "30%",
          padding: 15,
          borderRadius: 10,
          height: 120
        }}>
        <PieChar percentage={percentage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginVertical: 10,
    // backgroundColor: "#fff",
    elevation: 100,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  todaysDate: {
    backgroundColor: Colors.bgBlack,
    alignSelf: "flex-start",
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 50,
    marginTop: 15,
    marginBottom: 5
  }
});
