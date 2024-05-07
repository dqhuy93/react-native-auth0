import CartScreen from './CartScreen';
import { renderWithProviders } from '../utils/test-utils';
import { fireEvent, screen } from '@testing-library/react-native';

describe('Cart Screen', () => {
  test('Empty state', () => {
    const navigationMock = {
      navigate: jest.fn(),
    } as any;

    const { getByText } = renderWithProviders(
      <CartScreen navigation={navigationMock} route={'' as any} />,
      {
        preloadedState: {
          app: {
            cart: [],
          },
        },
      },
    );
    expect(getByText('Empty')).toBeOnTheScreen();
  });

  test('Exist item', () => {
    const navigateMock = jest.fn();
    const navigationMock = {
      navigate: navigateMock,
    } as any;

    renderWithProviders(
      <CartScreen navigation={navigationMock} route={'' as any} />,
      {
        preloadedState: {
          app: {
            cart: [
              {
                product: {
                  category: 'electronics',
                  description: '',
                  id: 9,
                  image:
                    'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
                  price: 64,
                  rating: {
                    rate: 4,
                    count: 100,
                  },
                  title:
                    'WD 2TB Elements Portable External Hard Drive - USB 3.0 ',
                },
                quantity: 2,
              },
            ],
          },
        },
      },
    );
    // navigateMock have been called
    expect(screen.queryByTestId('productDetailPressable')).toBeOnTheScreen();
    fireEvent.press(screen.getAllByTestId('productDetailPressable')[0]);
    expect(navigateMock).toHaveBeenCalled();

    // delete product
    expect(screen.queryByTestId('deleteBtn')).toBeTruthy();
  });
});
