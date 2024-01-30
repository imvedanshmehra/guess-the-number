import { Dimensions, StyleSheet, View } from "react-native";
import Colors from "../../constants/color";

const Card = ({ children }) => {
  return <View style={styles.cardContainer}>{children}</View>;
};

export default Card;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: deviceWidth < 380 ? 18 : 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    alignItems: "center",
    justifyContent: "center",
  },
});
