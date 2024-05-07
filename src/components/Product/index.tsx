import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { ProductItem } from '../../types/categoryType';
import useAppNavigation from '../../hooks/useAppNavigation';
import useController from './useController';

export default function Product({
  item,
  onAddToCart,
}: {
  item: ProductItem;
  onAddToCart: (item: ProductItem) => void;
}) {
  const {
    onAddItemToCart,
    onNavigate
  } = useController({
    onAddToCart,
    item,
  });

  return (
    <View style={{ width: '50%' }} className={`p-3`}>
      <Pressable
        onPress={onNavigate}
      >
        <Image
          className="m-5 h-56 w-full mx-auto object-cover bg-slate-500 rounded-lg"
          source={{ uri: item.image }}
        />
        <Text className="text-dark mb-3" testID='productTitle'>
          {item.title.substring(0, 30) + '...'}
        </Text>
      </Pressable>
      <View className="flex flex-row items-center justify-between">
        <Text className="text-dark dark:text-white font-bold">{`$${item.price}`}</Text>
        <TouchableOpacity
          testID='productAddToCart'
          onPress={onAddItemToCart}
        >
          <View className="p-2 bg-orange-100 rounded-md">
            <Text>Add to cart</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
