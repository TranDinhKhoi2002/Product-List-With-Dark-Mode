import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import ThemeContext from "../context/themeContext";

function renderProductItem(item, onRemove) {
  const addToFavouritesHandler = async () => {
    await onRemove(item.id);
  };

  return <ProductItem item={item} onPress={addToFavouritesHandler} />;
}

function FavouriteProducts({ navigation }) {
  const [favouriteProducts, setFavouriteProducts] = useState([]);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const getFavourites = navigation.addListener("focus", async () => {
      const jsonExistingFavourites = await AsyncStorage.getItem("favourites");
      setFavouriteProducts(JSON.parse(jsonExistingFavourites));
    });

    return getFavourites;
  }, [navigation]);

  const removeFromFavourites = async (itemId) => {
    const updatedFavourites = favouriteProducts.filter((product) => product.id !== itemId);
    setFavouriteProducts(updatedFavourites);
    await AsyncStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  return (
    <SafeAreaView style={styles.rootScreen}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.title, { color: theme.textColor }]}>Favourite Products</Text>

        {favouriteProducts.length > 0 ? (
          <FlatList
            data={favouriteProducts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderProductItem(item, removeFromFavourites)}
          />
        ) : (
          <Text style={[styles.noProducts, { color: theme.textColor }]}>There is no favourite products</Text>
        )}
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
  noProducts: {
    fontSize: 18,
  },
});

export default FavouriteProducts;
