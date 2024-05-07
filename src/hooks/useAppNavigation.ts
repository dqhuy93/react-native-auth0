import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigationType';

const useAppNavigation = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return navigation;
};

export default useAppNavigation;
