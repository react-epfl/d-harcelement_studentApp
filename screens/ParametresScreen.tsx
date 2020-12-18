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
      await AsyncStorage.removeItem('@avatar')
      await Notifications.cancelAllScheduledNotificationsAsync()
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

  const [avatarValue, setAvatarValue] = useState('sarah.png')
  const setupAvatarValue = async() => {
    let v = await getData('@avatar');
    setAvatarValue(v ? v : 'sarah.png')
  }
  setupAvatarValue();

  const saveAvatarValue = async(val) => {
    setAvatarValue(val);
    await storeData('@avatar', val);
  }

  const [notifValue, setNotifValue] = useState('3');
  const setupNotifValue = async() => {   
    let v = await getData('@notif_delay');
    setNotifValue(v ? v : String(60*5));
  }
  setupNotifValue();

  const setupNotifications = async (val) => {
    setNotifValue(val);
    await storeData('@notif_delay', String(val))
    
    await Notifications.cancelAllScheduledNotificationsAsync()
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hey",
        body: 'Cela fait longtemps que nous ne t\'avons pas vu.',
      },
      trigger: {
        seconds: parseInt(val),
        repeats: false
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
          title: 'Avatar',
          renderAccessory: () => (
            <Picker
              selectedValue={avatarValue}
              style={{height: 50, width:130}}
              onValueChange={(itemValue, itemIndex) =>
                saveAvatarValue(String(itemValue))
              }>
              <Picker.Item label="Sarah" value="sarah.png" />
              <Picker.Item label="Tina" value="tina.png" />
              <Picker.Item label='Arthur' value="arthur.png" />
              <Picker.Item label='Lea' value="lea.png" />
            </Picker>
          ),
        },
        {
          title: 'Notifications',
          renderAccessory: () => (
            <Picker
              selectedValue={notifValue}
              style={{height: 50, width:130}}
              onValueChange={(itemValue, itemIndex) =>
                setupNotifications(itemValue)
              }>
              <Picker.Item label="1 jour" value={String(60*60*24)} />
              <Picker.Item label="2 jours" value={String(60*60*24*2)} />
              <Picker.Item label='1 semaine' value={String(60*60*24*7)} />
              <Picker.Item label='5 minutes' value={String(60*5)} />
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
