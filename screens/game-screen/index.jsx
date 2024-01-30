import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import Title from "../../components/title";
import NumberInput from "../../components/number-input";
import { useEffect, useState } from "react";
import CustomButton from "../../components/custom-button";
import InstructionsText from "../../components/instructions-text";
import Card from "../../components/card";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItems from "../../components/guess-log-items";

const generateRandomNumBetween = (min, max, exclude) => {
  const randomNum = Math.floor(Math.random() * (max - min)) + min;

  if (randomNum === exclude) {
    generateRandomNumBetween(min, max, exclude);
  } else {
    return randomNum;
  }
};

let minBoundary = 0;
let maxBoundary = 100;

const GameScreen = ({ userNum, onGameOver }) => {
  const initialGuess = generateRandomNumBetween(1, 100, userNum);
  const [guessedNum, setGuessedNum] = useState(initialGuess);
  const [guessLogs, setGuessLogs] = useState([initialGuess]);

  const regenerateRandomNum = (direction) => {
    if (
      (direction === "lower" && userNum > guessedNum) ||
      (direction === "greater" && userNum < guessedNum)
    ) {
      Alert.alert("Don't lie", "You know who you are messing up with? 🤬", [
        { text: "Oops!" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = guessedNum;
    } else {
      minBoundary = guessedNum + 1;
    }

    const newGuess = generateRandomNumBetween(
      minBoundary,
      maxBoundary,
      guessedNum
    );
    setGuessedNum(newGuess);
    setGuessLogs((prevGuess) => [newGuess, ...prevGuess]);
  };

  useEffect(() => {
    if (userNum === guessedNum) {
      onGameOver(guessLogs?.length);
    }
  });

  useEffect(() => {
    minBoundary = 0;
    maxBoundary = 100;
  }, []);

  const guessRoundsListLength = guessLogs.length;

  return (
    <View style={styles.gameScreenContainer}>
      <Title>Opponent's Guess</Title>
      <NumberInput>{guessedNum}</NumberInput>
      <Card>
        <InstructionsText style={styles.instructionsText}>
          Higher or Lower?
        </InstructionsText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <CustomButton onPress={() => regenerateRandomNum("lower")}>
              <Ionicons name="remove" size={24} color={"white"} />
            </CustomButton>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton onPress={() => regenerateRandomNum("greater")}>
              <Ionicons name="add" size={24} color={"white"} />
            </CustomButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={(item) => item}
          data={guessLogs}
          renderItem={(logItem) => (
            <GuessLogItems
              guess={logItem?.item}
              roundNumber={guessRoundsListLength - logItem?.index}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gameScreenContainer: {
    flex: 1,
    padding: 40,
  },
  instructionsText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});

export default GameScreen;
