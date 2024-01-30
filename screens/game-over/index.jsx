import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Title from "../../components/title";
import Colors from "../../constants/color";
import CustomButton from "../../components/custom-button";

const GameOver = ({ userGuesses, userNumber, onRestartGame }) => {
  return (
    <View style={styles.rootContainer}>
      <Title>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/success.png")}
          style={styles.image}
        />
      </View>
      <Text style={styles.summary}>
        Your phone needed <Text style={styles.highlight}>{userGuesses}</Text>{" "}
        guesses to guess the number{" "}
        <Text style={styles.highlight}>{userNumber}</Text>.
      </Text>
      <CustomButton onPress={onRestartGame}>Restart the Game!</CustomButton>
    </View>
  );
};

export default GameOver;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  rootContainer: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    height: deviceWidth < 380 ? 150 : 300,
    width: deviceWidth < 380 ? 150 : 300,
    borderRadius: deviceWidth < 380 ? 75 : 150,
    overflow: "hidden",
    margin: 36,
    borderWidth: 3,
    borderColor: Colors.primary800,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summary: {
    fontSize: 24,
    fontFamily: "open-sans",
    textAlign: "center",
    marginBottom: 24,
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});
