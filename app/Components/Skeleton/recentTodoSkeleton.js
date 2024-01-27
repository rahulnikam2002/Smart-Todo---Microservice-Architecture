import { StyleSheet, View } from "react-native";
import { Colors } from "../../utils/constants/colors/colors";
import { Skeleton } from "moti/skeleton";
import { MotiView } from "moti";
import { Spacer } from "../NavigationComponents/Drawer/CustomDrawer";

export const RecentTodoSkeleton = () => {
    return (
        <MotiView style={styles.main}>
            <View style={styles.leftMain}>
                <Skeleton
                    colorMode="light"
                    height={15}
                    width={"100%"}
                    radius={3}
                />
                <Spacer height={5} />
                <Skeleton
                    colorMode="light"
                    height={10}
                    width={"25%"}
                    radius={3}
                />
            </View>
            <View style={styles.rightMain}>
                <Skeleton
                    colorMode="light"
                    height={10}
                    width={60}
                    radius={3}
                />
            </View>
        </MotiView>
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
