import { Button, StatusBar } from "react-native";
import { Text, View } from "react-native";
import { useDrawerProgress } from "@react-navigation/drawer";
import Animated, { useAnimatedStyle, interpolate } from "react-native-reanimated";
import { IconButton } from "../../../Components/Icons/Icon";
import { MediumText, SmallHeadingText, SmallText, SubHeadingText } from "../../../Components/Text/Headings/Headings";
import { StyleSheet } from "react-native";
import { fonts } from "../../../utils/constants/fonts/fonts";
import { CustomSafeAreaView } from "../../../Components/SafeAreaView/SafeAreaView";
import { ClickSeachBar } from "../../../Components/Search/ClickSearchBar/ClickSearchBar";
import { BottomTabs } from "../../../Components/NavigationComponents/BottomTabs/BottomTabs";
import { Colors } from "../../../utils/constants/colors/colors";
import { HorizontalBanner } from "../../../Components/Advertisement/Banners/Horizontal/Horizontal";
import { HorizontalBannerArea } from "../../../Components/Advertisement/BannerArea/HorizontalArea/HorizontalArea";
import { SingleBannerAds, multipleBaneerAds } from "../../../Static/data/Ads/Ads";
import { SeactionHeader } from "../../../Components/Headers/SectionHeader/SeactionHeader";
import { CircleCategory } from "../../../Components/Category/CircleCategory/CircleCategory";
import { categoriesData } from "../../../Static/data/categories/data";
import { ScrollView } from "react-native";
import { RefreshControl } from "react-native";
import { useContext, useEffect, useState } from "react";
import { useCallback } from "react";
import { ProductGridLayout } from "../../../Components/Products/Layouts/Grid/Grid";
import { products } from "../../../Static/data/products/data";
import { AuthContext } from "../../../context/auth/auth.context";
import * as SecureStore from "expo-secure-store";
import { TaskProgressTracker } from "../../../Components/TaskProgressTracker/TaskProgressTracker";
import { BottomSheetHeader } from "../../../Components/BottomSheet/Header/header";
import { BottomSheetBody } from "../../../Components/BottomSheet/Body/Body";
import { BottomSheet } from "../../../Components/BottomSheet/BottomSheetWrapper";
import { Icon } from "@rneui/base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export const HomeScreen = () => {
    const [refreshing, setRefreshing] = useState(false);

    // Bottom sheet
    const [snapToIndex, setSnapToIndex] = useState(-1);

    const navigation = useNavigation();

    // Drawer navigation
    const drawerProgress = useDrawerProgress();
    const viewStyles = useAnimatedStyle(() => {
        const scale = interpolate(drawerProgress.value, [0, 1], [1, 0.8]);
        const borderRadius = interpolate(drawerProgress.value, [0, 1], [0, 20]);
        return {
            transform: [{ scale }],
            borderRadius
        };
    });

    const onRefresh = useCallback(() => {
        console.log("refreshing");
    }, []);

    const handleOpenBottomSheet = () => {
        setSnapToIndex(1);
    };

    const handleTodoScreenRedirection = (type) => {
        setSnapToIndex(-1);
        if (type === "singleTodo") {
            return navigation.navigate("CreateSingleTask");
        }
        return;
    };

    return (
        <Animated.View style={[viewStyles, styles.homeMain]}>
            <StatusBar backgroundColor={Colors.bgBlack} />
            <HomeHeader navigation={navigation}></HomeHeader>
            <View style={{ marginBottom: 5, paddingHorizontal: 10 }}>
                <View style={{ marginTop: 15, marginBottom: 8 }}>
                    <SmallText>
                        Hi, <SmallText sx={{ fontFamily: fonts.Montserrat[500] }}>Rahul</SmallText> ❤️
                    </SmallText>
                    <MediumText sx={{ fontFamily: fonts.Montserrat[600] }}>Be productive today!</MediumText>
                </View>
                <ClickSeachBar
                    onPress={() => console.log(true)}
                    placeHolder="Search for tasks"
                />
            </View>

            <TouchableOpacity activeOpacity={0.1}>
                <SmallHeadingText>Hellon k akSH fl asdklf labfl asd fhlsa ksa d</SmallHeadingText>
            </TouchableOpacity>

            <View style={{ paddingHorizontal: 10 }}>
                <TaskProgressTracker percentage={76} />
            </View>
        </Animated.View>
    );
};

