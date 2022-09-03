// Packages Imports
import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";

// Screens Imports
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

// Constants Imports
import Colors from "./constants/colors";

const App = () => {
  const [userNumber, setUserNumber] = useState();
  const [gameOver, setGameOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // Handle Chosen Number
  const handlePickedNumber = (pickedNumber) => {
    setUserNumber(pickedNumber);
    setGameOver(false);
  };

  // Handle Game Over
  const handleGameOver = (numberOfRounds) => {
    setGameOver(true);
    setGuessRounds(numberOfRounds);
  };

  // Handle Reset Game
  const handleResetGame = () => {
    setUserNumber(null);
    setGuessRounds(0);
  };

  // Initial Screen
  let screen = <StartGameScreen onPickNumber={handlePickedNumber} />;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={handleGameOver} />;
  }

  if (gameOver && userNumber) {
    screen = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onStartNewGame={handleResetGame}
      />
    );
  }

  return (
    <>
      <StatusBar style='light' />
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode='cover'
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
