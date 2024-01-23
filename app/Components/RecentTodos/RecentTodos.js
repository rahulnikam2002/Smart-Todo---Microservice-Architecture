import { MotiView } from "moti";
import { MediumText } from "../Text/Headings/Headings";
import { StyleSheet, View } from "react-native";
import { fonts } from "../../utils/constants/fonts/fonts";
import { Icon } from "@rneui/base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../utils/constants/colors/colors";
import { SingleTodoQuickView } from "../SingleTodoQuickView/SingleTodoQuickView";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth/auth.context";
import { getRecentTodos } from "../../utils/helpers/Todos/getRecentTodos";
import { infoToast } from "../../utils/toasts/toasts";

export const RecentTodos = () => {
    const { logoutUser, getUserDetailsWithToken } = useContext(AuthContext);
    const navigation = useNavigation();

    const getUserDetails = async () => {
        const details = await getUserDetailsWithToken();
        if (!details) {
            // setUserDetails(null);
            logoutUser();
            return;
        }
        return details;
    };

    const fetchTodos = async () => {
        const { result: smartUserToken, userEmail } = await getUserDetails();
        const todos = await getRecentTodos(5, smartUserToken, userEmail);
        if (todos) {
            console.log(todos.pendingTodos);
            return;
        }
        return infoToast("Something went wrong!", "Please try again");
    };

    useEffect(() => {
        navigation.addListener("focus", () => {
            fetchTodos();
        });
        fetchTodos();
    }, [navigation]);

    return (
        <MotiView>
            <View style={styles.header}>
                <MediumText sx={{ fontFamily: fonts.Montserrat[600] }}>Recent Tasks</MediumText>
                <TouchableOpacity onPress={() => navigation.navigate("DisplayAllTodos")}>
                    <Icon
                        type="ionicon"
                        name="arrow-forward"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.quickTodoContainer}>
                {[...Array(5)].map((item, index) => (
                    <SingleTodoQuickView key={index} />
                ))}
            </View>
        </MotiView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    quickTodoContainer: {
        marginVertical: 10
    }
});
