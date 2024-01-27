import { StyleSheet, View } from "react-native";
import { MediumText, SmallText } from "../Text/Headings/Headings";
import { Colors } from "../../utils/constants/colors/colors";
import { fonts } from "../../utils/constants/fonts/fonts";
import { MotiView } from "moti";

export const TodoGroupBox = ({ boxCategory, title, subTitle, percentageCompleted }) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.dot}></View>
                <SmallText sx={{ fontFamily: fonts.Montserrat[500] }}>{boxCategory}</SmallText>
            </View>
            <View style={styles.titleContainer}>
                <MediumText sx={{ fontFamily: fonts.Montserrat[600], fontSize: 17 }}>{title}</MediumText>
                <SmallText color={Colors.lightBlack[1]}>{subTitle}</SmallText>
            </View>
            <MotiView style={styles.percentageContainer}>
                <MotiView style={styles.background}>
                    <MotiView
                        from={{ width: "0%" }}
                        animate={{ width: "50%" }}
                        // transition={{ duration: 0.24 /}}
                        style={styles.foreground}></MotiView>
                </MotiView>
            </MotiView>
        </View>
    );
};

const styles = StyleSheet.create({
    dot: {
        width: 10,
        height: 10,
        borderRadius: 50,
        backgroundColor: Colors.green.bsae
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginBottom: 10
    },
    mainContainer: {
        backgroundColor: Colors.bgGrey,
        borderLeftColor: Colors.green.bsae,
        borderLeftWidth: 5,
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
        backgroundColor: Colors.green.bsae,
        width: "30%",
        height: 10,
        borderRadius: 50
    }
});
