import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';


export default function TemoignageViewScreen({ route, navigation}) {
    const { id } = route.params;
    const { content } = route.params;
    const { location } = route.params;
    const { datetime } = route.params;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{JSON.stringify(content)}</Text>
        <Text style={styles.title}>{JSON.stringify(location)}</Text>
        <Text style={styles.title}>{JSON.stringify(datetime)}</Text>
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
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