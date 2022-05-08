import { StyleSheet, TextInput, FlatList, TouchableOpacity, ActivityIndicator, Image, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps, Card } from '../types';
import PopCard from '../components/PopCard'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [search, onChangeSearch] = useState<string>('')
  const [data, setData] = useState<Card[]>([])


  const fetchPopInfo = () => {
    fetch(`https://api.scryfall.com/cards/search?order=cmc&q=${search}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    }).then((response) => response.json())
      .then((json) => {
        setData(json.data)
      })
      .catch((error) => (error))

  };

  const scrollY = useRef(new Animated.Value(0)).current;
  const ITEM_SIZE = 300 + 25 * 3
  return (
    <View style={styles.container}>
      {data.length === 0 ? (<ActivityIndicator />)
        : (<FlatList
          data={data}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            padding: 25
          }}
          renderItem={({ item, index }) => {
            return (
              <View>
                <Text>{item.name}</Text>
                <Image style={styles.imageField} source={{
                  uri: item.image_uris === undefined ? 'http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/62eeb29ff34ccea.png' : item.image_uris.art_crop
                }} />
              </View>
            )
          }}
        />)}


      <Text style={styles.title}>Search</Text>
      <TextInput onChangeText={text => onChangeSearch(text)} value={search} style={styles.inputField} placeholder="swag money ballin"></TextInput>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <TouchableOpacity onPress={fetchPopInfo}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  imageField: {
    height: 200,
    resizeMode: 'contain'
  },
  inputField: {
    color: 'white',
    borderWidth: 2,
    height: 30,
    borderColor: "#FFFFFF",
  },
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
