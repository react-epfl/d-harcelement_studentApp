import { preventAutoHide } from 'expo-splash-screen';
import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/Colors';
import { withNavigation } from 'react-navigation';
import { Text, View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';

export default function TemoignageCreateScreen() {

  const navigation = useNavigation();


  const ContentTextInput = () => {
    const [value, onChangeText] = React.useState('Décrivez votre témoignage');

    return (
      <TextInput
        style={{ backgroundColor: '#EEE', width: '90%' , height: '100%'}}
        editable
        multiline
        onChangeText={text => onChangeText(text)}
        value={value}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Créer un nouveau témoignage</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <ContentTextInput></ContentTextInput>
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
          onPress={() => navigation.goBack() }
        />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
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