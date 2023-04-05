import { View, SafeAreaView, StyleSheet, Text } from "react-native";
import ThemeRadioButtons from "../components/ThemeRadioButtons";
import { useContext } from "react";
import ThemeContext from "../context/themeContext";

function Settings() {
  const theme = useContext(ThemeContext);

  return (
    <SafeAreaView style={[styles.rootScreen, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.textColor }]}>Theme:</Text>
        <ThemeRadioButtons />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    margin: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
    marginBottom: 8,
  },
});

export default Settings;
