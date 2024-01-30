import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import StartGame from "./screens/start-game";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useState } from "react";
import GameScreen from "./screens/game-screen";
import Colors from "./constants/color";
import GameOver from "./screens/game-over";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [selectedNum, setSelectedNum] = useState();
  const [isGameOver, setIsGameOver] = useState(false);
  const [guessNumber, setGuessNumber] = useState(0);

  const [isFontsLoaded, fontError] = useFonts({
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
  });

  const pickNumHandler = (pickedNumber) => {
    setSelectedNum(pickedNumber);
  };

  const onLayoutRootView = useCallback(async () => {
    if (isFontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isFontsLoaded]);

  const handleGameOver = (totalGuesses) => {
    setIsGameOver(true);
    setGuessNumber(totalGuesses);
  };

  const handleOnGameRestart = () => {
    setSelectedNum();
    setGuessNumber(0);
    setIsGameOver(false);
  };

  let screen = selectedNum ? (
    <GameScreen userNum={selectedNum} onGameOver={handleGameOver} />
  ) : (
    <StartGame onPickNumber={pickNumHandler} />
  );

  if (isGameOver) {
    screen = (
      <GameOver
        userGuesses={guessNumber}
        userNumber={selectedNum}
        onRestartGame={handleOnGameRestart}
      />
    );
  }

  if (!isFontsLoaded && !fontError) {
    return null;
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.container}
      onLayout={onLayoutRootView}
    >
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.container}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.container}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
