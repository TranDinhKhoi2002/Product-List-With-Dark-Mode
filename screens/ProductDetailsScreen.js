import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import ProductItem from "../components/ProductItem";
import { productList } from "../data/productList";
import { useEffect } from "react";

function ProductDetails({ route, navigation }) {
  const productId = route.params.productId;
  const selectedProduct = productList.find((product) => product.id === productId);

  useEffect(() => {
    navigation.setOptions({
      title: selectedProduct.name,
    });
  }, [navigation, productId]);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>Details</Text>
        <View style={styles.productContainer}>
          <ProductItem item={selectedProduct} />
        </View>
        <View style={{ paddingHorizontal: 16, marginTop: 18 }}>
          <Text>{selectedProduct.description}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 20,
  },
  productContainer: {
    height: 160,
  },
});

export default ProductDetails;
