import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { fonts } from "../../utils/constants/fonts/fonts";
import { Icon } from "@rneui/base";
import { MediumText } from "../Text/Headings/Headings";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MotiView } from "moti";
import { TodoGroupBox } from "./TodoGroupBox";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { todoServiceHost } from "../../utils/constants/ip";
import { AuthContext } from "../../context/auth/auth.context";
import { tokens } from "../../utils/constants/constant";
import { infoToast } from "../../utils/toasts/toasts";
import { Colors } from "../../utils/constants/colors/colors";
import { TodoGroupBoxSkeleton } from "../Skeleton/TodoGroupBoxSkeleton";

export const TodoGroupBoxContainer = () => {
    const navigation = useNavigation();
    const { getUserDetailsWithToken } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState();
    // const [userDeatils, setUserDetails] = useState({});

    const getUserDetails = async () => {
        const details = await getUserDetailsWithToken();
        if (!details) {
            logoutUser();
            return;
        }
        return details;
    };

    const getUserDetailsFromStore = async () => {
        const details = await getUserDetails();
        return details;
    };

    const getQuickReport = async () => {
        try {
            setLoading(true);
            const { result: smartUserToken, userEmail } = await getUserDetailsFromStore();

            const report = await axios.get(`${todoServiceHost}/api/analysis/todo/quick/report`, {
                headers: {
                    Authorization: tokens.authToken,
                    "smart-auth-token": smartUserToken,
                    "user-auth-email": userEmail
                }
            });

            setReport(report.data.tasksPercentages);
            setLoading(false);
        } catch (error) {
            infoToast("Report not generated", "Something went wrong, but no worries you can play around!");
        }
    };

    useEffect(() => {
        navigation.addListener("focus", () => {
            getQuickReport();
        });
        getQuickReport();
    }, [navigation]);

    return (
        <View>
            <View style={styles.header}>
                <MediumText sx={{ fontFamily: fonts.Montserrat[600] }}>Quick view</MediumText>
                <TouchableOpacity onPress={() => navigation.navigate("DisplayAllTodos")}>
                    <Icon
                        type="ionicon"
                        name="arrow-forward"
                    />
                </TouchableOpacity>
            </View>

            {!loading ? (
                <MotiView>
                    <TodoGroupBox
                        boxCategory={"Today's"}
                        title={`You have ${report?.todays.total} tasks for today`}
                        subTitle={`${report?.todays.completed} out of ${report?.todays.total} are completed!`}
                        percentageCompleted={report?.todays.percentage === 0 ? 1 : report?.todays.percentage}
                        theme={"rgba(60, 64, 198, 0.70)"}
                    />
                    <TodoGroupBox
                        boxCategory={"Today's"}
                        title={`You have ${report?.tomorrow.total} tasks for tomorrow`}
                        subTitle={`${report?.tomorrow.completed} out of ${report?.tomorrow.total} are completed!`}
                        percentageCompleted={report?.tomorrow.percentage === 0 ? 1 : report?.tomorrow.percentage}
                        theme={"rgba(60, 64, 198, 0.70)"}
                    />
                    <TodoGroupBox
                        boxCategory={"Today's"}
                        title={`You have ${report?.weekend.total} tasks till this weekend`}
                        subTitle={`${report?.weekend.completed} out of ${report?.weekend.total} are completed!`}
                        percentageCompleted={report?.weekend.percentage === 0 ? 1 : report?.weekend.percentage}
                        theme={"rgba(60, 64, 198, 0.70)"}
                    />
                </MotiView>
            ) : (
                <View>
                    <TodoGroupBoxSkeleton />
                    <TodoGroupBoxSkeleton />
                    <TodoGroupBoxSkeleton />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    quickTodoContainer: {
        marginTop: 10
    }
});
