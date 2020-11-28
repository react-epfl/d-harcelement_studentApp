import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Switch, Button, Alert} from 'react-native';
import { AsyncStorage } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { SettingsScreen, SettingsData, Chevron  } from "react-native-settings-screen"
import DropDownPicker from 'react-native-dropdown-picker';

export default function ParametresScreen() {
  const _retrieveDataAvatar = async () => {
    try {
      const value = await AsyncStorage.getItem('avatar_id');
      console.debug(value)
      if (value !== null) {
        // We have data!!
        return value;
      }
    } catch (error) {
      console.error(error)
      return null
    }
    return null
  };

  const [value, setValue] = useState('usa');
  let get_av_id = _retrieveDataAvatar();
  if(get_av_id != null) {
    console.log(get_av_id)
    setValue(get_av_id);
  }
  console.debug(value)
  const _storeDataAvatar = async (id) => {
    setValue(id)
    try {
      await AsyncStorage.setItem(
        'avatar_id',
        id
      );
    } catch (error) {
      console.error(error)
    }
  };

  const avatarPicker = <DropDownPicker
    items={[
        {label: 'USA', value: 'usa'},
        {label: 'UK', value: 'uk'},
        {label: 'France', value: 'france'},
    ]}
    defaultValue={value}
    containerStyle={{height: 40, width: 200}}
    onChangeItem={item => _storeDataAvatar(item.value)}
    placeholder='Choisi un avatar'
    style={{backgroundColor: '#fafafa'}}
    itemStyle={{
        justifyContent: 'flex-start'
    }}
    dropDownStyle={{backgroundColor: '#fafafa'}}
  />

  const data: SettingsData = [
    {
      type: 'SECTION',
      header: 'Paramètres généraux'.toUpperCase(),
      footer: 'd-harcelement-app - REACT Lab',
      rows: [
        {
          title: 'Avatar',
          renderAccessory: () => avatarPicker,
        }
      ]
    },
    {
      type: 'SECTION',
      header: 'Gestion des données'.toUpperCase(),
      footer: 'd-harcelement-app - REACT Lab',
      rows: [
        {
          title: 'Supprimer les données',
          titleStyle: {
            color: 'red',
          },
          renderAccessory: () => <Button title='Supprimer' color='#F00' onPress={() => Alert.alert('Données supprimées')} />
        }
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <SettingsScreen data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
