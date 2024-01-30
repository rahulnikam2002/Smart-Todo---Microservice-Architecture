import { StyleSheet, View } from "react-native";
import { MediumText, SmallText } from "../../Text/Headings/Headings";
import { Colors } from "../../../utils/constants/colors/colors";
import { fonts } from "../../../utils/constants/fonts/fonts";
import { Icon } from "@rneui/base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export const SearchTodoContainer = ({ title, todoId }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate("DisplayAllTodos", { toId: todoId })}>
            <MediumText sx={{ fontFamily: fonts.Montserrat[500], fontSize: 15 }}>{title}</MediumText>
            <Icon
                name="arrow-forward-outline"
                type="ionicon"
                color={Colors.lightBlack[1]}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: Colors.lightBlack[4],
        borderBottomWidth: 1,
        borderBlockColor: Colors.bgGrey,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
        // elevation: 10
    }
});
