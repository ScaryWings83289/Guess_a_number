// Packages Import
import { StyleSheet, View, Dimensions } from "react-native";

// Constants Imports
import Colors from "../constants/colors";

const Card = ({ children }) => {
  return <View style={styles.inputContainer}>{children}</View>;
};

export default Card;

// Get device width
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: deviceWidth < 380 ? 18 : 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
