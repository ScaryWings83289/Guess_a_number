// Packages Import
import { StyleSheet, Text } from "react-native";

// Constants Imports
import Colors from "../constants/colors";

const Subtitle = ({ children, style }) => {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
};

export default Subtitle;

const styles = StyleSheet.create({
  instructionText: {
    color: Colors.accent500,
    fontFamily: "open-sans",
    fontSize: 24,
  },
});
