import { preventAutoHide } from 'expo-splash-screen';
import * as React from 'react';
import { StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-elements';
import { View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

/* -- TRANSLATIONS -- */
import * as Localization from 'expo-localization'
import i18n from 'i18n-js'

// Set the key-value pairs for the different languages supports
i18n.translations = {
    'en-US': 
    {
      EditTextPlaceholder: 'Write your temoignage',
      CancelButton: 'Cancel',
      SendButton: 'Send',
    },
    'fr-CH':
    {
      EditTextPlaceholder: 'Décrivez votre témoignage',
      CancelButton: 'Annuler',
      SendButton: 'Envoyer',
    }
}
i18n.locale = Localization.locale;
i18n.fallbacks = true;
/* -- END TRANSLATIONS -- */

export default function TemoignageCreateScreen() {

  const navigation = useNavigation();

  const [postText, setPostText] = React.useState('');

  return (
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{flex: 1}}
          >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <View style={{flex: 2}}>
                <TextInput
                  style={{ backgroundColor: '#EEE', width: '100%' , height: '100%'}}
                  placeholder={i18n.t('EditTextPlaceholder')}
                  editable
                  multiline
                  value={postText}
                  onChangeText={setPostText}
                  />
              </View>

              <View style={{ flex:1, flexDirection: 'row', justifyContent: 'space-around'}}>

                <Button
                  style={styles.button}
                  icon={
                    <Ionicons
                      name="ios-close"
                      color='white'
                      style={styles.buttonicon}
                      size={25}
                    />
                  }
                  title={i18n.t('CancelButton')}
                  type="solid"
                  onPress={() => navigation.goBack() }
                  />

                <Button
                  style={styles.button}
                  icon={
                    <Ionicons
                      name="ios-send"
                      color='white'
                      style={styles.buttonicon}
                      size={25}
                    />
                  }
                  title={i18n.t('SendButton')}
                  type="solid"
                  onPress={() => {
                    navigation.navigate('TemoignagesScreen', { content: postText, location: 'St-Prex', datetime: '2020-09-16'});
                  }}
                  />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around'
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  horizontalcontainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  button: {
    margin: 20,
    minWidth: '30%'
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
  buttonicon: {
    margin: 5,
  },
});