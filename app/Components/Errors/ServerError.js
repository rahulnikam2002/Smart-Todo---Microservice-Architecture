import { Image, StyleSheet, View } from "react-native";
import { MediumText, SubHeadingText } from "../Text/Headings/Headings";
import { TouchableButton } from "../Button/Button";
import { fonts } from "../../utils/constants/fonts/fonts";

const ERROR_IMG = "https://res.cloudinary.com/dyy7ynyzb/image/upload/v1705220508/Smart%20Todo%20Application/Icons/database_lt35om.png";

export const ServerError = ({ fetchAgainFunction }) => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: ERROR_IMG }}
                width={150}
                height={150}
                resizeMode="contain"
            />
            <MediumText sx={{ width: "70%", textAlign: "center", fontFamily: fonts.Montserrat[500] }}>
                Something went wrong at our side! Try to refresh 👉👈
            </MediumText>
            <View style={styles.btn}>
                <TouchableButton
                    onPress={fetchAgainFunction}
                    hidden={false}
                    txtWidth={"100%"}
                    btnWidth={"100%"}
                    title={"Try again"}
                />
            </View>
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
