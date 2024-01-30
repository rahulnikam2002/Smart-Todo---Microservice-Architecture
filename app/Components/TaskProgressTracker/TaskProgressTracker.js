import { MotiView } from "moti";
import { MediumText, SmallText, SubHeadingText } from "../Text/Headings/Headings";
import { StyleSheet, View } from "react-native";
import { fonts } from "../../utils/constants/fonts/fonts";
import { Colors } from "../../utils/constants/colors/colors";
import { PieChar } from "../Charts/Pie/Pie.chart";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { getTodaysProgress } from "../../utils/helpers/analysis/progress";
import { AuthContext } from "../../context/auth/auth.context";
import { Skeleton } from "moti/skeleton";
import { Spacer } from "../NavigationComponents/Drawer/CustomDrawer";

export const TaskProgressTracker = ({ percentage }) => {
    const [userTaskDetails, setUserTaskDetails] = useState();
    const { getUserDetailsWithToken } = useContext(AuthContext);

    const navigation = useNavigation();

    const currentDate = new Date();
    // Options for formatting the date
    const options = { month: "long", day: "numeric" };
    // Format the date as "mm dd"
    const formattedDate = currentDate.toLocaleDateString("en-US", options);

    const setUserTodaysProgess = async () => {
        const { result: smartToken, userEmail } = await getUserDetails();
        const todaysDate = new Date().toISOString().split("T")[0];
        const userProgress = await getTodaysProgress(smartToken, userEmail, todaysDate);
        console.log({ userProgress });
        setUserTaskDetails(userProgress);
    };

    const getUserDetails = async () => {
        const details = await getUserDetailsWithToken();
        if (!details) {
            // setUserDetails(null);
            logoutUser();
            return;
        }
        return details;
    };

    useEffect(() => {
        navigation.addListener("focus", () => {
            setUserTodaysProgess();
        });
    }, [navigation]);

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
                    {userTaskDetails ? (
                        <MediumText
                            color={Colors.lightBlack[1]}
                            sx={{ fontSize: 13, fontFamily: fonts.Montserrat[500] }}>
                            {userTaskDetails.completedTasks}/{userTaskDetails.toalTasks} task completed
                        </MediumText>
                    ) : (
                        <MotiView>
                            <Spacer height={5} />
                            <Skeleton
                                colorMode={"light"}
                                height={10}
                                radius={"square"}
                                width={100}
                            />
                        </MotiView>
                    )}
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
                {userTaskDetails && <PieChar percentage={userTaskDetails.percentage} />}
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
