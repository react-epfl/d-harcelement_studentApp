import * as React from 'react';
import { StyleSheet, FlatList, TouchableHighlight } from 'react-native';
import Colors from '../constants/Colors';

import { Text, View } from '../components/Themed';

export default function TemoignagesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={EXAMPLE_DATA}
        renderItem={({ item }) => (
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={styles.listitemcontent}>{item.content}</Text>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.listitemlocation}>{item.location}</Text>
              <Text style={styles.listitemdatetime}>{item.datetime}</Text>
            </View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          </View>
        )}
      />
    </View>
  );
}

let EXAMPLE_DATA = [
    {
      id: 0,
      content: "L'intimidation fait beaucoup de mal",
      location: "Préverenges",
      datetime: "2020-09-10",
    },
    {
      id: 1,
      content: "L'intimidation n'est pas une blague",
      location: "Renens",
      datetime: "2020-08-21",
    },
    {
      id: 2,
      content: "L'intimidation fait beaucoup de mal",
      location: "Lausanne",
      datetime: "2020-09-05",
    },
    {
      id: 3,
      content: "L'intimidation fait beaucoup de mal",
      location: "Préverenges",
      datetime: "2020-08-09",
    },
  ];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listitemcontent: {
    padding: 0,
    fontSize: 18,
  },
  listitemlocation: {
    padding: 0,
    color: Colors.fadedcolor,
  },
  listitemdatetime: {
    padding: 0,
    color: Colors.fadedcolor,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '100%',
  },
});
