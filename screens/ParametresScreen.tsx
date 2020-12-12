import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Switch, Button, Alert} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { SettingsScreen, SettingsData, Chevron  } from "react-native-settings-screen"
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ParametresScreen() {
  
  
  const clearAsyncStorage = async() => {
    try{
      await AsyncStorage.removeItem('@school_id')
    } catch(e){
      console.error(e);
    }

    Alert.alert('Données supprimées')
  }

  const data: SettingsData = [
    {
      type: 'SECTION',
      header: 'Paramètres généraux'.toUpperCase(),
      rows: [
        {
          title: 'Supprimer les données',
          titleStyle: {
            color: 'red',
          },
          renderAccessory: () => <Button title='Supprimer' color='#F00' onPress={clearAsyncStorage} />
        }
      ]
    },
  ];

  return (
    <View style={styles.container}>
      <SettingsScreen data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
