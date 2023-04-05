import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import ProductListScreen from "./screens/ProductListScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootSiblingParent } from "react-native-root-siblings";
import FavouriteProducts from "./screens/FavouriteProductsScreen";
import Settings from "./screens/SettingsScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { EventRegister } from "react-native-event-listeners";
import ThemeContext from "./context/themeContext";
import configTheme from "./config/theme";

const Tab = createBottomTabNavigator();

export default function App() {
  const [theme, setTheme] = useState(configTheme.light);

  useEffect(() => {
    const eventListener = EventRegister.addEventListener("changeTheme", (data) => {
      setTheme(data);
    });

    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  });

  return (
    <>
      <StatusBar style={theme.mode === "light" ? "dark" : "light"} />
      <RootSiblingParent>
        <ThemeContext.Provider value={theme}>
          <SafeAreaProvider>
            <NavigationContainer theme={theme.mode === "light" ? DefaultTheme : DarkTheme}>
              <Tab.Navigator>
                <Tab.Screen
                  name="ProductList"
                  component={ProductListScreen}
                  options={{
                    headerTitle: "Product List",
                    tabBarLabel: "Product List",
                    tabBarLabelStyle: { fontSize: 14 },
                    tabBarIcon: ({ color, size }) => <Icon name="list" color={color} size={size} />,
                  }}
                />

                <Tab.Screen
                  name="FavouriteProducts"
                  component={FavouriteProducts}
                  options={{
                    headerTitle: "Favourites",
                    tabBarLabel: "Favourites",
                    tabBarLabelStyle: { fontSize: 14 },
                    tabBarIcon: ({ color, size }) => <Icon name="star" color={color} size={size} />,
                  }}
                />

                <Tab.Screen
                  name="Settings"
                  component={Settings}
                  options={{
                    headerTitle: "Settings",
                    tabBarLabel: "Settings",
                    tabBarLabelStyle: { fontSize: 14 },
                    tabBarIcon: ({ color, size }) => <Icon name="settings" color={color} size={size} />,
                  }}
                />
              </Tab.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </ThemeContext.Provider>
      </RootSiblingParent>
    </>
  );
}
