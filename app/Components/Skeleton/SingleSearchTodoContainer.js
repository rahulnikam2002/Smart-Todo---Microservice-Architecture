import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Skeleton } from "moti/skeleton";
import { Colors } from "../../utils/constants/colors/colors";
import { Spacer } from "../NavigationComponents/Drawer/CustomDrawer";

export const SearchTodoContainerSkeleton = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <View>
                <Skeleton
                    height={15}
                    width={"70%"}
                    colorMode="light"
                    radius={50}
                />
                <Spacer height={10} />
                <Skeleton
                    height={15}
                    width={"30%"}
                    colorMode="light"
                    radius={50}
                />
            </View>
            <Skeleton
                height={20}
                width={20}
                colorMode="light"
                radius={50}
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
