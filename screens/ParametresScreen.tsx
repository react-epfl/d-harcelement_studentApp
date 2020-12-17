import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Switch, Button, Alert} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { SettingsScreen, SettingsData, Chevron  } from "react-native-settings-screen"
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import {Picker} from '@react-native-picker/picker';

export default function ParametresScreen() {
  

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


  const clearAsyncStorage = async() => {
    try{
      await AsyncStorage.removeItem('@school_id')
    } catch(e){
      console.error(e);
    }

    Alert.alert('Données supprimées')
  }

  const getSchoolData = async () => {
    try {
      const value = await AsyncStorage.getItem('@school_id')
      return value

    } catch(e) {
      console.error(e)
      return ''
    }
  }

  const [schoolid, setSchoolid] = useState('')
  const setupSchoolId = async () => {
    let id = await getSchoolData()
    setSchoolid(id ? id : '')
  }
  setupSchoolId()




  const [notifValue, setNotifValue] = useState('0');
  const setupNotifValue = async() => {
    let v = await getData('@notif_delay');
    setNotifValue(v ? v : '0');
  }
  setupNotifValue();
  const setupNotifications = async (val) => {
    setNotifValue(val);
    
    let tim;
    switch (val){
      case "0":
        tim = 60*60*24;
        break;
      case "1":
        tim = 60*60*24*2;
        break;
      case "2":
        tim = 60*60*24*7;
        break;
      case "3" :
        tim = 60*5;
        break;
      default:
        tim = 60*60*24;
    }
    await storeData('@notif_delay', tim)
    
    await Notifications.cancelAllScheduledNotificationsAsync()
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hey",
        body: 'Cela fait longtemps que nous ne t\'avons pas vu.',
      },
      trigger: {
        seconds: tim,
        repeats: true
      }
    });
  }

  const data: SettingsData = [
    {
      type: 'SECTION',
      header: 'Paramètres généraux'.toUpperCase(),
      rows: [
        {
          title: 'Numéro d\'école',
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {schoolid}
            </Text>
          ),         
        },
        {
          title: 'Notifications',
          renderAccessory: () => (
            <Picker
              selectedValue={notifValue}
              style={{height: 50, width:130}}
              onValueChange={(itemValue, itemIndex) =>
                setupNotifications(String(itemValue))
              }>
              <Picker.Item label="1 jour" value="0" />
              <Picker.Item label="2 jours" value="1" />
              <Picker.Item label='1 semaine' value="2" />
              <Picker.Item label='5 minutes' value="3" />
            </Picker>
          ),
        },
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
