import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ChatsScreen from '../screens/ChatsScreen';
import TemoignagesScreen from '../screens/TemoignagesScreen';
import ContactsScreen from '../screens/ContactsScreen';
import ParametresScreen from '../screens/ParametresScreen';
import { BottomTabParamList, ChatsParamList, TemoignagesParamList, ContactsParamList, ParametresParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Chats"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Chats"
        component={ChatsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-chatbubbles" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Témoignages"
        component={TemoignagesNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-book" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Contacts"
        component={ContactsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-people" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Paramètres"
        component={ParametresNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-settings" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ChatsStack = createStackNavigator<ChatsParamList>();

function ChatsNavigator() {
  return (
    <ChatsStack.Navigator>
      <ChatsStack.Screen
        name="ChatsScreen"
        component={ChatsScreen}
        options={{ headerTitle: 'Chats' }}
      />
    </ChatsStack.Navigator>
  );
}

const TemoignagesStack = createStackNavigator<TemoignagesParamList>();

function TemoignagesNavigator() {
  return (
    <TemoignagesStack.Navigator>
      <TemoignagesStack.Screen
        name="TemoignagesScreen"
        component={TemoignagesScreen}
        options={{ headerTitle: 'Témoignages' }}
      />
    </TemoignagesStack.Navigator>
  );
}

const ContactsStack = createStackNavigator<ContactsParamList>();

function ContactsNavigator() {
  return (
    <ContactsStack.Navigator>
      <ContactsStack.Screen
        name="ContactsScreen"
        component={ContactsScreen}
        options={{ headerTitle: 'Contacts' }}
      />
    </ContactsStack.Navigator>
  );
}


const ParametresStack = createStackNavigator<ParametresParamList>();

function ParametresNavigator() {
  return (
    <ParametresStack.Navigator>
      <ParametresStack.Screen
        name="ParametresScreen"
        component={ParametresScreen}
        options={{ headerTitle: 'Paramètres' }}
      />
    </ParametresStack.Navigator>
  );
}
