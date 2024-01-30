import { StyleSheet, View } from "react-native";
import { MediumText, SmallText } from "../Text/Headings/Headings";
import { Colors } from "../../utils/constants/colors/colors";
import { fonts } from "../../utils/constants/fonts/fonts";
import { MotiView } from "moti";
import { Spacer } from "../NavigationComponents/Drawer/CustomDrawer";
import { Skeleton } from "moti/skeleton";

export const TodoGroupBoxSkeleton = () => {
    return (
        <View style={[styles.mainContainer]}>
            <View style={styles.headerContainer}>
                <Skeleton
                    colorMode="light"
                    height={10}
                    width={10}
                    radius={50}
                />

                {/* <Spacer height={5} /> */}
                <Skeleton
                    colorMode="light"
                    height={10}
                    width={"50%"}
                    radius={50}
                />
            </View>
            <View style={styles.titleContainer}>
                <Skeleton
                    colorMode="light"
                    height={15}
                    width={"100%"}
                    radius={50}
                />
                <Spacer height={5} />
                <Skeleton
                    colorMode="light"
                    height={10}
                    width={"40%"}
                    radius={50}
                />
            </View>
            <MotiView style={styles.percentageContainer}>
                <MotiView style={styles.background}>
                    <MotiView
                        from={{ width: "0%" }}
                        animate={{ width: "20%" }}
                        // transition={{ duration: 0.24 /}}
                        style={[styles.foreground]}></MotiView>
                </MotiView>
            </MotiView>
        </View>
    );
};

const styles = StyleSheet.create({
    dot: {
        width: 10,
        height: 10,
        borderRadius: 50
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginBottom: 10
    },
    mainContainer: {
        backgroundColor: Colors.bgGrey,
        // borderLeftWidth: 5,
        padding: 15,
        borderRadius: 10,
        marginTop: 10
        // elevation: 1
    },
    titleContainer: {
        marginTop: 2
    },
    percentageContainer: {
        position: "relative",
        marginTop: 10
    },
    background: {
        backgroundColor: Colors.white,
        height: 10,
        borderRadius: 50,
        position: "relative"
    },
    foreground: {
        width: "30%",
        height: 10,
        borderRadius: 50
    }
});
