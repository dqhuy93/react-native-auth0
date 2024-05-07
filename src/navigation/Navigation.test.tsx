import * as React from 'react';
import { screen, fireEvent, cleanup, act } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from '.';
import { renderWithProviders } from '../utils/test-utils';

jest.mock('../helpers/storage', () => ({
  ...jest.requireActual('../helpers/storage'),
  getData: jest.fn(() => Promise.resolve(null)),
  storeData: jest.fn(() => Promise.resolve(null)),
}));

// https://stackoverflow.com/questions/59018071/mock-usedispatch-in-jest-and-test-the-params-with-using-that-dispatch-action-in
// https://stackoverflow.com/questions/76011279/how-do-i-write-a-test-for-react-custom-hook-that-has-useappdispatch-and-toolkits
jest.mock('../app/hooks', () => ({
  ...jest.requireActual('../app/hooks'),
  useAppDispatch: () => jest.fn(),
}));

describe('Cart Screen', () => {
  afterAll(() => {
    cleanup();
  });

  test('Show AppNavigation', () => {
    renderWithProviders(
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>,
      {
        preloadedState: {
          app: {
            cart: [],
          },
        },
      },
    );

    fireEvent.press(screen.getByText('Cart'));
    act(() => {
      expect(screen.getByText('Empty')).toBeOnTheScreen();
    });
  });
});
