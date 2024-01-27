import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { fonts } from "../../utils/constants/fonts/fonts";
import { Icon } from "@rneui/base";
import { MediumText } from "../Text/Headings/Headings";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MotiView } from "moti";
import { TodoGroupBox } from "./TodoGroupBox";

export const TodoGroupBoxContainer = () => {
    const navigation = useNavigation();
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

            <MotiView>
                <TodoGroupBox
                    boxCategory={"Today's"}
                    title={"You have 10 tasks for today"}
                    subTitle={"3 out of 10 are completed!"}
                    percentageCompleted={30}
                />
                <TodoGroupBox
                    boxCategory={"Today's"}
                    title={"You have 10 tasks for today"}
                    subTitle={"3 out of 10 are completed!"}
                    percentageCompleted={30}
                />
                <TodoGroupBox
                    boxCategory={"Today's"}
                    title={"You have 10 tasks for today"}
                    subTitle={"3 out of 10 are completed!"}
                    percentageCompleted={30}
                />
            </MotiView>
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
