// Packages Imports
import { StyleSheet, Text, Platform } from "react-native";

const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    width: 300,
    maxWidth: "80%",
    fontFamily: "open-sans-bold",
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    // borderWidth: Platform.OS === "android" ? 2 : 0,
    borderWidth: Platform.select({ ios: 0, android: 2 }),
    borderColor: "#fff",
    padding: 12,
  },
});
