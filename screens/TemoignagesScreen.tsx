import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

import { Text, View } from '../components/Themed';

export default function TemoignagesScreen({ navigation }) {

  //create state variable
  const [tdata, setTdata] = useState(EXAMPLE_DATA);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        data={tdata}
        renderItem={({ item }) => (
          <TouchableOpacity 
            key={item.id}
            onPress={() => navigation.push('TemoignageViewScreen', {
              id: item.id,
              content: item.content,
              location: item.location,
              datetime: item.datetime,
            })}
            >
            <View style={{flex: 1, flexDirection: 'column'}}>
              <Text style={styles.listitemcontent}>{item.content}</Text>
              <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.listitemlocation}>{item.location}</Text>
                <Text style={styles.listitemdatetime}>{item.datetime}</Text>
              </View>
              <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            </View>
          </TouchableOpacity>
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
  flatlist: {
    width: '100%',
  },
  listitemcontent: {
    padding: 10,
    fontSize: 18,
  },
  listitemlocation: {
    padding: 10,
    color: Colors.fadedcolor,
  },
  listitemdatetime: {
    padding: 10,
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
