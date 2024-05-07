import useAppNavigation from "../../hooks/useAppNavigation";
import { ProductItem } from "../../types/categoryType";

const useController = ({
  item,
  onAddToCart,
}: {
  item: ProductItem;
  onAddToCart: (item: ProductItem) => void;
}) => {
  const navigation = useAppNavigation();

  const onNavigate = () => {
    navigation.navigate('ProductDetail', { product: item })
  }

  const onAddItemToCart = () => {
    onAddToCart(item)
  }

  return {
    onNavigate,
    onAddItemToCart
  };
};

export default useController;
