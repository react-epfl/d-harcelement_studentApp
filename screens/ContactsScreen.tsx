import * as React from 'react';
import { StyleSheet, FlatList, RefreshControl, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useState } from 'react';
import { Text, View } from '../components/Themed';
import {Linking} from 'react-native'
import { format } from 'react-string-format';

export default function ContactsScreen({navigation, route }) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const url = "https://borden.ch/contacts.json";

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
  };

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
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
    key = {item.id.toString()}
    onPress={ () => {
      Linking.openURL(format('tel:{0}', item.phone_number))
    }}
    >
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Image style={styles.photo} source={{ uri: item.image }}/>
        </View>

        <View style={{flex: 4}}>
          <Text numberOfLines={1} style={styles.number}>{ item.phone_number }</Text>
          <Text numberOfLines={2} style={styles.name}>{ item.name }</Text>
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
  number: {
    fontSize: 24,
    flex: 1,
    marginLeft: 5,
    marginTop: 5
  },
  name: {
    fontSize: 14,
    flex: 1,
    marginLeft: 5,
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 10
  },
  flatlist: {
    width: '100%',
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
});
