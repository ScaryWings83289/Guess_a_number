// Packages Imports
import { useEffect, useState } from "react";
import { StyleSheet, View, Alert, FlatList, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Components Imports
import Title from "../components/Title";
import Card from "../components/Card";
import Subtitle from "../components/Subtitle";
import NumberContainer from "../components/NumberContainer";
import PrimaryButton from "../components/PrimaryButton";
import GuessLogItem from "../components/GuessLogItem";

// Generating random numbers
const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
  const inititalGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(inititalGuess);
  const [guessRounds, setGuessRounds] = useState([inititalGuess]);

  // Check if current guess is equal to user number
  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  // Set min & max boundary if we reset the game
  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  // Handle Next Guesses
  const handleNextGuess = (direction) => {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
  };

  // Length of guess rounds
  const guessRoundListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <Subtitle style={styles.subtitle}>Higher or lower?</Subtitle>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContaner}>
            <PrimaryButton onPress={handleNextGuess.bind(this, "lower")}>
              <Ionicons name='md-remove' size={24} color='#fff' />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContaner}>
            <PrimaryButton onPress={handleNextGuess.bind(this, "greater")}>
              <Ionicons name='md-add' size={24} color='#fff' />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    marginTop: 40,
  },
  subtitle: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContaner: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
