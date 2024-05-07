/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Auth0Provider } from 'react-native-auth0';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import config from './auth0-configuration';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import AppNavigation from './src/navigation';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './src/helpers/queryClient';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Auth0Provider domain={config.domain} clientId={config.clientId}>
          <>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            <SafeAreaView style={backgroundStyle}>
              <NavigationContainer>
                <AppNavigation />
              </NavigationContainer>
            </SafeAreaView>
          </>
        </Auth0Provider>
      </QueryClientProvider>
      <Toast />
    </Provider>
  );
}

export default App;
