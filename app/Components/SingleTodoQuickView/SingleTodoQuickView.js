import { StyleSheet, View } from "react-native";
import { MediumText, SmallText } from "../Text/Headings/Headings";
import { fonts } from "../../utils/constants/fonts/fonts";
import { Colors } from "../../utils/constants/colors/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export const SingleTodoQuickView = ({ todoTitle = "This is my todo one the first number with heading", category = "Web development", index = 0 }) => {
    const navigation = useNavigation();
    const displayTodoTitle = todoTitle.length > 30 ? todoTitle.substring(0, 30) + "..." : todoTitle;

    const redirectTodoScreen = () => {
        navigation.navigate("DisplayAllTodos", { toIndex: index });
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
                <MediumText
                    sx={{ fontFamily: fonts.Montserrat[500] }}
                    color={Colors.lightBlack[2]}>
                    Tuesday
                </MediumText>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    main: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.bgGrey,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 8
    },
    leftMain: {
        width: "70%"
    }
});
