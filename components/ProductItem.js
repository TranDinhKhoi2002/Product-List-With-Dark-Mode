import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import Card from "./Card";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import ThemeContext from "../context/themeContext";

function ProductItem({ item, onPress }) {
  const theme = useContext(ThemeContext);

  const pressHandler = async () => {
    await onPress();
  };

  const navigation = useNavigation();
  const routeIndex = navigation.getState().index;

  return (
    <Card style={styles.gridItem}>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        android_ripple={{ color: "#ccc" }}
      >
        <View style={styles.container}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />

          <View>
            <Text style={[styles.name, { color: theme.textColor }]}>{item.name}</Text>
            <View style={styles.priceContainer}>
              <Text style={[styles.priceText, { color: theme.textColor }]}>${item.price}</Text>
              <View>
                <Icon
                  name={routeIndex === 1 ? "trash" : "md-star-outline"}
                  size={20}
                  onPress={pressHandler}
                  color={theme.textColor}
                />
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </Card>
  );
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
    padding: 14,
    maxWidth: "100%",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
  priceText: {
    fontSize: 16,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.75,
  },
});

export default ProductItem;
