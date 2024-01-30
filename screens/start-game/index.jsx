import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import CustomButton from "../../components/custom-button";
import { useState } from "react";
import Colors from "../../constants/color";
import Title from "../../components/title";
import InstructionsText from "../../components/instructions-text";
import Card from "../../components/card";

const StartGame = ({ onPickNumber }) => {
  const [enteredNum, setEnteredNum] = useState("");
  const { height } = useWindowDimensions();

  const handleNumInputChange = (enteredVal) => {
    setEnteredNum(enteredVal);
  };

  const handleReset = () => {
    setEnteredNum("");
  };

  const handleConfirm = () => {
    const chosenNumber = parseInt(enteredNum);

    if (isNaN(chosenNumber) || chosenNumber > 99 || chosenNumber <= 0) {
      Alert.alert(
        "Invalid Number",
        "Please Enter a valid number between 1-99",
        [{ text: "Okay", style: "destructive", onPress: handleReset }]
      );

      return;
    }

    onPickNumber(chosenNumber);
  };

  const marginOnTop = height < 380 ? 30 : 100;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginOnTop }]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionsText>Enter a Number</InstructionsText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              value={enteredNum}
              onChangeText={handleNumInputChange}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <CustomButton onPress={handleReset}>Reset</CustomButton>
              </View>
              <View style={styles.buttonContainer}>
                <CustomButton onPress={handleConfirm}>Confirm</CustomButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
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
  buttonContainer: {
    flex: 1,
  },
});

export default StartGame;
