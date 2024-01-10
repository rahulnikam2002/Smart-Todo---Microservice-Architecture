import { Text } from "react-native"
import { StyleSheet } from "react-native"
import { View } from "react-native"
import { fonts } from "../../../utils/constants/fonts/fonts"

export const BottomSheetBody = ({children}) => {
    return (
        <View style={styles.body}>
            <Text style={styles.bodyText}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        padding: 20
    },
    bodyText: {
        fontFamily: fonts.Montserrat[400]
    }
})