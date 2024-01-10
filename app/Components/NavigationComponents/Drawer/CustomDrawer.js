import { View } from "react-native";
import {
  MediumText,
  SmallHeadingText,
  SmallText
} from "../../Text/Headings/Headings";
import { CustomSafeAreaView } from "../../SafeAreaView/SafeAreaView";
import { Avatar, Icon } from "@rneui/base";
import { fonts } from "../../../utils/constants/fonts/fonts";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { Colors } from "../../../utils/constants/colors/colors";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/auth/auth.context";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

export const DrawerContents = ({ navigation }) => {
  const { logoutUser, getUserDetailsFromStore } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  const [userDetailsLoaded, setUserDetailsLoaded] = useState(false);

  const getUserDetails = async () => {
    setUserDetailsLoaded(false);
    const details = await getUserDetailsFromStore();
    if (!details) {
      // #TODO: handle this scenario
      setUserDetailsLoaded(true);
      console.log("Not in store");
      return;
    }
    setUserDetailsLoaded(true);
    setUserDetails(details);
    return;
  };

  console.log(userDetailsLoaded);

  useEffect(() => {
    getUserDetails();
    return setUserDetailsLoaded(false);
  }, []);

  return (
    <CustomSafeAreaView
      style={{
        height: "100%",
        // justifyContent: "space-between",
        paddingHorizontal: 20
      }}>
      {userDetailsLoaded ? (
        <View>
          <Avatar
            containerStyle={{ backgroundColor: "#8c7ae6", borderRadius: 100 }}
            size={64}
            rounded
            source={{
              uri: userDetails && userDetails.userAvatar
            }}
          />
          <MediumText sx={{ fontFamily: fonts.Montserrat[600], marginTop: 5 }}>
            {userDetails && userDetails.userName}
          </MediumText>
          <SmallText sx={{ fontFamily: fonts.Montserrat[400] }}>
            {userDetails && userDetails.userEmail}
          </SmallText>
        </View>
      ) : (
        <MotiView>
          <Skeleton
            colorMode="light"
            height={64}
            radius="round"
            width={64}
          />
          <Spacer height={5} />
          <Skeleton
            colorMode="light"
            height={20}
            radius={2}
            width={"70%"}
          />
          <Spacer height={5} />
          <Skeleton
            colorMode="light"
            height={15}
            radius={2}
            width={"100%"}
          />
        </MotiView>
      )}

      <View style={{marginTop: 20}}>
        {MenuItems.map((item, index) => (
          <TouchableOpacity
            style={styles.singleMenuItem}
            onPress={() => navigation.navigate(item.toScreen)}
            key={index}>
            <Icon
              type="material"
              name={item.icon}
              size={20}
              color={Colors.bgBlack}
            />
            <MediumText
              sx={{ marginLeft: 10, fontFamily: fonts.Montserrat[500] }}>
              {item.name}
            </MediumText>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        <TouchableOpacity
          style={[styles.singleMenuItem, { marginBottom: 50 }]}
          onPress={() => logoutUser()}>
          <Icon
            type="material"
            name="logout"
          />

          <MediumText
            sx={{ marginLeft: 10, fontFamily: fonts.Montserrat[500] }}>
            Logout
          </MediumText>
        </TouchableOpacity>
      </View>
    </CustomSafeAreaView>
  );
};

const Spacer = ({ height = 16 }) => <View style={{ height }} />;

const styles = StyleSheet.create({
  singleMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: Colors.bgBlack,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black[1]
  }
});

const MenuItems = [
  {
    name: "Home",
    icon: "home",
    toScreen: "homeScreen"
  },
  {
    name: "Todos",
    icon: "category",
    toScreen: "homeScreen"
  },
  {
    name: "Planing",
    icon: "category",
    toScreen: "homeScreen"
  },
  {
    name: "Categories",
    icon: "category",
    toScreen: "homeScreen"
  },
  {
    name: "Settings",
    icon: "settings",
    toScreen: "homeScreen"
  }
];
