import { Image, StyleSheet, View } from "react-native";
import { MediumText, SubHeadingText } from "../Text/Headings/Headings";
import { TouchableButton } from "../Button/Button";
import { fonts } from "../../utils/constants/fonts/fonts";
import { useNavigation } from "@react-navigation/native";

export const EmptyScreen = ({ screenName, query, imageURL, text }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: imageURL }}
                width={150}
                height={150}
                resizeMode="contain"
            />
            <MediumText sx={{ width: "85%", textAlign: "center", fontFamily: fonts.Montserrat[500] }}>{text}</MediumText>
            {screenName === "completed" || screenName === "expired" ? null : (
                <View style={styles.btn}>
                    <TouchableButton
                        onPress={() => navigation.navigate(screenName, query)}
                        hidden={false}
                        txtWidth={"100%"}
                        btnWidth={"100%"}
                        title={"Create new"}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        position: "relative"
    },
    btn: {
        position: "absolute",
        bottom: 0,
        width: "90%",
        margin: 10
    }
});
