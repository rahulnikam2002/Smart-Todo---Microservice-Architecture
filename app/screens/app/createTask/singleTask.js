import { StyleSheet, Text, View } from "react-native";
import {
  MediumText,
  SmallText
} from "../../../Components/Text/Headings/Headings";
import { Input } from "../../../Components/Input/Input";
import { Colors } from "../../../utils/constants/colors/colors";
import { TouchableButton } from "../../../Components/Button/Button";
import { useState } from "react";
import BackgroundTimer from "react-native-background-timer";

export const CreateSingleTask = () => {
  const [todoName, setTodoName] = useState(null);
  const [todoDescription, setTodoDescription] = useState(null);

  const addTodo = BackgroundTimer.setInterval(() => {
    // this will be executed every 200 ms
    // even when app is the the background
    console.log("tic");
  }, 200);

  return (
    <View style={styles.main}>
      <View>
        {/* <MediumText>Task Name</MediumText> */}
        <Input
          onChange={(e) => setTodoName(e)}
          sx={{
            border: "none",
            borderRadius: 5,
            backgroundColor: Colors.lightBlack[4]
          }}
          placeholder={"Task Name"}
        />
        <Input
          onChange={(e) => setTodoDescription(e)}
          sx={{
            border: "none",
            borderRadius: 5,
            backgroundColor: Colors.lightBlack[4]
          }}
          placeholder={"Description"}
          multiline={true}
        />

        <View style={styles.button}>
          <TouchableButton
            title={"Continue"}
            // btnWidth={"100%"}
            // txtWidth={"100%"}
            onPress={() => addTodo()}
            loading={false}
            hidden={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    padding: 15
  },
  button: {
    width: "100%",
    height: "80%",
    alignItems: "flex-start",
    justifyContent: "flex-end"
    // paddingHorizontal: 15
  }
});
