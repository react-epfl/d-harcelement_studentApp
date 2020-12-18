import * as React from 'react';
import { StyleSheet, TextInput, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatBot from 'react-native-chatbot';
import ChatBotSteps from '../../constants/ChatBotSteps';


export default function ChatViewScreen({ route, navigation}) {
  const { id } = route.params;
  const { name } = route.params;
  const {avatarUri} = route.params;
  

  const func_end = (json) => {
    var rendered_steps = json['renderedSteps'];
    var steps = json['steps'];
    var values = json['values'];
  }
  

  if (id == 1){
    return (
      <SafeAreaView style={styles.maincontainer}>
          <ChatBot steps={ChatBotSteps.steps} userDelay={100} botAvatar={avatarUri} userAvatar={"https://www.w3schools.com/howto/img_avatar.png"}  botDelay={2000} optionBubbleColor='#F00' cache={true} handleEnd={func_end}/>
      </SafeAreaView>
    );
  }
  else
  {
    return (
      <SafeAreaView style={styles.maincontainer}>
        <ScrollView style={styles.scrollview} contentContainerStyle={{ flexGrow: 1 }}>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  scrollview: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 5,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column'
  }
});