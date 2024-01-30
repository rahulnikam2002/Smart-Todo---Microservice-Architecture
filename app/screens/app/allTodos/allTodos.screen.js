import { View, MotiView, AnimatePresence } from "moti";
import { MediumText, SmallHeadingText } from "../../../Components/Text/Headings/Headings";
import { StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { CustomSafeAreaView } from "../../../Components/SafeAreaView/SafeAreaView";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { SingleTodoContainer } from "../../../Components/singleTodoContainer/singleTodoContainer";
import { SingleTodoSkeleton } from "../../../Components/singleTodoContainer/singleTodo.skeleton";
import { AuthContext } from "../../../context/auth/auth.context";
import axios from "axios";
import { todoServiceHost } from "../../../utils/constants/ip";
import { tokens } from "../../../utils/constants/constant";
import { ServerError } from "../../../Components/Errors/ServerError";
import { Colors } from "../../../utils/constants/colors/colors";
import { FlashList } from "@shopify/flash-list";
import { Icon } from "@rneui/base";
import { errorToast, infoToast, successToast } from "../../../utils/toasts/toasts";
import { EmptyScreen } from "../../../Components/Errors/Empty";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BottomSheet } from "../../../Components/BottomSheet/BottomSheetWrapper";
import { BottomSheetHeader } from "../../../Components/BottomSheet/Header/header";
import { fonts } from "../../../utils/constants/fonts/fonts";
import { TouchableButton } from "../../../Components/Button/Button";

export const DisplayAllTodos = () => {
    const { logoutUser, getUserDetailsWithToken } = useContext(AuthContext);

    // Bottom sheet specific
    const [snapToIndex, setSnapToIndex] = useState(-1);
    const [bottomSheetTaskDetails, setBottomSheetTaskDetails] = useState({});

    const flashListRef = useRef();

    const navigation = useNavigation();
    const routes = useRoute();

    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [completedBtnLoading, setCompletedBtnLoading] = useState(false);
    const [allTasks, setAllTasks] = useState([]);
    const [isError, setIsError] = useState(false);

    const [scrollToIndex, setScrollToIndex] = useState(-1);

    const scrollToTodo = () => {
        console.log("third");
        const todoId = routes.params?.toId;
        if (todoId && allTasks) {
            const index = allTasks.findIndex((item) => item.id === todoId);
            setScrollToIndex(index);
        }
    };

    const [isTasksEmpty, setIsTasksEmpty] = useState(false);
    const [selectedTask, setSelectedTask] = useState([]);

    const handleChecked = (taskId) => {
        setSelectedTask((prevId) => [...prevId, taskId]);
    };

    const handleUnChecked = (taskId) => {
        setSelectedTask((prevIds) => prevIds.filter((id) => id !== taskId));
    };

    const handleTaskCompeleted = async () => {
        try {
            setCompletedBtnLoading(true);
            const details = await getUserDetails();
            const updateTasksFromServer = await axios.put(
                `${todoServiceHost}/api/todo/update/completed`,
                {
                    taskIds: selectedTask
                },
                {
                    headers: {
                        Authorization: tokens.authToken,
                        "smart-auth-token": details.result,
                        "user-auth-email": details.userEmail
                    }
                }
            );

            const { isTaskUpdated, ...rest } = updateTasksFromServer.data;
            if (rest.task.count === 0) {
                infoToast("No items to delete!", "There was no item seleted for deleting!");
                return;
            }

            const toastMessageObject = {
                heading: selectedTask.length > 1 ? "Tasks completed 👀" : "Task completed 👀",
                body: selectedTask.length > 1 ? "All selected tasks was completed successfully" : "Selected task was completed successfully"
            };
            successToast(toastMessageObject.heading, toastMessageObject.body);
            setCompletedBtnLoading(false);
            setSnapToIndex(-1);
            setSelectedTask([]);
            fetchAllTasks();
        } catch (error) {
            errorToast("Something went wrong", "please try again!");
        }
    };

    const handleDeteleTask = async (taskId) => {
        try {
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
                infoToast("No items to delete!", "There was no item seleted for deleting!");
                return;
            }

            const toastMessageObject = {
                heading: ids.length > 1 ? "Tasks deleted 👀" : "Task deleted 👀",
                body: ids.length > 1 ? "All selected tasks was deleted successfully" : "Selected task was deleted successfully"
            };
            successToast(toastMessageObject.heading, toastMessageObject.body);
            setDeleteLoading(false);
            setSnapToIndex(-1);
            setSelectedTask([]);
            fetchAllTasks();
        } catch (error) {
            errorToast("Something went wrong", "please try again!");
        }
    };

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
            const tasks = getTasksFromServer.data.pendingTodos;
            setAllTasks(tasks);
            console.log("first", { tasks });
            // scrollToTodo();
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

    useEffect(() => {
        scrollToTodo();
    }, [allTasks]);

    return (
        <View style={{ height: "100%" }}>
            {!loading ? (
                <View style={styles.renderContainer}>
                    <AnimatePresence>
                        {!isTasksEmpty ? (
                            <FlashList
                                ref={flashListRef}
                                initialScrollIndex={scrollToIndex}
                                overScrollMode="always"
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
                                        />
                                    </MotiView>
                                )}
                            />
                        ) : (
                            <EmptyScreen
                                screenName={"CreateSingleTask"}
                                query={{ method: "newTask" }}
                                emptyFieldName={"Tasks"}
                                text={"No tasks available at the moment. Create one and keep your productivity flowing! 👉👈"}
                                imageURL={
                                    "https://res.cloudinary.com/dyy7ynyzb/image/upload/v1705261288/Smart%20Todo%20Application/Icons/money_sdfrmv.png"
                                }
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

            {selectedTask.length > 0 && (
                <View style={styles.markAsdoneFloatingContainer}>
                    <View style={styles.markAsdoneIcon}>
                        <TouchableOpacity onPress={() => handleTaskCompeleted()}>
                            {completedBtnLoading ? (
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
                            onPress={() => handleDeteleTask(bottomSheetTaskDetails.taskId)}
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
