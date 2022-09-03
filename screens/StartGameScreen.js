// Packages Import
import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

// Components Imports
import PrimaryButton from "../components/PrimaryButton";
import Card from "../components/Card";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";

// Constants Imports
import Colors from "../constants/colors";

const StartGameScreen = ({ onPickNumber }) => {
  const [enteredNumber, setEnteredNumber] = useState("");

  const { height } = useWindowDimensions();

  // Handle Number Input
  const handleNumberInput = (enteredText) => {
    setEnteredNumber(enteredText);
  };

  // Handle Reset Button
  const handleResetInput = () => {
    setEnteredNumber("");
  };

  // Handle Confirm Button
  const handleConfirmInput = () => {
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99",
        [{ text: "Okay", style: "destructive", onPress: handleResetInput }]
      );
      return;
    }

    onPickNumber(chosenNumber);
  };

  // Setting margin according to device dimensions
  const marginTopDistance = height < 380 ? 30 : 100;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior='position'>
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Title>Guess My Number</Title>
          <Card>
            <Subtitle style={styles.instructionText}>Enter a number</Subtitle>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType='number-pad'
              autoCapitalize='none'
              autoCorrect={false}
              value={enteredNumber}
              onChangeText={handleNumberInput}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContaner}>
                <PrimaryButton onPress={handleResetInput}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContaner}>
                <PrimaryButton onPress={handleConfirmInput}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    alignItems: "center",
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContaner: {
    flex: 1,
  },
});
