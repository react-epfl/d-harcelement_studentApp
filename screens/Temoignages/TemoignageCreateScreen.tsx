import { preventAutoHide } from 'expo-splash-screen';
import * as React from 'react';
import { StyleSheet, TextInput, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';

export default function TemoignageCreateScreen() {

  const navigation = useNavigation();

  const [postText, setPostText] = React.useState('');

  return (
    <SafeAreaView style={styles.maincontainer}>
      <ScrollView style={styles.scrollview} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Créer un nouveau témoignage</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <TextInput
            style={{ backgroundColor: '#EEE', width: '90%' , height: '100%'}}
            placeholder="Décrivez votre témoignage"
            editable
            multiline
            value={postText}
            onChangeText={setPostText}
          />
        </View>

        <View style={styles.horizontalcontainer}>

        <Button
          style={styles.button}
          icon={
            <Icon
              name="ban"
              color='white'
              style={styles.buttonicon}
              size={20}
            />
          }
          title="Annuler"
          type="solid"
          onPress={() => navigation.goBack() }
          />

          <Button
            style={styles.button}
            icon={
              <Icon
                name="paper-plane"
                color='white'
                style={styles.buttonicon}
                size={20}
              />
            }
            title="Envoyer"
            type="solid"
            onPress={() => {
              navigation.navigate('TemoignagesScreen', { content: postText, location: 'St-Prex', datetime: '2020-09-16'});
            }}
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
    margin: 20
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