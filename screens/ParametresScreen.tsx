import * as React from 'react';
import { StyleSheet, Switch, Button, Alert} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { SettingsScreen, SettingsData, Chevron  } from "react-native-settings-screen"

export default function ParametresScreen() {
  const data: SettingsData = [
    {
      type: 'SECTION',
      header: 'Paramètres principaux'.toUpperCase(),
      footer: 'd-harcelement-app - REACT Lab',
      rows: [
        {
          title: 'hello',
          showDisclosureIndicator: true
        },
        {
          title: 's',
          renderAccessory: () => <Switch value onValueChange={() => {}} />,
        },
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
