import { TouchableOpacity, StyleSheet, View } from "react-native";
import { MediumText, SmallHeadingText, SmallText, SubHeadingText } from "../Text/Headings/Headings";
import { Colors } from "../../utils/constants/colors/colors";
import { fonts } from "../../utils/constants/fonts/fonts";
import { Icon } from "@rneui/base";
import { IconButton } from "../Icons/Icon";
import Checkbox from "expo-checkbox";
import { useCallback, useState } from "react";
import { ReadableDate } from "../../utils/helpers/date/readableDate";
import { Spacer } from "../NavigationComponents/Drawer/CustomDrawer";
const uncategorizedLabel = "Uncategorized";

export const SingleTodoContainer = ({
    taskId,
    todoTitle,
    todoDescription,
    category,
    expireAt,
    markAsDone,
    unChecked,
    openBottomSheet,
    isExpired,
    section
}) => {
    const [isChecked, setChecked] = useState(false);

    const showReadableDate = (date) => ReadableDate(date);

    const handleCheckTap = () => {
        if (!isChecked) {
            setChecked(true);
            markAsDone(taskId);
        } else {
            setChecked(false);
            unChecked(taskId);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View>
                    <View>
                        <MediumText
                            color={category ? Colors.green.bsae : Colors.lightBlack[3]}
                            sx={{ fontSize: 10, fontFamily: fonts.Montserrat[600] }}>
                            {category ? category : uncategorizedLabel}
                        </MediumText>
                    </View>
                    <View>
                        <SubHeadingText sx={{ fontSize: 18, fontFamily: fonts.Montserrat[600] }}>{todoTitle}</SubHeadingText>
                    </View>
                    <View style={styles.todoDescription}>
                        {todoDescription && (
                            <SmallText color={Colors.lightBlack[2]}>
                                {todoDescription.length <= 100 ? todoDescription : `${todoDescription.substring(0, 100)}...`}
                            </SmallText>
                        )}
                    </View>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => openBottomSheet({ taskId, todoTitle, todoDescription, category, expireAt })}
                        activeOpacity={0.5}>
                        <Icon
                            type="ionicon"
                            name="ellipsis-vertical"
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.stats}>
                    <MediumText
                        sx={{ fontFamily: fonts.Montserrat[600], fontSize: 13 }}
                        color={Colors.lightBlack[1]}>
                        Today |
                    </MediumText>
                    <MediumText sx={{ fontFamily: fonts.Montserrat[500], fontSize: 11 }}>{showReadableDate(expireAt)}</MediumText>
                </View>
                {!isExpired && section !== "completed" && (
                    <Checkbox
                        style={styles.checkbox}
                        value={isChecked}
                        onValueChange={handleCheckTap}
                        color={Colors.bgBlack}
                    />
                )}
                {section === "completed" && (
                    <TouchableOpacity>
                        <MediumText>Mark as incompleted</MediumText>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 3
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
        flexDirection: "row",
        gap: 10
    },
    stats: {
        flexDirection: "row",
        alignItems: "baseline",
        gap: 5
    },
    bottomContainer: {
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    checkbox: {
        borderRadius: 50,
        height: 20,
        width: 20
    },
    todoDescription: {
        width: "95%"
    }
});

/**
 * 
 * <View style={styles.statsArea}>
                        <Icon
                            type="ionicon"
                            name="calendar"
                            size={18}
                            color={Colors.red.base}
                        />
                        <MediumText>12 Jan 2024</MediumText>
                    </View>
                    <View style={styles.statsArea}>
                        <Icon
                            type="ionicon"
                            name="trophy"
                            size={18}
                            color={Colors.red.base}
                        />
                        <MediumText>18 Jan 2024</MediumText>
                    </View>
 */
