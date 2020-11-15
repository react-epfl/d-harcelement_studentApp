import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, FlatList, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';

import { Text, View } from '../components/Themed';

export default function TemoignagesScreen({ navigation, route }) {

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const url = "https://borden.ch/temoignages.json"; 

  React.useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const refreshList = () => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    
  }

  const itemVoted = (id:number) => {
    console.info('POST TO SERVER item id: ' + id);
    console.info('fetch new data')
    refreshList();
  }

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#AAA",
        }}
      />
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      key={item.id.toString()}
      onPress={() => navigation.push('TemoignageViewScreen', {
        id: item.id,
        content: item.content,
        location: item.location,
        datetime: item.datetime,
      })}
      >
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 6, flexDirection: 'column'}}>
          <Text numberOfLines={1} style={styles.listitemcontent}>{item.content}</Text>
          <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.listitemlocation}>{item.location}</Text>
            <Text style={styles.listitemdatetime}>{item.datetime}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          style={styles.flatlist}
          data={data}
          ItemSeparatorComponent = { FlatListItemSeparator }
          keyExtractor={item => item.id.toString()}
          renderItem={ renderItem }
          refreshControl={
            <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={isLoading}
              onRefresh={refreshList}
            />
          }
        />
      )}
    </View>
  );
}

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
    flex: 1,
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
