import { FlatList, SafeAreaView, StyleSheet, Text, View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";

import ProductItem from "../components/ProductItem";
import { productList } from "../data/productList";
import ThemeContext from "../context/themeContext";
import { useContext } from "react";

function renderProductItem(item) {
  const pressIconHandler = async () => {
    const jsonFavourites = await AsyncStorage.getItem("favourites");
    if (jsonFavourites !== null) {
      const updatedFavourites = JSON.parse(jsonFavourites);

      const existingProductIndex = updatedFavourites.findIndex((product) => product.id === item.id);
      if (existingProductIndex === -1) {
        updatedFavourites.push(item);

        await AsyncStorage.setItem("favourites", JSON.stringify(updatedFavourites));

        Toast.show("Added to favourites successfully!!", {
          duration: Toast.durations.LONG,
        });
        return;
      }

      return Alert.alert("Add to Favourites", "You have already added this product to favourites", [
        { text: "Oke", style: "cancel" },
      ]);
    }

    const updatedFavourites = [item];
    await AsyncStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  return <ProductItem item={item} onPress={pressIconHandler} />;
}

function ProductListScreen({ navigation }) {
  const theme = useContext(ThemeContext);

  return (
    <SafeAreaView style={styles.rootScreen}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.title, { color: theme.textColor }]}>Product List</Text>

        <FlatList
          data={productList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => renderProductItem(item)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 20,
  },
});

export default ProductListScreen;
