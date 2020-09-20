import { preventAutoHide } from 'expo-splash-screen';
import * as React from 'react';
import { StyleSheet, TextInput, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/Colors';
import { Text, View } from '../../components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function TemoignageViewScreen({ route, navigation}) {
  const { id } = route.params;
  const { content } = route.params;
  const { location } = route.params;
  const { datetime } = route.params;

  return (
    <SafeAreaView style={styles.maincontainer}>
      <ScrollView style={styles.scrollview} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <TextInput
            style={{width: '90%' , height: '100%'}}
            editable={false}
            multiline
            value={content}
          />
        </View>

        <View style={styles.horizontalcontainer}>

          <Button
            style={styles.button}
            title="OK"
            type="solid"
            onPress={() => navigation.goBack() }
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