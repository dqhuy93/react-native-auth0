import { useColorScheme } from "react-native";
import { useAuth0 } from "react-native-auth0";
import { Colors } from "react-native/Libraries/NewAppScreen";

const useController = ({ navigation }: any) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const { authorize, clearSession, user, getCredentials, error, isLoading } =
    useAuth0();

  const onLogin = async () => {
    await authorize({}, {});
    const credentials = await getCredentials();
    // Alert.alert('AccessToken: ' + credentials?.accessToken);
  };

  const loggedIn = user !== undefined && user !== null;

  const onLogout = async () => {
    await clearSession({}, {});
  };

  const onGoToDetails = () => {
    navigation.navigate('Details');
  };

  const onGoToCounter = () => {
    navigation.navigate('Counter');
  };

  return {
    user,
    onLogin,
    loggedIn,
    onLogout,
    error,
    isLoading,
    backgroundStyle,
    onGoToCounter,
    onGoToDetails,
  };
};

export default useController;