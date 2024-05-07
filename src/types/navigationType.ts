import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductItem } from './categoryType';

export type RootStackParamList = {
  Welcome: undefined;
  Main:
    | {
        screen?: string;
      }
    | undefined;
  Home: undefined;
  ProductDetail: {
    product: ProductItem;
  };
  Cart: undefined;
};

export type ProductDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ProductDetail'
>;

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

export type CartScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Cart'
>;
