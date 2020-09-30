import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { AppState, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {authenticateAsync} from 'expo-local-authentication'


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [locked, setLocked] = useState(true);

  const localAuth = () => {
    authenticateAsync({
      promptMessage: 'Unlock to access app',
    }).then(({ success }) => {
      if (success) {
        setLocked(false);
        console.log('device unlocked');
      }
    });
  }

  useEffect(() => {
    localAuth();
  }, []);

  const _handleAppStateChange = async nextAppState => {
    if(!locked) {
      if(nextAppState === 'inactive' || nextAppState === 'background') {
        console.log('locking device');
        setLocked(true);
      }
    }
  };

  AppState.addEventListener('change', _handleAppStateChange);

  if (!isLoadingComplete || locked) {
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
