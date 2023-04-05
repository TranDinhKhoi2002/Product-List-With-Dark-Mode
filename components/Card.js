import { useContext } from "react";
import { Platform, StyleSheet, View } from "react-native";
import ThemeContext from "../context/themeContext";

function Card({ style, children }) {
  const theme = useContext(ThemeContext);

  return (
    <View style={[styles.container, style, { backgroundColor: theme.mode === "light" ? "white" : "#2c313d" }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    backgroundColor: "white",
    elevation: 8,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
});

export default Card;
