import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { ShoppingCartIcon } from 'react-native-heroicons/solid';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { ProductDetailScreenProps } from '../types/navigationType';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCart, updateCart } from '../app/reducers/appSlice';
import useAppNavigation from '../hooks/useAppNavigation';
import { CART_KEY, TAB_KEY } from '../constant';
import { getData } from '../helpers/storage';
import { ProductItem, CartItem } from '../types/categoryType';

export default function ProductDetailScreen(props: ProductDetailScreenProps) {
  let { product } = props.route.params;

  const navigation = useAppNavigation();
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  const onAddToCart = async (product: ProductItem) => {
    let cart: CartItem[] = await getData(CART_KEY, true);
    if (!cart) {
      cart = [];
    }

    const indexItem = cart.findIndex((item) => item.product.id === product.id);
    if (indexItem === -1) {
      cart.push({
        product: {
          ...product,
          // description: '',
        },
        quantity: 1,
      });
    } else {
      cart[indexItem].quantity += 1;
    }
    dispatch(updateCart(cart));
  };

  return (
    <View className="flex-1 bg-white relative">
      {/* <SafeAreaView /> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 15 }}
        className="flex-1"
      >
        {/* recipe image */}
        <View className="flex-row justify-center">
          <Image
            source={{ uri: product.image }}
            style={{
              width: wp(100),
              height: hp(40),
            }}
          />
        </View>

        {/* back button */}
        <Animated.View
          entering={FadeIn.delay(200).duration(1000)}
          className="w-full absolute flex-row justify-between items-center pt-7"
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-full ml-5 bg-slate-200"
          >
            <ChevronLeftIcon size={hp(3)} strokeWidth={4} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Main', {
                screen: TAB_KEY.CART,
              });
            }}
            className="p-2 rounded-full mr-5 bg-slate-200"
          >
            <ShoppingCartIcon color="#999" />
            <View className="rounded-full justify-center top-[-5] right-[-5] absolute w-[25] h-[25] bg-red-500">
              <Text className="text-center font-bold text-white">
                {cart.length}
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* meal description */}
        <View className="px-4 flex justify-between space-y-4 pt-8">
          {/* name and area */}
          <Animated.View
            entering={FadeInDown.duration(200).springify().damping(12)}
            className="space-y-2"
          >
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold flex-1 text-neutral-700"
            >
              {product?.title}
            </Text>
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-600"
            >
              {`$${product.price}`}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="font-medium flex-1 text-neutral-500"
            >
              {product?.description}
            </Text>
          </Animated.View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => onAddToCart(product)}>
        <View className="mx-4 h-10 bg-orange-200 items-center justify-center ">
          <Text className="text-lg">Add to cart</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
