import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, FlatList, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';

import { Text, View } from '../components/Themed';

export default function TemoignagesScreen({ navigation, route }) {

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  //Need those two lines for testing puposes as my server doesn't allow cors
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = "https://borden.ch/temoignages.json"; // site that doesn’t send Access-Control-*
  React.useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const refreshList = () => {
    setData([]);
    
  }

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          style={styles.flatlist}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity 
              key={item.id.toString()}
              onPress={() => navigation.push('TemoignageViewScreen', {
                id: item.id,
                content: item.content,
                location: item.location,
                datetime: item.datetime,
              })}
              >
              <View style={{flex: 1, flexDirection: 'column'}}>
                <Text numberOfLines={1} style={styles.listitemcontent}>{item.content}</Text>
                <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={styles.listitemlocation}>{item.location}</Text>
                  <Text style={styles.listitemdatetime}>{item.datetime}</Text>
                </View>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
              </View>
            </TouchableOpacity>
          )}
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
