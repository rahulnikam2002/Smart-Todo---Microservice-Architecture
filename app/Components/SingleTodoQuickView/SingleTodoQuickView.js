import { StyleSheet, View } from "react-native";
import { MediumText, SmallText } from "../Text/Headings/Headings";
import { fonts } from "../../utils/constants/fonts/fonts";
import { Colors } from "../../utils/constants/colors/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export const SingleTodoQuickView = ({
    todoTitle = "This is my todo one the first number with heading",
    category = "Web development",
    id,
    status
}) => {
    console.log({ status });
    const navigation = useNavigation();
    const displayTodoTitle = todoTitle.length > 30 ? todoTitle.substring(0, 30) + "..." : todoTitle;

    const redirectTodoScreen = () => {
        navigation.navigate("DisplayAllTodos", { toId: id });
    };

    return (
        <TouchableOpacity
            onPress={() => redirectTodoScreen()}
            style={styles.main}>
            <View style={styles.leftMain}>
                <MediumText sx={{ fontFamily: fonts.Montserrat[600], fontSize: 14 }}>{displayTodoTitle}</MediumText>
                <SmallText
                    color={category ? Colors.green.bsae : Colors.lightBlack[1]}
                    sx={{ fontFamily: fonts.Montserrat[500] }}>
                    {category ? category : "Uncategorized"}
                </SmallText>
            </View>
            <View style={styles.rightMain}>
                <View style={styles.chip(status)}>
                    <View style={styles.chipCircle(status)}></View>
                    <MediumText
                        sx={{ fontFamily: fonts.Montserrat[500], fontSize: 12 }}
                        color={status ? Colors.task.completedText : Colors.task.noCompletedText}>
                        {status ? "Completed" : "Pending"}
                    </MediumText>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    main: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.bgGrey + 80,
        // borderWidth: 1,
        borderColor: Colors.lightBlack[4],
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 8
    },
    leftMain: {
        width: "70%"
    },
    chip: (status) => ({
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        backgroundColor: status ? Colors.task.completedBG : Colors.task.noCompletedBG,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 50
    }),
    chipCircle: (status) => ({
        height: 6,
        width: 6,
        backgroundColor: status ? Colors.task.completedText : Colors.task.noCompletedText,
        borderRadius: 50
    })
});

/**
 * const levelToColor = {
    "Just Started": {
        backgroundColor: "#F5F5F5",
        foregroundColor: "#333333"
    },
    "Beginner": {
        backgroundColor: "#E6F7FF",
        foregroundColor: "#0047AB"
    },
    "Advanced": {
        backgroundColor: "#E5F9E0",
        foregroundColor: "#0B6623"
    },
    "Experienced": {
        backgroundColor: "#FFF9C4",
        foregroundColor: "#FFB300"
    }
};
 */
