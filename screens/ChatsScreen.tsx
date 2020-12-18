import * as React from 'react';
import {useState } from 'react';
import { StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import Colors from '../constants/Colors';

import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sarah from '../assets/images/sarah.png'
import lea from '../assets/images/lea.png'
import tina from '../assets/images/tina.png'
import arthur from '../assets/images/arthur.png'

const tinaUri = Image.resolveAssetSource(tina).uri
const arthurUri = Image.resolveAssetSource(arthur).uri
const leaUri = Image.resolveAssetSource(lea).uri
const sarahUri = Image.resolveAssetSource(sarah).uri

export default function ChatsScreen({ navigation }) {
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

  const [avatarValue, setAvatarValue] = useState(sarahUri)
  const getAvatar = async() => {
    let v = await getData('@avatar');
    let img;
    switch (v) {
      case 'sarah.png':
        setAvatarValue(sarahUri);
        break;
      case 'arthur.png':
        setAvatarValue(arthurUri);
        break;
      case 'tina.png':
        setAvatarValue(tinaUri);
        break;
      case 'lea.png':
        setAvatarValue(leaUri);
        break;
      default:
        setAvatarValue(sarahUri);
        break;
    }

  }
  getAvatar();

  const setupNotifications = async () => {
    let tmp = await getData('@notif_delay') || String(60*5);
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


  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#AAA",
        }}
      />
    );
  }

  // This should come from the website as a JSON file.
  const chats_data = [
    {
      id: 1,
      name: 'Chatbot'
    },
    {
      id: 2,
      name: 'Professeur Martin Vetterli'
    },
    {
      id: 3,
      name: 'Police'
    },
    {
      id: 4,
      name: 'Professeur Y'
    },
    {
      id: 5,
      name: 'Professeur Z'
    },
    {
      id: 6,
      name: 'Professeur A'
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      key={item.id.toString()}
      onPress={() => navigation.push('ChatViewScreen', {
        id: item.id,
        name: item.name,
        avatarUri: avatarValue
      })}
      >
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.item}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>     
      <ScrollView style={{flex: 1, width: '100%',}} contentContainerStyle={{ flexGrow: 1 }}>
      <FlatList
        style={styles.flatlist}
        data={chats_data}
        ItemSeparatorComponent = { FlatListItemSeparator }
        renderItem={ renderItem }
        keyExtractor={item => item.id.toString()}
      />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    flex: 1,
    fontSize: 32,
  },
  flatlist: {
    width: '100%',
  },
  listitemcontent: {
    padding: 10,
    flex: 1,
    fontSize: 18,
  },
  listitemlocation: {
    padding: 10,
    color: Colors.fadedcolor,
  },
  listitemdatetime: {
    padding: 10,
    color: Colors.fadedcolor,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '100%',
  },
});
