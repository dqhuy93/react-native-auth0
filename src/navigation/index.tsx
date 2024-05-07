import * as React from 'react';
import HomeScreen from '../screens/HomeScreen';
import RecipeDetailScreen from '../screens/ProductDetailScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { RootStackParamList } from '../types/navigationType';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeIcon, ShoppingCartIcon } from 'react-native-heroicons/outline';
import {
  HomeIcon as HomeIconSolid,
  ShoppingCartIcon as ShoppingCartIconSolid,
} from 'react-native-heroicons/solid';
import { CART_KEY, TAB_KEY } from '../constant';
import CartScreen from '../screens/CartScreen';
import { getData, storeData } from '../helpers/storage';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCart, updateCart } from '../app/reducers/appSlice';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const MainScreen = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);

  React.useEffect(() => {
    getData(CART_KEY, true).then((res: any[]) => {
      dispatch(updateCart(res || []));
    });
  }, []);

  React.useEffect(() => {
    storeData(CART_KEY, cart);
  }, [cart]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = focused ? `${route.name}Active` : route.name;
          const Icon = TabIcons[iconName as keyof typeof TabIcons];
          return <Icon color={color} size={size} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name={TAB_KEY.HOME}
        options={{ title: 'Home' }}
        component={HomeScreen}
      />
      <Tab.Screen
        name={TAB_KEY.CART}
        options={{
          title: 'Cart',
          tabBarBadge: cart.length,
        }}
        component={CartScreen}
      />
    </Tab.Navigator>
  );
};

const TabIcons = {
  [TAB_KEY.HOME]: HomeIcon,
  [`${TAB_KEY.HOME}Active`]: HomeIconSolid,
  [TAB_KEY.CART]: ShoppingCartIcon,
  [`${TAB_KEY.CART}Active`]: ShoppingCartIconSolid,
};

function AppNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
    >
      {/* <Stack.Screen name="Welcome" component={WelcomeScreen} /> */}
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen
        name="ProductDetail"
        // options={{ presentation: 'fullScreenModal' }}
        component={RecipeDetailScreen}
      />
    </Stack.Navigator>
  );
}

export default AppNavigation;
