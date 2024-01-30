import { StyleSheet, Text, View } from "react-native";
import { MediumText, SmallHeadingText, SmallText } from "../../../Components/Text/Headings/Headings";
import { Input } from "../../../Components/Input/Input";
import { Colors } from "../../../utils/constants/colors/colors";
import { TouchableButton } from "../../../Components/Button/Button";
import { useContext, useEffect, useState } from "react";
import { fonts } from "../../../utils/constants/fonts/fonts";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "@rneui/base";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { AuthContext } from "../../../context/auth/auth.context";
import { createNewSingleTaskValidation } from "../../../utils/helpers/validation/validation";
import { errorToast, infoToast, successToast } from "../../../utils/toasts/toasts";
import axios from "axios";
import { todoServiceHost } from "../../../utils/constants/ip";
import { tokens } from "../../../utils/constants/constant";
import { normalize } from "@rneui/themed";
import { formatTime } from "../../../utils/helpers/date/formatTime";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getEndingTaskDate } from "../../../utils/helpers/date/getEndingTaskDate";
import { getWeekEndDate } from "../../../utils/helpers/date/getWeekendDate";

export const CreateSingleTask = () => {
    const { getUserDetailsWithToken } = useContext(AuthContext);
    const [screenFor, setScreenFor] = useState("createNewTask");
    const [taskId, setTaskId] = useState("");

    const [todoName, setTodoName] = useState("");
    const [todoCategories, setTodoCategories] = useState("");
    const [todoDescription, setTodoDescription] = useState("");
    const [endDateButton, setEndDateButton] = useState("today");

    // Calendar Specific
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [confirmSelectedDate, setConfirmSelectedDate] = useState("");

    // Auth specific
    const [userDetails, setUserDetails] = useState({});

    // Validation specific
    const [isDataValidate, setIsDataValidate] = useState(false);

    // Loading specific
    const [btnLoading, setBtnLoading] = useState(false);

    // Navigation specific
    const navigation = useNavigation();
    const routes = useRoute();

    function handleConfirmSelectedDate() {
        let ISO_FORMAT;
        if (!selectedDate) {
            setEndDateButton("today");
            let todayDate = new Date();
            todayDate.setDate(todayDate.getDate());
            ISO_FORMAT = formatTime(todayDate);
        } else {
            setEndDateButton("calendar");
            const dateString = selectedDate;
            const formattedDateString = dateString.replace(/\//g, "-");
            ISO_FORMAT = new Date(formattedDateString);
            ISO_FORMAT = formatTime(ISO_FORMAT, "calendar");
        }

        setConfirmSelectedDate(ISO_FORMAT);
        setSelectedDate("");
        setShowCalendar(false);
    }

    const getUserAuthToken = async () => {
        const details = await getUserDetailsWithToken();
        setUserDetails(details);
    };

    const createNewTask = async () => {
        try {
            if (!isDataValidate) {
                return infoToast("Invalid inputs", "Task name or End date is incorrect");
            }

            setBtnLoading(true);

            const { userEmail, result: smartAuthToken } = userDetails;

            const category = todoCategories.split(",");

            const sendTaskToServer = await axios.post(
                `${todoServiceHost}/api/todo/create`,
                {
                    todoTitle: todoName,
                    todoDescription,
                    expireAt: confirmSelectedDate,
                    isExpirable: false,
                    category
                },
                {
                    headers: {
                        Authorization: tokens.authToken,
                        "smart-auth-token": smartAuthToken,
                        "user-auth-email": userEmail
                    }
                }
            );

            setBtnLoading(false);

            const { isTaskCreated } = sendTaskToServer.data;
            if (isTaskCreated) {
                clearAllInputStates();
                setEndDateButton("today");
                let todayDate = new Date();
                todayDate.setDate(todayDate.getDate());
                todayDate = formatTime(todayDate);
                setConfirmSelectedDate(todayDate);
                return successToast("Task created 🥳🔥", "New Task has been created!");
            }
            errorToast("Server issue", "Try adding again!");
        } catch (error) {
            setBtnLoading(false);
            errorToast("Server issue", "Try adding again!");
        }
    };

    const handleUpdateTask = async () => {
        try {
            if (!isDataValidate) {
                return infoToast("Invalid inputs", "Task name or End date is incorrect");
            }

            setBtnLoading(true);

            const { userEmail, result: smartAuthToken } = userDetails;

            const category = todoCategories.split(",");

            const sendTaskToServer = await axios.put(
                `${todoServiceHost}/api/todo/update`,
                {
                    todoTitle: todoName,
                    todoDescription,
                    expireAt: confirmSelectedDate,
                    isExpirable: false,
                    taskId: taskId,
                    category
                },
                {
                    headers: {
                        Authorization: tokens.authToken,
                        "smart-auth-token": smartAuthToken,
                        "user-auth-email": userEmail
                    }
                }
            );

            setBtnLoading(false);

            const { isTaskUpdated } = sendTaskToServer.data;
            if (isTaskUpdated) {
                clearAllInputStates();
                setEndDateButton("today");
                let todayDate = new Date();
                todayDate.setDate(todayDate.getDate());
                todayDate = formatTime(todayDate);
                setConfirmSelectedDate(todayDate);
                successToast("Task updated 🥳🔥", "New Task has been created!");
                navigation.navigate("DisplayAllTodos");
                return;
            }
            return errorToast("Server issue", "Try adding again!");
        } catch (error) {
            setBtnLoading(false);
            errorToast("Server issue", "Try adding again!");
        }
    };

    const clearAllInputStates = () => {
        setTodoName("");
        setTodoCategories("");
        setTodoDescription("");
        setConfirmSelectedDate("");
        return;
    };

    const fillExistingValues = () => {
        const method = routes.params?.method;
        setScreenFor(method);
        if (method == "update") {
            const { category, todoTitle, expireAt, todoDescription, taskId } = routes.params.taskDetails;
            setTodoName(todoTitle);
            setTodoCategories(category);
            setTodoDescription(todoDescription);
            setConfirmSelectedDate(expireAt);
            const isDataValidate = createNewSingleTaskValidation(todoName, confirmSelectedDate, todoCategories, todoDescription);
            setIsDataValidate(isDataValidate);

            setTaskId(taskId);

            const endingTaskDate = getEndingTaskDate(expireAt);
            setEndDateButton(endingTaskDate);
        }
    };

    useEffect(() => {
        getUserAuthToken();
        let todayDate = new Date();
        todayDate.setDate(todayDate.getDate());
        todayDate = formatTime(todayDate);
        setConfirmSelectedDate(todayDate);

        fillExistingValues();
    }, []);

    useEffect(() => {
        const isDataValidate = createNewSingleTaskValidation(todoName, confirmSelectedDate, todoCategories, todoDescription);
        setIsDataValidate(isDataValidate);
    }, [todoName, confirmSelectedDate, todoCategories, todoDescription]);

    return (
        <View style={[styles.main, showCalendar ? null : { padding: 15 }]}>
            <View>
                <MediumText sx={{ fontFamily: fonts.Montserrat[500] }}>Task Name</MediumText>
                <Input
                    value={todoName}
                    onSubmit={() => {}}
                    onChange={(e) => setTodoName(e)}
                    sx={{
                        fontFamily: fonts.Montserrat[500],
                        borderRadius: 5,
                        borderColor: Colors.lightBlack[4]
                    }}
                    placeholder={"Make Palak Paneer today!"}
                />

                <MediumText sx={{ fontFamily: fonts.Montserrat[500], marginTop: 10 }}>Categories</MediumText>
                <Input
                    value={todoCategories}
                    onSubmit={() => {}}
                    onChange={(e) => setTodoCategories(e)}
                    sx={{
                        fontFamily: fonts.Montserrat[500],
                        borderRadius: 5,
                        borderColor: Colors.lightBlack[4]
                    }}
                    placeholder={"Kitchen, Cooking"}
                />

                <MediumText sx={{ fontFamily: fonts.Montserrat[500], marginTop: 10 }}>Description</MediumText>
                <Input
                    value={todoDescription}
                    onChange={(e) => setTodoDescription(e)}
                    sx={{
                        color: Colors.black[10],
                        borderRadius: 5,
                        borderColor: Colors.lightBlack[4],
                        textAlignVertical: "top",
                        height: 150
                    }}
                    placeholder={"Describe or add key notes to remember later!"}
                    multiline={true}
                />

                <View>
                    <TodoDateButtons
                        setEndDateButton={setEndDateButton}
                        endDateButton={endDateButton}
                        setShowCalendar={setShowCalendar}
                        setConfirmSelectedDate={setConfirmSelectedDate}
                    />
                </View>
            </View>

            <View style={styles.button}>
                <TouchableButton
                    title={screenFor === "update" ? "Update task" : "Create new task"}
                    btnWidth={"100%"}
                    txtWidth={"100%"}
                    onPress={() => (screenFor === "update" ? handleUpdateTask() : createNewTask())}
                    loading={btnLoading}
                    hidden={!isDataValidate}
                />
            </View>

            {showCalendar && (
                <View style={styles.calendarScreen}>
                    <DatePicker
                        mode="calendar"
                        locale="en_IN"
                        onSelectedChange={(date) => setSelectedDate(date)}
                    />
                    <TouchableButton
                        txtWidth={"100%"}
                        title={selectedDate.length > 5 ? "Save date" : "Cancel"}
                        hidden={false}
                        onPress={handleConfirmSelectedDate}
                    />
                </View>
            )}
        </View>
    );
};

const TodoDateButtons = ({ setEndDateButton, endDateButton, setShowCalendar, setConfirmSelectedDate }) => {
    const styles = {
        fontSize: 12,
        fontFamily: fonts.Montserrat[500],
        paddingVertical: 7,
        paddingHorizontal: 10,
        margin: 0
    };

    const handleClickToday = () => {
        setEndDateButton("today");
        let todayDate = new Date();
        todayDate.setDate(todayDate.getDate());
        const formattedTime = formatTime(todayDate);
        setConfirmSelectedDate(formattedTime);
    };

    const handleClickTomorrow = () => {
        setEndDateButton("tomorrow");
        let tomorrowDate = new Date();
        tomorrowDate.setDate(tomorrowDate.getDate() + 1);
        const formattedTime = formatTime(tomorrowDate);
        setConfirmSelectedDate(formattedTime);
    };

    const handleClickWeekend = () => {
        setEndDateButton("thisweekend");
        const weekendDate = getWeekEndDate();
        setConfirmSelectedDate(weekendDate);
    };

    return (
        <View style={TodoDateButtonsStyles.mainTodoDateButtons}>
            <MediumText sx={{ fontFamily: fonts.Montserrat[500], marginTop: 10 }}>When do you want to end this?</MediumText>
            <View style={TodoDateButtonsStyles.btnsParentMain}>
                <View style={TodoDateButtonsStyles.btnsParent}>
                    <TouchableOpacity
                        onPress={handleClickToday}
                        style={[TodoDateButtonsStyles.btns, { backgroundColor: endDateButton === "today" ? Colors.bgBlack : Colors.black[1] }]}>
                        <MediumText
                            color={endDateButton === "today" ? Colors.white : Colors.lightBlack[2]}
                            sx={styles}>
                            Today
                        </MediumText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleClickTomorrow}
                        style={[TodoDateButtonsStyles.btns, { backgroundColor: endDateButton === "tomorrow" ? Colors.bgBlack : Colors.black[1] }]}>
                        <MediumText
                            color={endDateButton === "tomorrow" ? Colors.white : Colors.lightBlack[2]}
                            sx={styles}>
                            Tomorrow
                        </MediumText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleClickWeekend}
                        style={[TodoDateButtonsStyles.btns, { backgroundColor: endDateButton === "thisweekend" ? Colors.bgBlack : Colors.black[1] }]}>
                        <MediumText
                            color={endDateButton === "thisweekend" ? Colors.white : Colors.lightBlack[2]}
                            sx={styles}>
                            This weekend
                        </MediumText>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            setEndDateButton("");
                            setShowCalendar(true);
                        }}
                        style={[
                            TodoDateButtonsStyles.calendarIconBtn,
                            endDateButton === "calendar" ? { backgroundColor: Colors.bgBlack } : { backgroundColor: Colors.bgGrey }
                        ]}>
                        <Icon
                            type="ionicon"
                            name="calendar-outline"
                            color={endDateButton === "calendar" ? Colors.lightBlack[3] : Colors.lightBlack[2]}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const TodoDateButtonsStyles = StyleSheet.create({
    mainTodoDateButtons: {
        marginTop: 10
    },
    btnsParent: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // flexWrap: "wrap",
        columnGap: 10,
        // justifyContent: "space-between",
        marginVertical: 10
        // width: "90%"
    },
    btns: {
        alignSelf: "flex-start",
        borderRadius: 5
    },
    btnsParentMain: {
        // width: "10%",
        paddingVertical: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    calendarIconBtn: {
        position: "relative",
        top: -3,
        backgroundColor: Colors.bgGrey,
        height: 40,
        width: 40,
        borderRadius: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
});

const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",

        position: "relative"
    },
    button: {
        // position: "absolute",
        // bottom: 10,
        // marginLeft: 15
    },
    calendarScreen: {
        backgroundColor: Colors.white,
        padding: 20,
        position: "absolute",
        top: 0,
        width: "100%",
        height: "100%",
        display: "flex"

        // alignItems: "center"
        // justifyContent: "center"
    }
});
