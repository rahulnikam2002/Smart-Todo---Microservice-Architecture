import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { StyleSheet } from "react-native";
import { Colors } from "../../utils/constants/colors/colors";
import { MediumText, SmallText, SubHeadingText } from "../Text/Headings/Headings";
import { fonts } from "../../utils/constants/fonts/fonts";
import { TouchableOpacity } from "react-native-gesture-handler";
import Checkbox from "expo-checkbox";
import { Icon } from "@rneui/base";
import { Spacer } from "../NavigationComponents/Drawer/CustomDrawer";

export const SingleTodoSkeleton = () => {
    const mode = "light";
    return (
        <MotiView style={styles.container}>
            <MotiView style={styles.topContainer}>
                <MotiView>
                    <MotiView>
                        <Skeleton
                            colorMode={mode}
                            height={10}
                            radius={"square"}
                            width={64}
                        />
                    </MotiView>
                    <MotiView>
                        <Spacer height={5} />

                        <Skeleton
                            colorMode={mode}
                            height={20}
                            radius={"square"}
                            width={"90%"}
                        />
                    </MotiView>
                    <Spacer height={5} />

                    <Skeleton
                        colorMode={mode}
                        height={8}
                        radius={"square"}
                        width={"90%"}
                    />
                    <Spacer height={2} />
                    <Skeleton
                        colorMode={mode}
                        height={8}
                        radius={"square"}
                        width={"70%"}
                    />
                </MotiView>
                <MotiView>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Spacer height={2} />
                        <Skeleton
                            colorMode={mode}
                            height={20}
                            radius={"round"}
                            width={20}
                        />
                    </TouchableOpacity>
                </MotiView>
            </MotiView>
            <MotiView style={styles.bottomContainer}>
                <MotiView>
                    <Spacer height={2} />
                    <Skeleton
                        colorMode={mode}
                        height={10}
                        radius={"square"}
                        width={"50%"}
                    />
                </MotiView>
                <Skeleton
                    colorMode={mode}
                    height={20}
                    radius={"round"}
                    width={20}
                />
            </MotiView>
        </MotiView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 3
    },
    topContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        borderBottomColor: Colors.bgGrey,
        borderBottomWidth: 2,
        paddingBottom: 10
    },
    statsArea: {
        flexDirection: "row"
    },
    stats: {
        flexDirection: "row",
        alignItems: "baseline"
    },
    bottomContainer: {
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
});
