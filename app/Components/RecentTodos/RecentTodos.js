import { MotiView } from "moti";
import { MediumText } from "../Text/Headings/Headings";
import { StyleSheet, View } from "react-native";
import { fonts } from "../../utils/constants/fonts/fonts";
import { Icon } from "@rneui/base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../utils/constants/colors/colors";
import { SingleTodoQuickView } from "../SingleTodoQuickView/SingleTodoQuickView";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth/auth.context";
import { getRecentTodos } from "../../utils/helpers/Todos/getRecentTodos";
import { infoToast } from "../../utils/toasts/toasts";
import { RecentTodoSkeleton } from "../Skeleton/recentTodoSkeleton";
import { TouchableButton } from "../Button/Button";

export const RecentTodos = () => {
    const { logoutUser, getUserDetailsWithToken } = useContext(AuthContext);
    const [recentTodos, setRecentTodos] = useState([]);
    const [isLoading, setIsLoading] = useState();
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
        setIsLoading(true);
        const { result: smartUserToken, userEmail } = await getUserDetails();
        console.log({ smartUserToken });
        const todos = await getRecentTodos(3, smartUserToken, userEmail);
        setIsLoading(false);
        if (todos) {
            setRecentTodos(todos);
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
                {!isLoading > 0 ? (
                    recentTodos?.length > 0 ? (
                        recentTodos.map((item, index) => (
                            <SingleTodoQuickView
                                todoTitle={item.todoTitle}
                                category={item.category[0]}
                                key={index}
                            />
                        ))
                    ) : (
                        <MotiView>
                            <MediumText
                                color={Colors.lightBlack[1]}
                                sx={{ fontFamily: fonts.Montserrat[400], marginBottom: 5 }}>
                                You have no tasks pending!
                            </MediumText>
                            <MotiView
                                from={{ opacity: 0, translateY: 5 }}
                                animate={{ opacity: 1, translateY: 0 }}>
                                <TouchableButton
                                    title={"Create one"}
                                    btnWidth={"100%"}
                                    hidden={false}
                                    txtWidth={"100%"}
                                    onPress={() => navigation.navigate("CreateSingleTask")}
                                />
                            </MotiView>
                        </MotiView>
                    )
                ) : (
                    <View>
                        <RecentTodoSkeleton />
                        <RecentTodoSkeleton />
                        <RecentTodoSkeleton />
                    </View>
                )}
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
        marginTop: 10
    }
});
