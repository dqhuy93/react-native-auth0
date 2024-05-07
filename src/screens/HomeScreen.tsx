import { View, Text, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Categories from '../components/Categories';
import Product from '../components/Product';
import { useQuery } from '@tanstack/react-query';
import { CartItem, ProductItem } from '../types/categoryType';
import { useAuth0 } from 'react-native-auth0';
import classNames from 'classnames';
import { getData, storeData } from '../helpers/storage';
import { AUTH_TOKEN, CART_KEY } from '../constant';

import { useAppDispatch } from '../app/hooks';
import { updateCart } from '../app/reducers/appSlice';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('');
  const { authorize, clearSession, user, getCredentials } = useAuth0();
  const dispatch = useAppDispatch();

  const onLogin = async () => {
    try {
      await authorize({}, {});
      const credentials = await getCredentials();
      storeData(AUTH_TOKEN, credentials?.accessToken);
    } catch (err) {}
  };
  const onLogout = async () => {
    await clearSession({}, {});
  };

  const loggedIn = user !== undefined && user !== null;
  const {
    error,
    data: categoriesData,
    isFetching,
  } = useQuery<string[]>({
    queryKey: ['/products/categories'],
    initialData: [],
  });

  const {
    isFetching: isFetchingProducts,
    data: recipesData,
    refetch: refetchProducts,
    isRefetching,
  } = useQuery<ProductItem[]>({
    queryKey: [`/products/category/${activeCategory}`],
    initialData: [],
    enabled: !!activeCategory,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (categoriesData.length) {
      setActiveCategory(categoriesData[0]);
    }
  }, [categoriesData]);

  const handleChangeCategory = (category: any) => {
    setActiveCategory(category);
  };

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
    <View className="flex-1 bg-white">
      <View className="space-y-2 mb-2">
        <View
          className={classNames(
            'flex-row items-center bg-slate-100 py-2 px-3',
            {
              'justify-end': !user,
              'justify-between': user,
            },
          )}
        >
          {user && (
            <View className="flex flex-row items-center space-x-2">
              <Image
                source={{ uri: user.picture }}
                style={{ height: hp(5), width: hp(5) }}
                className="rounded-full"
              />
              <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
                {user.name}
              </Text>
            </View>
          )}

          <Text onPress={loggedIn ? onLogout : onLogin}>
            {loggedIn ? 'Logout' : 'Login'}
          </Text>
        </View>

        <Categories
          categories={categoriesData}
          activeCategory={activeCategory}
          handleChangeCategory={handleChangeCategory}
        />
      </View>
      <FlatList
        data={recipesData}
        numColumns={2}
        renderItem={({ item }) => {
          return <Product item={item} onAddToCart={onAddToCart} />;
        }}
        keyExtractor={(item) => {
          return '' + item.id;
        }}
      />
    </View>
  );
}
