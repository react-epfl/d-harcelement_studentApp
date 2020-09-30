import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useRef, useState} from 'react';
import { Text, View, StyleSheet, AppState, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import LocalAuth from './components/LocalAuth';
import {authenticateAsync} from 'expo-local-authentication'


const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [appState, setState] = useState('inactive');
  const authenticateUser = async () => {
    const {success, error: authError = ''} = await authenticateAsync();
    authError && Alert.alert(authError)
  };

  const _handleAppStateChange = async nextAppState => {
    console.log(nextAppState);
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      authenticateUser();
    }
    setState(nextAppState);
  };


  AppState.addEventListener('change', _handleAppStateChange);




  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
