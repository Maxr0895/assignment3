import React, { useState, useEffect } from "react";
import { View, Switch, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const value = await AsyncStorage.getItem("isDarkTheme");
    if (value !== null) {
      setIsDarkTheme(JSON.parse(value));
    }
  };

  const toggleSwitch = async () => {
    const newValue = !isDarkTheme;
    setIsDarkTheme(newValue);
    await AsyncStorage.setItem("isDarkTheme", JSON.stringify(newValue));
  };

  return (
    <View style={styles.container}>
      <Text>Dark Theme</Text>
      <Switch onValueChange={toggleSwitch} value={isDarkTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
