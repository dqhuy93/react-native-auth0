import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCart, updateCart } from '../app/reducers/appSlice';
import { CartItem } from '../types/categoryType';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CartScreenProps, RootStackParamList } from '../types/navigationType';
import { NavigationProp } from '@react-navigation/native';

type ItemProps = {
  item: CartItem;
  onDelete: (item: CartItem) => void;
  navigation: NavigationProp<RootStackParamList>;
};

const Item = ({ item, onDelete, navigation }: ItemProps) => {
  return (
    <View className="flex flex-row items-center space-x-4 px-2 py-2 justify-between ">
      <Pressable
        testID="productDetailPressable"
        onPress={() =>
          navigation.navigate('ProductDetail', { product: item.product })
        }
        className="flex-1 "
      >
        <View className="flex flex-row items-center space-x-2  ">
          <Image
            source={{ uri: item.product.image }}
            style={{ height: hp(5), width: hp(5) }}
            className="rounded-full"
          />
          <View>
            <Text className="text-neutral-600">
              {item.product.title.substring(0, 30) + '...'}
            </Text>
            <Text>${item.product.price}</Text>
          </View>
        </View>
      </Pressable>
      <View className="flex justify-between flex-row items-center space-x-2 w-[90] ">
        <Text className="text-lg font-bold">{item.quantity}</Text>

        <TouchableOpacity
          className="rounded-md bg-orange-100 p-2"
          testID="deleteBtn"
          onPress={() => {
            onDelete(item);
          }}
        >
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CartScreen = ({ navigation }: CartScreenProps) => {
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  const onDelete = (item: CartItem) => {
    const newCart = cart.filter(
      (product) => product.product.id !== item.product.id,
    );
    dispatch(updateCart(newCart));
  };

  if (!cart.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text className="text-lg">Empty</Text>
      </View>
    );
  }

  return (
    <FlatList
      className="bg-white flex-1"
      ListHeaderComponent={() => (
        <View className="text-center px-3">
          <Text className="text-lg text-center font-bold">Cart</Text>
        </View>
      )}
      data={cart}
      renderItem={({ item }) => {
        return <Item item={item} onDelete={onDelete} navigation={navigation} />;
      }}
      keyExtractor={(item) => '' + item.product.id}
    />
  );
};

export default CartScreen;
