/**
 * @responsibility: This screen is responsible for showing Restautant and Dishes Tabs and their components.
 */

import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../../../utils/constants/colors/colors";
import { fonts } from "../../../utils/constants/fonts/fonts";
import { DisplayAllTodos } from "./allTodos.screen";
import { CompletedTasks } from "./sections/completedTasks.screen";
import { ExpiredTasks } from "./sections/expiredTasks.screen";
import { MediumText, SmallText } from "../../../Components/Text/Headings/Headings";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Icon } from "@rneui/base";

const Tab = createMaterialTopTabNavigator();

const renderScene = ({ route }) => {
    switch (route.key) {
        case "pendingTab":
            return <DisplayAllTodos />;
        case "doneTab":
            return <CompletedTasks />;
        case "expiredTab":
            return <ExpiredTasks />;
        default:
            return null;
    }
};

export const AllTodosScreen = () => {
    const routes = useRoute();
    const toIndex = routes.params;
    console.log(toIndex);
    return (
        <Tab.Navigator
            screenOptions={{
                lazy: true,
                tabBarLabelStyle: { textTransform: "none", fontFamily: fonts.Montserrat[500] }
            }}>
            <Tab.Screen
                name="pendingTasks"
                options={{
                    title: "Pending"
                }}
                component={DisplayAllTodos}
                initialParams={toIndex}
            />
            <Tab.Screen
                name="completedtasks"
                options={{
                    title: "Completed"
                }}
                component={CompletedTasks}
            />
            <Tab.Screen
                name="expiredTasks"
                options={{
                    title: "Expired"
                }}
                component={ExpiredTasks}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.white
    },
    tabItem: {
        flex: 1,
        alignItems: "center"
    },
    tabBarTitles: {
        padding: 16,
        textAlign: "center",
        width: "100%",
        fontSize: 12
    }
});