export const HomeHeader = ({ navigation }) => {
    return (
        <View style={styles.header}>
            <IconButton
                name="menu-outline"
                size={25}
                type="ionicon"
                onPress={() => navigation.toggleDrawer()}
            />
            <SmallHeadingText
                sx={{
                    fontFamily: fonts.Montserrat[600],
                    position: "relative",
                    top: 5
                }}>
                Smart Todo
            </SmallHeadingText>
            <View style={{ flexDirection: "row" }}>
                <IconButton
                    name="notifications-outline"
                    size={25}
                    type="ionicon"
                    onPress={() => navigation.navigate("cartScreen")}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative"
    },
    homeMain: {
        height: "100%",
        backgroundColor: "white"
    },
    bottomTabs: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "white",
        paddingBottom: 5,
        borderTopColor: Colors.backgroundWhite,
        borderTopWidth: 1
    },
    bannerArea: {
        marginVertical: 10
    },
    lastSection: {
        marginBottom: 80
    }
    // bottomSheetBody: { width: "100%", paddingHorizontal: 20, paddingVertical: 10 },
    // bottomSheetBodyBtns: {
    //     paddingVertical: 10,
    //     paddingHorizontal: 10,
    //     borderRadius: 5,
    //     marginTop: 10,
    //     width: "100%",
    //     display: "flex",
    //     flexDirection: "row",
    //     alignItems: "center",
    //     justifyContent: "space-between"
    // }
    // speedDail: {
    //     backgroundColor: Colors.bgBlack,
    //     alignSelf: "flex-start",
    //     height: 55,
    //     width: 55,
    //     borderRadius: 50,
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     position: "absolute",
    //     bottom: 20,
    //     right: 20
    // zIndex: 10
    // }
});

/**
 * 
 * 
 * 
 * 
                <View style={styles.speedDail}>
                    <TouchableOpacity
                        onPress={() => {
                            console.log(1);
                            handleOpenBottomSheet();
                        }}>
                        <Icon
                            type="ionicon"
                            name="add-outline"
                            color={Colors.white}
                            size={30}
                        />
                    </TouchableOpacity>
                </View>


                 {/* <View
                    style={
                        snapToIndex && {
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: "100%"
                        }
                    }>
                    <BottomSheet
                        snaps={["35", "35"]}
                        snapToIndex={snapToIndex}
                        setSnapToIndex={setSnapToIndex}>
                        <BottomSheetHeader
                            closeBottomSheet={setSnapToIndex}
                            heading="What you want to do?"
                        />

                        <View style={styles.bottomSheetBody}>
                            <TouchableOpacity
                                onPress={() => handleTodoScreenRedirection("singleTodo")}
                                activeOpacity={0.5}
                                style={[styles.bottomSheetBodyBtns, { backgroundColor: Colors.bgBlack }]}>
                                <MediumText
                                    color={Colors.white}
                                    sx={{ fontFamily: fonts.Montserrat[500] }}>
                                    Create single task
                                </MediumText>

                                <View>
                                    <Icon
                                        type="ionicon"
                                        name="chevron-forward-outline"
                                        color={Colors.white}
                                    />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => handleTodoScreenRedirection("project")}
                                activeOpacity={0.5}
                                style={[styles.bottomSheetBodyBtns, { backgroundColor: Colors.bgBlack }]}>
                                <MediumText
                                    color={Colors.white}
                                    sx={{ fontFamily: fonts.Montserrat[500] }}>
                                    Track new project
                                </MediumText>
                                <View>
                                    <Icon
                                        type="ionicon"
                                        name="chevron-forward-outline"
                                        color={Colors.white}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </BottomSheet>
                </View> 
 */

/**
 * @responsibility: This screen is responsible for showing Restautant and Dishes Tabs and their components.
 */

import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { TabView, SceneMap, Route } from "react-native-tab-view";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../utils/constants/colors/colors";
import { fonts } from "../../../utils/constants/fonts/fonts";
import { DisplayAllTodos } from "./allTodos.screen";
import { CompletedTasks } from "./sections/completedTasks.screen";
import { ExpiredTasks } from "./sections/expiredTasks.screen";

//* Mapping Tabs with Screens
// const renderScene = SceneMap({
//     pendingTab: DisplayAllTodos,
//     doneTab: CompletedTasks,
//     expiredTab: ExpiredTasks
// });

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
    const navigation = useNavigation();
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

    //* Creating Top Tabs
    const [routes] = useState([
        { key: "pendingTab", title: "Pending Tasks" },
        { key: "doneTab", title: "Completed" },
        { key: "expiredTab", title: "Expired" }
    ]);

    useEffect(() => {
        renderScene();
    }, [routes]);

    //* Tab bar header component and stylings
    const TabBarHeaders = (props) => {
        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    return (
                        <TouchableOpacity
                            style={styles.tabItem}
                            onPress={() => setIndex(i)}>
                            <Text
                                style={[
                                    i == index
                                        ? {
                                              color: Colors.bgBlack,
                                              borderBottomWidth: 2,
                                              borderBottomColor: Colors.bgBlack,
                                              fontFamily: fonts.Montserrat[500]
                                          }
                                        : { fontFamily: fonts.Montserrat[500] },
                                    styles.tabBarTitles
                                ]}>
                                {route.title}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    return (
        <View style={{ height: "100%" }}>
            <TabView
                renderTabBar={TabBarHeaders}
                navigationState={{ index, routes }}
                renderScene={(routes) => renderScene(routes)}
                onIndexChange={(i) => setIndex(i)}
                initialLayout={{ width: layout.width }}
            />
        </View>
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
