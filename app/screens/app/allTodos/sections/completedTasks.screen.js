import { View, MotiView, AnimatePresence } from "moti";
import { MediumText, SmallHeadingText } from "../../../../Components/Text/Headings/Headings";
import { StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import { SingleTodoContainer } from "../../../../Components/singleTodoContainer/singleTodoContainer";
import { SingleTodoSkeleton } from "../../../../Components/singleTodoContainer/singleTodo.skeleton";
import { AuthContext } from "../../../../context/auth/auth.context";
import axios from "axios";
import { todoServiceHost } from "../../../../utils/constants/ip";
import { tokens } from "../../../../utils/constants/constant";
import { ServerError } from "../../../../Components/Errors/ServerError";
import { Colors } from "../../../../utils/constants/colors/colors";
import { FlashList } from "@shopify/flash-list";
import { Icon } from "@rneui/base";
import { errorToast, infoToast, successToast } from "../../../../utils/toasts/toasts";
import { EmptyScreen } from "../../../../Components/Errors/Empty";
import { useNavigation } from "@react-navigation/native";
import { BottomSheet } from "../../../../Components/BottomSheet/BottomSheetWrapper";
import { BottomSheetHeader } from "../../../../Components/BottomSheet/Header/header";
import { fonts } from "../../../../utils/constants/fonts/fonts";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export const CompletedTasks = () => {
    const { logoutUser, getUserDetailsWithToken } = useContext(AuthContext);

    // Bottom sheet specific
    const [snapToIndex, setSnapToIndex] = useState(-1);
    const [bottomSheetTaskDetails, setBottomSheetTaskDetails] = useState({});
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [allTasks, setAllTasks] = useState([]);
    const [isError, setIsError] = useState(false);

    const [isTasksEmpty, setIsTasksEmpty] = useState(false);
    // Confirm delete todo popup
    const [openConfirmationPopup, setOpenConfirmationPopup] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
    };

    // const [screenRenered, setScreenRendered] = useState(false);
    // const [userDetails, setUserDetails] = useState();

    // Mask as done specific
    // const [showFloatingIcon, setShowFloatingIcon] = useState(false);
    const [tasksToBeDeleted, setTasksToBeDeleted] = useState([]);

    const handleChecked = (taskId) => {
        setTasksToBeDeleted((prevId) => [...prevId, taskId]);
    };

    const handleUnChecked = (taskId) => {
        setTasksToBeDeleted((prevIds) => prevIds.filter((id) => id !== taskId));
    };

    const handleDeteleTask = useCallback(
        async (taskId) => {
            try {
                /**
                 * Why im hidding it before sending the delete request?
                 * Im just trying to update the UI as fast as possible for better user experience
                 * If any error occoured im resetting all tasks again with error toast!
                 */
                setAllTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

                setOpenConfirmationPopup(false);
                let ids;
                if (taskId) {
                    ids = taskId;
                } else {
                    const stringTaskIds = selectedTask.join(",");
                    ids = stringTaskIds;
                }
                setDeleteLoading(true);
                const details = await getUserDetails();
                const deleteTasksFromServer = await axios.delete(`${todoServiceHost}/api/todo/delete?tasks=${ids}`, {
                    headers: {
                        Authorization: tokens.authToken,
                        "smart-auth-token": details.result,
                        "user-auth-email": details.userEmail
                    }
                });
                const tasksDeleted = deleteTasksFromServer.data.count;
                if (tasksDeleted === 0) {
                    infoToast("No items to delete!", "There was no item selected for deleting!");
                    return;
                }

                setDeleteLoading(false);
                setSnapToIndex(-1);
            } catch (error) {
                console.log(error);
                errorToast("Something went wrong", "Please try again!");
                setAllTasks((prev) => {
                    if (taskId) {
                        return [...prev, allTasks.find((task) => task.id === taskId)];
                    } else {
                        return prev;
                    }
                });
            }
        },
        [getUserDetails]
    );

    const getUserDetails = async () => {
        const details = await getUserDetailsWithToken();
        if (!details) {
            // setUserDetails(null);
            logoutUser();
            return;
        }
        return details;
    };

    const handleOpenBottomSheet = (taskDetails) => {
        setSnapToIndex(1);
        setBottomSheetTaskDetails(taskDetails);
    };

    const fetchAllTasks = useCallback(async () => {
        try {
            setLoading(true);
            const details = await getUserDetails();
            const getTasksFromServer = await axios.get(`${todoServiceHost}/api/todo/todos`, {
                headers: {
                    Authorization: tokens.authToken,
                    "smart-auth-token": details.result,
                    "user-auth-email": details.userEmail
                }
            });
            setLoading(false);
            setIsError(false);
            const tasks = getTasksFromServer.data.completedTodos;
            setAllTasks(tasks);
            if (tasks.length === 0) return setIsTasksEmpty(true);
            return setIsTasksEmpty(false);
        } catch (error) {
            setIsError(true);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        navigation.addListener("focus", () => {
            fetchAllTasks();
        });
        fetchAllTasks();
    }, [navigation]);

    return (
        <View style={{ height: "100%" }}>
            {!loading ? (
                <View style={styles.renderContainer}>
                    <AnimatePresence>
                        {!isTasksEmpty ? (
                            <FlashList
                                scrollEnabled={true}
                                showsVerticalScrollIndicator={false}
                                data={allTasks}
                                estimatedItemSize={500}
                                renderItem={({ item: task, index }) => (
                                    <MotiView
                                        from={{
                                            opacity: 0,
                                            scale: 0.95
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.9
                                        }}>
                                        <SingleTodoContainer
                                            key={index}
                                            taskId={task.id}
                                            todoTitle={task.todoTitle}
                                            todoDescription={task.todoDescription}
                                            expireAt={task.expireAt}
                                            category={task.category[0]}
                                            markAsDone={handleChecked}
                                            unChecked={handleUnChecked}
                                            openBottomSheet={handleOpenBottomSheet}
                                            section={"completed"}
                                        />
                                    </MotiView>
                                )}
                            />
                        ) : (
                            <EmptyScreen
                                screenName={"completed"}
                                query={{ method: "newTask" }}
                                emptyFieldName={"Tasks"}
                                imageURL={
                                    "https://res.cloudinary.com/dyy7ynyzb/image/upload/v1705346872/Smart%20Todo%20Application/Icons/done_eywwui.png"
                                }
                                text={"No completed tasks yet. Keep up the good work, and watch your accomplishments grow! 👏"}
                            />
                        )}
                    </AnimatePresence>
                    {isError && <ServerError fetchAgainFunction={fetchAllTasks} />}
                </View>
            ) : (
                <View style={styles.renderContainer}>
                    <FlashList
                        scrollEnabled={false}
                        data={[...Array(5)]}
                        estimatedItemSize={50}
                        renderItem={({ item: task, index }) => <SingleTodoSkeleton />}
                    />
                </View>
            )}

            {tasksToBeDeleted.length > 0 && (
                <View style={styles.markAsdoneFloatingContainer}>
                    <View style={styles.markAsdoneIcon}>
                        <TouchableOpacity onPress={() => handleDeteleTask()}>
                            {deleteLoading ? (
                                <ActivityIndicator
                                    size={25}
                                    color={Colors.white}
                                />
                            ) : (
                                <Icon
                                    name="checkmark-done-outline"
                                    type="ionicon"
                                    color={Colors.white}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            <View
                style={
                    snapToIndex >= 1
                        ? {
                              position: "absolute",
                              top: 0,
                              right: 0,
                              width: "100%"
                          }
                        : null
                }>
                <BottomSheet
                    snaps={["50", "50"]}
                    snapToIndex={snapToIndex}
                    setSnapToIndex={setSnapToIndex}>
                    <BottomSheetHeader
                        closeBottomSheet={setSnapToIndex}
                        heading="What you want to do?"
                    />

                    <View style={styles.bottomSheetBody}>
                        <TouchableOpacity
                            onPress={() => {
                                setSnapToIndex(-1);
                                navigation.navigate("CreateSingleTask", { method: "update", taskDetails: bottomSheetTaskDetails });
                            }}
                            activeOpacity={0.5}
                            style={[styles.bottomSheetBodyBtns, {}]}>
                            <MediumText
                                color={Colors.bgBlack}
                                sx={{ fontFamily: fonts.Montserrat[600] }}>
                                Edit Task
                            </MediumText>

                            <View>
                                <Icon
                                    type="ionicon"
                                    name="create-outline"
                                    color={Colors.bgBlack}
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setOpenConfirmationPopup(true)}
                            activeOpacity={0.5}
                            style={[styles.bottomSheetBodyBtns, {}]}>
                            <MediumText
                                color={Colors.red.base}
                                sx={{ fontFamily: fonts.Montserrat[600] }}>
                                Delete task
                            </MediumText>
                            <View>
                                {!deleteLoading ? (
                                    <Icon
                                        type="ionicon"
                                        name="trash-outline"
                                        color={Colors.red.base}
                                    />
                                ) : (
                                    <ActivityIndicator
                                        color={Colors.red.base}
                                        size={20}
                                    />
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>
                </BottomSheet>
            </View>
            <AnimatePresence>
                {openConfirmationPopup && (
                    <MotiView
                        from={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onTouchStart={() => setOpenConfirmationPopup(false)}
                        style={styles.deleteTodoConfirmationPopup}>
                        <MotiView
                            from={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            transition={{ type: "spring", damping: 10, stiffness: 100 }}
                            onTouchStart={(e) => e.stopPropagation()}
                            style={styles.deleteTodoConfirmationPopup_box}>
                            <View style={styles.trashIconContainer}>
                                <Icon
                                    type="ionicon"
                                    name="trash-outline"
                                    color={Colors.red.base}
                                />
                            </View>

                            <MediumText sx={styles.popup_title}>You are about to delete a task</MediumText>
                            <MediumText
                                sx={styles.popup_desc}
                                color={Colors.lightBlack[2]}>
                                You sure you want to delete this task? This action cannot ne undone.
                            </MediumText>

                            <TouchableWithoutFeedback
                                onPress={() => handleDeteleTask(bottomSheetTaskDetails.taskId)}
                                onPressIn={handlePressIn}
                                onPressOut={handlePressOut}>
                                <MotiView
                                    from={{ scale: 1 }}
                                    animate={{ scale: isPressed ? 0.95 : 1 }}
                                    transition={{ type: "spring", damping: 10, stiffness: 100 }}
                                    style={styles.deleteBtn}>
                                    <MediumText
                                        sx={styles.deleteBtn_text}
                                        color={"white"}>
                                        Delete
                                    </MediumText>
                                </MotiView>
                            </TouchableWithoutFeedback>
                        </MotiView>
                    </MotiView>
                )}
            </AnimatePresence>
        </View>
    );
};

const styles = StyleSheet.create({
    renderContainer: {
        height: "100%"
    },
    markAsdoneFloatingContainer: {
        position: "absolute",
        bottom: 10,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    markAsdoneIcon: {
        backgroundColor: Colors.bgBlack,
        height: 50,
        width: 50,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        elevation: 20
    },
    bottomSheetBody: { width: "100%", paddingHorizontal: 20, paddingVertical: 10 },
    bottomSheetBodyBtns: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 0,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    deleteTodoConfirmationPopup: {
        position: "absolute",
        top: 0,
        height: "100%",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00000080"
    },
    deleteTodoConfirmationPopup_box: {
        backgroundColor: Colors.white,
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 10,
        width: "70%"
    },
    trashIconContainer: {
        backgroundColor: Colors.red.base + "25",
        padding: 10,
        borderRadius: 50,
        alignSelf: "center"
    },
    popup_title: {
        fontFamily: fonts.Montserrat[600],
        textAlign: "center",
        marginTop: 10
    },
    popup_desc: {
        fontFamily: fonts.Montserrat[500],
        fontSize: 12,
        textAlign: "center",
        marginTop: 5
    },
    deleteBtn: {
        backgroundColor: Colors.red.base,
        marginTop: 15,
        paddingVertical: 8,
        borderRadius: 5
    },
    deleteBtn_text: {
        textAlign: "center",
        fontFamily: fonts.Montserrat[500]
    }
});

/* <SlideCalendar /> */

const data = [
    {
        id: "65a2592350f9feff144cb1c9",
        userId: "659d20ca3b157793de9b440b",
        todoTitle: "this is new task",
        todoDescription: "Last time update testing",
        category: ["IMP work", "important"],
        done: false,
        isExpirable: true,
        expireAt: "2024-01-18T12:30:00.000Z",
        projectsId: null
    },
    {
        id: "65a25af750f9feff144cb1cb",
        userId: "659d20ca3b157793de9b440b",
        todoTitle: "Final checkinf",
        todoDescription: "",
        category: ["Checking 👀"],
        done: false,
        isExpirable: false,
        expireAt: "2024-03-09T00:00:00.000Z",
        projectsId: null
    },
    {
        id: "65a25b2150f9feff144cb1cc",
        userId: "659d20ca3b157793de9b440b",
        todoTitle: "sure!! This is final ",
        todoDescription: "",
        category: [""],
        done: false,
        isExpirable: false,
        expireAt: "2024-01-31T00:00:00.000Z",
        projectsId: null
    },
    {
        id: "65a2699150f9feff144cb1ce",
        userId: "659d20ca3b157793de9b440b",
        todoTitle: "Bdhsb",
        todoDescription: "Nxjdh",
        category: ["Ndhd"],
        done: false,
        isExpirable: false,
        expireAt: "2024-01-14T10:44:34.850Z",
        projectsId: null
    }
];
