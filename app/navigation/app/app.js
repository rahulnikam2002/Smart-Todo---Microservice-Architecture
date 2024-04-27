import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { DrawerNavigation } from "../../Components/NavigationComponents/Drawer/Drawer";
import { useGoogleFonts } from "../../Hooks/Fonts/useFonts";
import { useState } from "react";
import { Text, View } from "react-native";
import { ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { IconButton } from "../../Components/Icons/Icon";
import { MediumText } from "../../Components/Text/Headings/Headings";
import { fonts } from "../../utils/constants/fonts/fonts";
import { SelectAvatarScreen } from "../../screens/app/selectAvatar/app";
import { CreateSingleTask } from "../../screens/app/createTask/singleTask";
import { CreateProject } from "../../screens/app/createProject/createProject";
import { BottomTabs } from "../../Components/NavigationComponents/BottomTabs/BottomTabs";
import { DisplayAllTodos } from "../../screens/app/allTodos/allTodos.screen";
import { AllTodosScreen } from "../../screens/app/allTodos/todos.screen";
import { SearchScreen } from "../../screens/app/search/search.screen";
import { UserScreen } from "../../screens/app/user/user.screen";
import { Icon } from "@rneui/base";
import { SingleTodoScreen } from "../../screens/app/SingleTodo/SingleTodo.Screen";

const Stack = createStackNavigator();

export const App = () => {
    const { fontError, fontsLoaded } = useGoogleFonts();
    const [fontLoading, setFontLoading] = useState(fontsLoaded);

    useEffect(() => {
        if (fontsLoaded) {
            setFontLoading(true);
        }
    }, [fontsLoaded]);

    return fontLoading ? (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}>
            <Stack.Screen
                name="customDrawer"
                component={DrawerNavigation}
            />
            <Stack.Screen
                name="CreateSingleTask"
                options={{
                    gestureEnabled: true,
                    gestureDirection: "vertical",
                    gestureResponseDistance: 700,
                    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                    headerShown: true,
                    headerTitle: "New Task",
                    headerTitleStyle: { fontSize: 15, fontFamily: fonts.Montserrat[600] }
                }}
                component={CreateSingleTask}
            />
            <Stack.Screen
                name="CreateProject"
                options={{
                    gestureEnabled: true,
                    gestureResponseDistance: 400,
                    headerShown: true,
                    headerTitle: "New project",
                    headerTitleStyle: { fontSize: 15, fontFamily: fonts.Montserrat[600] }
                }}
                component={CreateProject}
            />
            <Stack.Screen
                name="DisplayAllTodos"
                options={{
                    gestureEnabled: true,
                    gestureResponseDistance: 50,
                    headerShown: true,
                    headerTitle: "Tasks",
                    headerTitleStyle: { fontSize: 15, fontFamily: fonts.Montserrat[600] }
                }}
                component={AllTodosScreen}
            />
            <Stack.Screen
                name="SearchScreen"
                options={{
                    gestureEnabled: true,
                    gestureDirection: "vertical",
                    gestureResponseDistance: 50,
                    headerShown: true,
                    headerTitle: "Search",
                    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                    headerTitleStyle: { fontSize: 15, fontFamily: fonts.Montserrat[600] }
                }}
                component={SearchScreen}
            />

            <Stack.Screen
                name="userProfileScreen"
                component={UserScreen}
                options={{
                    headerShown: true,
                    headerTitle: "Profile",
                    headerTitleStyle: {
                        fontSize: 15,
                        fontFamily: fonts.Montserrat[600]
                    },
                    headerRight: () => <Text>Hello Right!</Text>
                }}
            />
            <Stack.Screen
                name="SingleTodoScreen"
                component={SingleTodoScreen}
                options={{
                    headerShown: true,
                    headerTitle: "Task Details",
                    headerTitleStyle: {
                        fontSize: 15,
                        fontFamily: fonts.Montserrat[600]
                    }
                    // headerRight: () => <Text>Hello Right!</Text>
                }}
            />
        </Stack.Navigator>
    ) : (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                height: "100%"
            }}>
            <ActivityIndicator
                size={50}
                color={"#000"}
            />
        </View>
    );
};
