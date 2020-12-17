import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import ChatBot from 'react-native-chatbot';
import ChatBotSteps from '../constants/ChatBotSteps'


const func_end = (json) => {
  var rendered_steps = json['renderedSteps'];
  var steps = json['steps'];
  var values = json['values'];
}

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
    <ChatBot steps={ChatBotSteps.steps} userDelay={100} botDelay={2000} optionBubbleColor='#F00' cache={true} handleEnd={func_end}/>
  );
}
