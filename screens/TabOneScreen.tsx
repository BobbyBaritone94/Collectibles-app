import { StyleSheet, TextInput,FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import PopCard from '../components/PopCard'

const Card = (title:any)=>(
  <View>
    <Text>{title}</Text>
  </View>
)

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [search,onChangeSearch]= useState('')
  const [data,setData]= useState([])
  

  const fetchPopInfo=()=> {
    fetch(`https://api.scryfall.com/cards/search?order=cmc&q=${search}`,{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    }).then((response)=>response.json())
    .then((json)=>{
      setData(json.data)
      console.log(json.data)
    })
    .catch((error)=>(error))   
    
  };


  const renderItem=(item:any)=>(
    <Card title={item.name}/>
  )

  return (
    <View style={styles.container}>
      {data.length===0?(<ActivityIndicator/>)
      : (<FlatList
        data={data}
        keyExtractor= {({id},index)=> id}
        renderItem={({item})=>{
          return(
            <View>
              <Text>{item.name}</Text>
              {item.image_uris ? 
              (<Image style={styles.imageField} source={{
                uri: item.image_uris.normal 
                }}/>):
                (<Image style={styles.imageField} source={{
                  uri:'http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/62eeb29ff34ccea.png'
                  }}/>)
              }
              
            </View>
          )
        }}
        />)}
      

      <Text style={styles.title}>Search</Text>
      <TextInput onChangeText={text=>onChangeSearch(text)} value={search} style={styles.inputField} placeholder="swag money ballin"></TextInput>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
     
      <TouchableOpacity onPress={fetchPopInfo}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  imageField:{
    width:488,
    height:680
  },
  inputField:{
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
