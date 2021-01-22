import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Button, Alert} from 'react-native';

import { Text, View } from '../components/Themed';
import { SettingsScreen, SettingsData  } from "react-native-settings-screen"
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import {Picker} from '@react-native-picker/picker';

/* -- TRANSLATIONS -- */
import * as Localization from 'expo-localization'
import i18n from 'i18n-js'

// Set the key-value pairs for the different languages supports
i18n.translations = {
  'en-US': 
  {
    AlertClearDataMessage: 'Data are erased',
    SettingsHeader: 'General Settings',
    SchoolNumber: 'School number',
    AvatarSetting: 'Avatar',
    NotificationsSetting: 'Notifications',
    RemoveDataSetting: 'Delete data',
    oneday: '1 day',
    twoday: '2 days',
    oneweek: '1 week',
    fivemin: '5 minutes',
    DeleteButton: 'Delete'
  },
  'fr-CH':
  {
    AlertClearDataMessage: 'Les données sont supprimées',
    SettingsHeader: 'Paramètres généraux',
    SchoolNumber: 'Numéro d\'école',
    AvatarSetting: 'Avatar',
    NotificationsSetting: 'Notifications',
    RemoveDataSetting: 'Supprimer les données',
    oneday: '1 jour',
    twoday: '2 jours',
    oneweek: '1 semaine',
    fivemin: '5 minutes',
    DeleteButton: 'Supprimer'
  }
}
i18n.locale = Localization.locale;
i18n.fallbacks = true;
/* -- END TRANSLATIONS -- */


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
      Alert.alert(i18n.t('AlertClearDataMessage'))
    } catch(e){
      console.error(e);
    }

    
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
      header: i18n.t('SettingsHeader').toUpperCase(),
      rows: [
        {
          title: i18n.t('SchoolNumber'),
          renderAccessory: () => (
            <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
              {schoolid}
            </Text>
          ),         
        },
        {
          title: i18n.t('AvatarSetting'),
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
          title: i18n.t('NotificationsSetting'),
          renderAccessory: () => (
            <Picker
              selectedValue={notifValue}
              style={{height: 50, width:130}}
              onValueChange={(itemValue, itemIndex) =>
                setupNotifications(itemValue)
              }>
              <Picker.Item label={i18n.t('oneday')} value={String(60*60*24)} />
              <Picker.Item label={i18n.t('twoday')} value={String(60*60*24*2)} />
              <Picker.Item label={i18n.t('oneweek')} value={String(60*60*24*7)} />
              <Picker.Item label={i18n.t('fivemin')} value={String(60*5)} />
            </Picker>
          ),
        },
        {
          title: i18n.t('RemoveDataSetting'),
          titleStyle: {
            color: 'red',
          },
          renderAccessory: () => <Button title={i18n.t('DeleteButton')} color='#F00' onPress={clearAsyncStorage} />
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
