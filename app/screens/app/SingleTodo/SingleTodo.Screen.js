import { StyleSheet, View } from "react-native";
import { MediumText, SmallText } from "../../../Components/Text/Headings/Headings";
import { Colors } from "../../../utils/constants/colors/colors";
import { fonts } from "../../../utils/constants/fonts/fonts";
import { useCallback } from "react";

export const SingleTodoScreen = ({ route }) => {
    const { todoTitle, todoDescription, taskId, expireAt, category } = route.params;

    const dateConversion = useCallback(
        (date) => {
            const originalDateString = date;

            // Convert the original date string to a Date object
            const dateObject = new Date(originalDateString);

            // Convert the date to the desired format (26 April 2024)
            const formattedDate = dateObject.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric"
            });

            return formattedDate;
        },
        [expireAt]
    );

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.nameCatContainer}>
                    <MediumText sx={styles.title}>{todoTitle}</MediumText>
                    {category && (
                        <View style={styles.categoryChip}>
                            <SmallText
                                color={Colors.white}
                                sx={styles.categoryText}>
                                {category}
                            </SmallText>
                        </View>
                    )}
                </View>
                <SmallText
                    sx={styles.expireDate}
                    color={Colors.lightBlack[1]}>
                    Will Expire on {dateConversion(expireAt)}
                </SmallText>
            </View>
            {todoDescription && (
                <View style={styles.container}>
                    <MediumText sx={styles.description}>{todoDescription}</MediumText>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        marginTop: 5,
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    title: {
        fontFamily: fonts.Montserrat[500],
        fontSize: 16
    },
    expireDate: {
        fontFamily: fonts.Montserrat[500]
    },
    nameCatContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    categoryChip: {
        backgroundColor: Colors.green.bsae,
        paddingVertical: 1,
        paddingHorizontal: 10,
        borderRadius: 50
    },
    categoryText: {
        fontFamily: fonts.Montserrat[500],
        fontSize: 10
    },
    description: {
        fontFamily: fonts.Montserrat[400]
    }
});
