import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppState, Alert, Modal, View, Text, StyleSheet, Button } from 'react-native'

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {authenticateAsync} from 'expo-local-authentication'
console.disableYellowBox = true;

import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarCodeScanner } from 'expo-barcode-scanner';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

export default function App() {
  const [modalState, setModalState] = useState(false)

  const storeData = async (id, value) => {
    try {
      await AsyncStorage.setItem(id, value)
    } catch (e) {
      // saving error
    }
  }

  const getData = async (id) => {
    try {
      const value = await AsyncStorage.getItem(id)
      return value

    } catch(e) {
      console.error(e)
      return ''
    }
  }

  const checkIfNeedEnterSchoolId = async() => {
    let value = await getData('@school_id');
    if (value === null) {
      setModalState(true)
    }
    else{
      setModalState(false)
    }
  }

  checkIfNeedEnterSchoolId()


  const CELL_COUNT = 4;

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if(value.length == CELL_COUNT){
      storeData('@school_id', value);
      setModalState(false)
      setValue('')
    }
  }, [value])

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setValue(data)
  };  


  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const unlockedViews = (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} />
      <StatusBar />
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalState}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.root}>
            <Text style={styles.title}>Code Ecole</Text>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{flex:1, margin:20}}
            />
          </View>
        </Modal>
      </View>
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

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});
