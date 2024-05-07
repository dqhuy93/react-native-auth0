import { fireEvent, render } from '@testing-library/react-native';
import Product from '.';
import { NavigationContainer } from '@react-navigation/native';

const MOCK_ITEM = {
  category: 'testCat',
  description: 'test description',
  id: 1,
  image: 'test image',
  price: 10,
  title: 'test title',
  rating: {
    rate: 1,
    count: 1,
  },
};

test('Product screen', () => {
  const onMockPress = jest.fn();
  const { getByTestId } = render(
    <NavigationContainer>
      <Product onAddToCart={onMockPress} item={MOCK_ITEM} />
    </NavigationContainer>,
  );
  expect(getByTestId('productTitle')).toBeOnTheScreen();
  fireEvent.press(getByTestId('productAddToCart'));
  expect(onMockPress).toHaveBeenCalledWith(MOCK_ITEM);
});
