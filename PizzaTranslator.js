import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
  ScrollView, // <-- Add this!
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const PizzaTranslator = () => {
  const [text, setText] = useState("");
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState("");

  const furqanlogo = require("./images/furqanpassportsize.jpg");

  const moveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startMoving = () => {
      Animated.sequence([
        Animated.timing(moveAnim, {
          toValue: wp("50%"),
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(moveAnim, {
          toValue: 0,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start(() => startMoving());
    };

    startMoving();
  }, [moveAnim]);

  const calculate = (operator) => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      setResult("Enter valid numbers");
      return;
    }

    let res = 0;

    switch (operator) {
      case "+":
        res = n1 + n2;
        break;
      case "-":
        res = n1 - n2;
        break;
      case "*":
        res = n1 * n2;
        break;
      case "/":
        res = n2 !== 0 ? n1 / n2 : "Cannot divide by zero";
        break;
      default:
        res = "Invalid operation";
    }

    setResult(res.toString());
  };

  return (
    <ImageBackground
      source={require("./images/pexels-photo-459335.jpeg")}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Animated.Text
            style={[
              styles.headerText,
              { transform: [{ translateX: moveAnim }] },
            ]}
          >
            Welcome
          </Animated.Text>

          <Image source={furqanlogo} style={styles.logo} />
        </View>

        {/* Pizza Translator */}
        <View style={styles.translatorContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type Fruit Name"
            onChangeText={(newText) => setText(newText)}
            defaultValue={text}
          />

          <Text style={styles.pizzaText}>
            {text.split(" ").map((word, index) => {
              if (!word) return null;
              let emoji = "";

              switch (word.toLowerCase()) {
                case "apple":
                  emoji = "🍎";
                  break;
                case "banana":
                  emoji = "🍌";
                  break;
                case "grape":
                  emoji = "🍇";
                  break;
                default:
                  emoji = "❓";
              }

              return `${word} ${emoji} `;
            })}
          </Text>
        </View>

        {/* Calculator Section */}
        <View style={styles.calculatorContainer}>
          <Text style={styles.calculatorTitle}>Simple Calculator</Text>

          <TextInput
            style={styles.numberInput}
            keyboardType="numeric"
            placeholder="Enter first number"
            value={num1}
            onChangeText={(val) => setNum1(val)}
          />

          <TextInput
            style={styles.numberInput}
            keyboardType="numeric"
            placeholder="Enter second number"
            value={num2}
            onChangeText={(val) => setNum2(val)}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              onPress={() => calculate("+")}
              style={styles.calcButton}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => calculate("-")}
              style={styles.calcButton}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => calculate("*")}
              style={styles.calcButton}
            >
              <Text style={styles.buttonText}>*</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => calculate("/")}
              style={styles.calcButton}
            >
              <Text style={styles.buttonText}>/</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.resultText}>Result: {result}</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: hp("5%"), // Add extra bottom padding so last item isn’t cut off
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp("4%"),
    backgroundColor: "#76c4a9",
    width: wp("100%"),
    height: hp("8%"),
    borderBottomLeftRadius: hp("5%"),
    borderBottomRightRadius: hp("5%"),
  },
  headerText: {
    fontSize: hp("3.5%"),
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#333",
  },
  logo: {
    width: wp("12%"),
    height: hp("6%"),
    borderRadius: hp("3%"),
  },
  translatorContainer: {
    padding: wp("4%"),
    marginTop: hp("2%"),
    width: wp("90%"),
    alignItems: "center",
  },
  textInput: {
    height: hp("6%"),
    paddingHorizontal: wp("4%"),
    backgroundColor: "#fff",
    borderRadius: hp("1%"),
    marginBottom: hp("2%"),
    width: "100%",
    fontSize: hp("2%"),
  },
  pizzaText: {
    padding: wp("2%"),
    fontSize: hp("4%"),
    color: "#fff",
    textAlign: "center",
  },
  calculatorContainer: {
    marginTop: hp("2%"),
    width: wp("90%"),
    padding: wp("4%"),
    backgroundColor: "#ffffffaa",
    borderRadius: hp("2%"),
    alignItems: "center",
  },
  calculatorTitle: {
    fontSize: hp("3%"),
    fontWeight: "bold",
    marginBottom: hp("2%"),
  },
  numberInput: {
    height: hp("6%"),
    width: "100%",
    paddingHorizontal: wp("4%"),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: hp("1%"),
    backgroundColor: "#fff",
    marginBottom: hp("2%"),
    fontSize: hp("2%"),
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: hp("2%"),
  },
  calcButton: {
    backgroundColor: "#76c4a9",
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("5%"),
    borderRadius: hp("1%"),
  },
  buttonText: {
    color: "#fff",
    fontSize: hp("2.5%"),
  },
  resultText: {
    fontSize: hp("2.5%"),
    color: "#333",
    fontWeight: "bold",
    marginTop: hp("1%"),
  },
});

export default PizzaTranslator;
