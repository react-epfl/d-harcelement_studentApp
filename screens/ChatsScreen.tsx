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


export default function ChatsScreen() {
  return (
    <ChatBot steps={ChatBotSteps.steps} userDelay={100} botDelay={2000} optionBubbleColor='#F00' cache={true} handleEnd={func_end}/>
  );
}
