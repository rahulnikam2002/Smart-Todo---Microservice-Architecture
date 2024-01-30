import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { IconButton } from "../../Icons/Icon";
import { Icon, color } from "@rneui/base";
import { Colors } from "../../../utils/constants/colors/colors";
import { Image, View } from "react-native";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/auth/auth.context";
import { infoToast } from "../../../utils/toasts/toasts";

export const BottomTabs = () => {
    const { getUserDetailsWithToken } = useContext(AuthContext);
    const [userDeatils, setUserDetails] = useState({});

    const navigation = useNavigation();
    const getUserDetails = async () => {
        const details = await getUserDetailsWithToken();
        if (!details) {
            setUserDetails(null);
            logoutUser();
            return;
        }
        return details;
    };

    const getUserDetailsFromStore = async () => {
        const details = await getUserDetails();
        console.log({ details });
        setUserDetails(details);
    };

    useEffect(() => {
        getUserDetailsFromStore();
    }, []);
    return (
        <View style={styles.bottomTabs}>
            <View>
                <IconButton
                    name="home-outline"
                    size={25}
                    color={color}
                    type="ionicon"
                    onPress={() => navigation.navigate("homeScreen")}
                />
                {/* <SmallText sx={{ textAlign: "center" }}>Home</SmallText> */}
            </View>
            <View>
                <IconButton
                    name="search-outline"
                    size={25}
                    color={color}
                    type="ionicon"
                    onPress={() => navigation.navigate("SearchScreen")}
                />
                {/* <SmallText sx={{ textAlign: "center" }}>Search</SmallText> */}
            </View>
            <View>
                <IconButton
                    name="list-outline"
                    size={25}
                    color={color}
                    type="ionicon"
                    onPress={() => navigation.navigate("DisplayAllTodos")}
                />
                {/* <SmallText sx={{ textAlign: "center" }}>Products</SmallText> */}
            </View>
            <View>
                <IconButton
                    name="albums-outline"
                    size={25}
                    color={color}
                    type="ionicon"
                    onPress={() => infoToast("Coming Soon!", "Hold on our team is working on that")}
                />
                {/* <SmallText sx={{ textAlign: "center" }}>Cart</SmallText> */}
            </View>
            <View style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                {/* <IconButton
                    name="person-outline"
                    size={25}
                    // color={color}
                    // type="ionicon"
                    onPress={() => navigation.navigate("searchScreen")}
                /> */}
                <TouchableOpacity
                    onPress={() => infoToast("Coming Soon!", "Hold on our team is working on that")}
                    style={{ backgroundColor: "#8c7ae6", borderRadius: 50, position: "relative", top: 3 }}>
                    <Image
                        width={30}
                        height={30}
                        source={{ uri: userDeatils?.userAvatar }}
                    />
                </TouchableOpacity>
                {/* <SmallText sx={{ textAlign: "center" }}>Profile</SmallText> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomTabs: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingBottom: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9
        },
        shadowOpacity: 0.5,
        shadowRadius: 12.35,
        backgroundColor: "white",
        borderTopColor: Colors.bgGrey,
        borderTopWidth: 2
        // elevation: 100
    }
});

{
    /* <Tab.Navigator
screenOptions={{
  tabBarShowLabel: false,
  headerShown: false,
  tabBarActiveTintColor: Colors.black[10],
  tabBarInactiveTintColor: Colors.black[9],
  tabBarStyle: { height: 70 }
}}>
<Tab.Screen
  options={{
    tabBarIcon: ({color}) => (
      <Icon
        name="home-outline"
        size={25}
        color={color}
        type="ionicon"
      />
    )
  }}
  name="drawer"
  component={CustomDrawer}
/>
<Tab.Screen
  options={{
    tabBarIcon: ({color}) => (
      <Icon
        name="search-outline"
        size={25}
        color={color}
        type="ionicon"
      />
    )
  }}
  name="searchScreen"
  component={CartPage}
/>
<Tab.Screen
  options={{
    tabBarIcon: ({color}) => (
      <Icon
        name="leaf-outline"
        size={25}
        color={color}
        type="ionicon"
      />
    )
  }}
  name="productsScreen"
  component={CartPage}
/>
<Tab.Screen
  options={{
    tabBarIcon: ({color}) => (
      <Icon
        name="cart-outline"
        size={25}
        color={color}
        type="ionicon"
      />
    )
  }}
  name="cartScreen"
  component={CartPage}
/>
<Tab.Screen
  options={{
    tabBarIcon: ({color}) => (
      <Icon
        name="person-outline"
        size={25}
        color={color}
        type="ionicon"
      />
    )
  }}
  name="profile"
  component={CartPage}
/>
</Tab.Navigator> */
}
