import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { IconButton } from "../../Icons/Icon";
import { Icon, color } from "@rneui/base";
import { Colors } from "../../../utils/constants/colors/colors";
import { View } from "react-native";
import { StyleSheet } from "react-native";

export const BottomTabs = ({ navigation }) => {
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
          onPress={() => navigation.navigate("searchScreen")}
        />
        {/* <SmallText sx={{ textAlign: "center" }}>Search</SmallText> */}
      </View>
      <View>
        <IconButton
          name="leaf-outline"
          size={25}
          color={color}
          type="ionicon"
          onPress={() => navigation.navigate("productsScreen")}
        />
        {/* <SmallText sx={{ textAlign: "center" }}>Products</SmallText> */}
      </View>
      <View>
        <IconButton
          name="cart-outline"
          size={25}
          color={color}
          type="ionicon"
          onPress={() => navigation.navigate("cartScreen")}
        />
        {/* <SmallText sx={{ textAlign: "center" }}>Cart</SmallText> */}
      </View>
      <View>
        <IconButton
          name="person-outline"
          size={25}
          color={color}
          type="ionicon"
          onPress={() => navigation.navigate("searchScreen")}
        />
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    backgroundColor: "white"
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
