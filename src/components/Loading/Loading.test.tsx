import { render } from '@testing-library/react-native';
import Loading from '.';

test('Loading screen', () => {
  const { getByTestId } = render(<Loading />);
  expect(getByTestId('loading')).toBeOnTheScreen();
});
