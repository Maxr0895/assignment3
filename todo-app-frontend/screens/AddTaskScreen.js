import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState("");

  const addTask = async () => {
    try {
      await axios.post("http://localhost:3000/tasks", { title });
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Add Task" onPress={addTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
  },
});
