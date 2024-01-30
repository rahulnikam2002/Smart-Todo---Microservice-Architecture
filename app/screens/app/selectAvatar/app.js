import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { HeadingText, MediumText, SmallHeadingText, SubHeadingText } from "../../../Components/Text/Headings/Headings";
import { CustomSafeAreaView } from "../../../Components/SafeAreaView/SafeAreaView";
import { fonts } from "../../../utils/constants/fonts/fonts";
import { TouchableButton } from "../../../Components/Button/Button";
import { useContext, useState } from "react";
import { infoToast } from "../../../utils/toasts/toasts";
import { userServiceHost } from "../../../utils/constants/ip";
import axios from "axios";
import { AuthContext } from "../../../context/auth/auth.context";
import { tokens } from "../../../utils/constants/constant";

export const SelectAvatarScreen = ({ route }) => {
    const { registerUser } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(0);

    const { email, key, password, userName, userNumber } = route.params;

    const handleSignUp = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                `${userServiceHost}/api/auth/signup`,
                {
                    userEmail: email,
                    userPassword: password,
                    userName: userName,
                    userAvatar: avatars[selectedAvatar].avatar,
                    userNumber: userNumber
                },
                {
                    headers: {
                        Authorization: tokens.authToken,
                        "smart-user-token": key
                    }
                }
            );
            const { accountCreated, userToken, ...rest } = response.data;
            setLoading(false);
            if (!accountCreated) {
                return infoToast("Server issue 👉👈", "We're sorry, but our team is working on this!");
            }

            const userDetailsForSecureStore = {
                userEmail: email,
                userAvatar: avatars[selectedAvatar].avatar,
                userName: userName,
                userNumber: userNumber
            };

            return registerUser(userToken, userDetailsForSecureStore);
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.status) {
                const { status } = error.response;
                if (status === 409) {
                    return infoToast("Already a member! 🥳", "You must Sign in, you are already sign up");
                } else if (status === 400) {
                    return infoToast("Invalid details", "Make sure you enter all correct details");
                }
            }
            // Handle other types of errors or when error.response is undefined
            return infoToast("Server issue 👉👈", "We're sorry, but our team is working on this!");
        }
    };

    return (
        <View style={{ padding: 10, height: "100%" }}>
            <View style={styles.header}>
                <SubHeadingText
                    sx={{
                        fontFamily: fonts.Montserrat[600],
                        fontSize: 18,
                        textAlign: "center"
                    }}>
                    Select Avatar
                </SubHeadingText>
            </View>
            <View style={styles.avatarMainArea}>
                <View style={styles.mainAvatar}>
                    <Image
                        style={styles.mainAvatarImg}
                        source={{ uri: avatars[selectedAvatar].avatar }}
                        width={100}
                        height={100}
                        resizeMode="cover"
                    />
                </View>
            </View>

            <View>
                <View style={styles.avatarsList}>
                    {avatars &&
                        avatars.map((avatar, idx) => (
                            <TouchableOpacity
                                onPress={() => setSelectedAvatar(idx)}
                                key={idx}
                                style={styles.listAvatar}>
                                <Image
                                    style={styles.listAvatarImg}
                                    source={{ uri: avatar.avatar }}
                                    width={70}
                                    height={70}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>
                        ))}
                </View>
            </View>
            <View style={styles.button}>
                <TouchableButton
                    title={"Save and continue"}
                    hidden={false}
                    onPress={() => handleSignUp()}
                    loading={loading}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingVertical: 15
    },
    mainAvatarImg: {
        width: 100,
        height: 100
    },
    button: {
        position: "absolute",
        bottom: 15,
        left: 15,
        alignItems: "flex-start"
    },

    mainAvatar: {
        backgroundColor: "#8c7ae6",
        alignSelf: "flex-start",
        borderRadius: 100,
        width: 120,
        height: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },

    avatarMainArea: {
        width: "100%",
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    avatarsList: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: 20,
        marginTop: 30
        // backgroundColor: "red"
    },
    listAvatar: {
        backgroundColor: "#8c7ae6",
        borderRadius: 50,
        width: "23%",
        height: "24%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
    //   listAvatarImg: {
    //     width: 60
    //   }
});

const avatars = [
    {
        id: 1,
        type: "Male",
        avatar: "https://res.cloudinary.com/dyy7ynyzb/image/upload/v1704735918/Smart%20Todo%20Application/man_1_tcr0wi.png"
    },
    {
        id: 2,
        type: "Male",
        avatar: "https://res.cloudinary.com/dyy7ynyzb/image/upload/v1704735917/Smart%20Todo%20Application/man_abigpp.png"
    },
    {
        id: 3,
        type: "Male",
        avatar: "https://res.cloudinary.com/dyy7ynyzb/image/upload/v1704735915/Smart%20Todo%20Application/boy_rujfhc.png"
    },
    {
        id: 4,
        type: "Male",
        avatar: "https://res.cloudinary.com/dyy7ynyzb/image/upload/v1704735909/Smart%20Todo%20Application/boy_2_ylmst3.png"
    },
    {
        id: 5,
        type: "Male",
        avatar: "https://res.cloudinary.com/dyy7ynyzb/image/upload/v1704735901/Smart%20Todo%20Application/boy_1_jfpnj9.png"
    },
    {
        id: 6,
        type: "Male",
        avatar: "https://res.cloudinary.com/dyy7ynyzb/image/upload/v1704735882/Smart%20Todo%20Application/male_aq7sbv.png"
    },
    {
        id: 7,
        type: "Male",
        avatar: "https://res.cloudinary.com/dyy7ynyzb/image/upload/v1704735868/Smart%20Todo%20Application/man_2_ifream.png"
    },
    {
        id: 8,
        type: "Female",
        avatar: "https://res.cloudinary.com/dyy7ynyzb/image/upload/v1704735911/Smart%20Todo%20Application/girl_1_lcvemh.png"
    },
    {
        id: 9,
        type: "Female",
        avatar: "https://res.cloudinary.com/dyy7ynyzb/image/upload/v1704735897/Smart%20Todo%20Application/girl_o2z6dz.png"
    },
    {
        id: 10,
        type: "Female",
        avatar: "https://res.cloudinary.com/dyy7ynyzb/image/upload/v1704735901/Smart%20Todo%20Application/girl-power_yaauzd.png"
    },
    {
        id: 11,
        type: "Female",
        avatar: "https://res.cloudinary.com/dyy7ynyzb/image/upload/v1704735873/Smart%20Todo%20Application/woman_mzrgct.png"
    },
    {
        id: 12,
        type: "Female",
        avatar: "https://res.cloudinary.com/dyy7ynyzb/image/upload/v1704735869/Smart%20Todo%20Application/girl_2_iketvt.png"
    },
    {
        id: 13,
        type: "Female",
        avatar: "https://res.cloudinary.com/dyy7ynyzb/image/upload/v1704782158/Smart%20Todo%20Application/woman_1_wd8ayq.png"
    },
    {
        id: 14,
        type: "Female",
        avatar: "https://res.cloudinary.com/dyy7ynyzb/image/upload/v1704782158/Smart%20Todo%20Application/man_3_nzgbsm.png"
    },
    {
        id: 15,
        type: "Male",
        avatar: "https://res.cloudinary.com/dyy7ynyzb/image/upload/v1704782158/Smart%20Todo%20Application/astronaut_noiclp.png"
    },
    {
        id: 16,
        type: "Female",
        avatar: "https://res.cloudinary.com/dyy7ynyzb/image/upload/v1704782542/Smart%20Todo%20Application/boy_3_p2gdq7.png"
    }
];
