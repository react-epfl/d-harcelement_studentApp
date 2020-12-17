import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function ChatsScreen() {
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

  const setupNotifications = async () => {
    let tmp = await getData('@notif_delay') || '0';
    let tim = parseInt(tmp, 10)
    if (tim == null){
      storeData('@notif_delay', 60*5);
      tim = 60*5;
    }

    await Notifications.cancelAllScheduledNotificationsAsync()
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hey",
        body: 'Cela fait longtemps que nous ne t\'avons pas vu.',
      },
      trigger: {
        seconds: tim,
        repeats: false
      }
    });
  }

  setupNotifications();


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chats</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/ChatsScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
