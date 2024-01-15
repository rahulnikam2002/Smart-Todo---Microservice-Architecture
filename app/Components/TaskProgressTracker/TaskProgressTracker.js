import { MotiText, MotiView } from "moti";
import { MediumText, SmallText, SubHeadingText } from "../Text/Headings/Headings";
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
                    <SubHeadingText sx={{ fontSize: 15, fontFamily: fonts.Montserrat[600] }}>Task Progress</SubHeadingText>
                </View>
                <View style={styles.taskCounter}>
                    <MediumText
                        color={Colors.lightBlack[1]}
                        sx={{ fontSize: 13, fontFamily: fonts.Montserrat[500] }}>
                        20/35 task completed
                    </MediumText>
                </View>
                <View>
                    <View
                        // onPress={() => navigation.navigate("CreateSingleTask")}
                        style={styles.todaysDate}>
                        <MediumText
                            sx={{ fontSize: 10, fontFamily: fonts.Montserrat[500] }}
                            color={Colors.white}>
                            {formattedDate}
                        </MediumText>
                    </View>
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
        // elevation: 5,
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 2,
        borderBlockColor: Colors.bgGrey
    },
    todaysDate: {
        backgroundColor: Colors.bgBlack,
        alignSelf: "flex-start",
        paddingVertical: 7,
        paddingHorizontal: 15,
        borderRadius: 50,
        marginTop: 20,
        marginBottom: 0
    }
});
