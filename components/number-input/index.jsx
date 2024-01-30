import { Dimensions, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/color";

const NumberInput = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

export default NumberInput;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: deviceWidth < 380 ? 12 : 24,
    margin: deviceWidth < 380 ? 12 : 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.accent500,
    fontSize: deviceWidth < 380 ? 24 : 32,
    fontWeight: "bold",
  },
});
