import { preventAutoHide } from 'expo-splash-screen';
import * as React from 'react';
import { StyleSheet, TextInput, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/Colors';
import { Text, View } from '../../components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

/* -- TRANSLATIONS -- */
import * as Localization from 'expo-localization'
import i18n from 'i18n-js'

// Set the key-value pairs for the different languages supports
i18n.translations = {
    'en-US': 
    {
      OKButton: 'OK'
    },
    'fr-CH':
    {
    }
}
i18n.locale = Localization.locale;
i18n.fallbacks = true;
/* -- END TRANSLATIONS -- */


export default function TemoignageViewScreen({ route, navigation}) {
  const { id } = route.params;
  const { content } = route.params;
  const { location } = route.params;
  const { datetime } = route.params;

  return (
    <SafeAreaView style={styles.maincontainer}>
      <ScrollView style={styles.scrollview} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <TextInput
            style={{width: '90%' , height: '100%', marginTop: 10}}
            editable={false}
            multiline
            value={content}
          />
        </View>

        <View style={styles.horizontalcontainer}>

          <Button
            style={styles.button}
            title={i18n.t('OKButton')}
            type="solid"
            onPress={() => navigation.goBack() }
            />    
        </View>    
    </ScrollView>
  </SafeAreaView>
  );
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
    padding: 10
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