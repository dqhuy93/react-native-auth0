import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import useController from './useController';

const Home = ({ navigation }: any) => {

  const {
    isLoading,
    backgroundStyle,
    user,
    loggedIn,
    error,
    onLogin,
    onLogout,
    onGoToCounter,
    onGoToDetails
  } = useController({ navigation });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }
  // return (
  //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //     <Text>Home Screen</Text>
  //   </View>
  // );
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}>
      <View className="bg-white dark:bg-black">
        <View className="flex-1 w-full items-center justify-center">
          <Text style={styles.header}> Auth0Sample - Login </Text>
          {user && <Text>You are logged in as {user.name}</Text>}
          {!user && <Text>You are not logged in</Text>}
          <Button
            onPress={loggedIn ? onLogout : onLogin}
            title={loggedIn ? 'Log Out' : 'Log In'}
          />
          {error && <Text style={styles.error}>{error.message}</Text>}
          <Button
            title="Go to Details"
            onPress={onGoToDetails}
          />
          <Button
            title="Go to Counter"
            onPress={onGoToCounter}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  error: {
    margin: 20,
    textAlign: 'center',
    color: '#D8000C',
  },
});

export default Home;
