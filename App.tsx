import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Alert, Modal, View, Text } from 'react-native'

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [modalState, setModalState] = useState(false)

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@school_id', value)
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@school_id')
      return value

    } catch(e) {
      console.error(e)
      return ''
    }
  }

  const checkIfNeedEnterSchoolId = async() => {
    let value = await getData();
    if (value === null) {
      setModalState(true)
    }
    else{
      setModalState(false)
    }
    console.log(value)
  }

  checkIfNeedEnterSchoolId()
  


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
        <View style={{marginTop: 22}}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalState}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={{marginTop: 22}}>
              <View>
                <Text>Hello World!</Text>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaProvider>
    );
  }
}
