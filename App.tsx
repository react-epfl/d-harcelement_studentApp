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


  
  const unlockedViews = (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} />
      <StatusBar />
    </SafeAreaProvider>
  );

  const lockedViews = (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} />
      <StatusBar />
    </SafeAreaProvider>
  );

  const [locked, setLocked] = useState(true);
  const [appState, SetAppState] = useState(AppState.currentState);
  const [mainView, setMainView] = useState(lockedViews);

  const localAuth = () => {
    authenticateAsync({
      promptMessage: 'Unlock to access app',
    }).then(({ success }) => {
      if (success) {
        setLocked(false);
        setMainView(unlockedViews);
      }
    });
  }

  useEffect(() => {
    if(locked == true && AppState.currentState == 'active') {
      localAuth();
    }
  }, [locked, appState]);

  const _handleAppStateChange = async (nextAppState) => {
    if(!locked) {
      if(nextAppState === 'inactive' || nextAppState === 'background') {
        setLocked(true);
        setMainView(lockedViews);
      }
    }
    SetAppState(nextAppState);
  };


  AppState.addEventListener('change', _handleAppStateChange);

  if (!isLoadingComplete || locked) {
    return null;
  } else {
    return mainView;
  }
}
