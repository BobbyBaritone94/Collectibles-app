import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function PopCard() {
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    console.log(data);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/adhithiravi/React-Hooks-Examples/master/testAPI.json')
          .then((response) => response.json())
          .then((json) => setData(json))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
      }, []);


    return (
      <View>
        <View style={styles.getStartedContainer}>
            {/* Image here  */}
            {/* Text for the image */}
            {/* see more button */}
         
        </View>
        
      </View>
    );
  }
  
  const fetchPopInfo=()=> {
    fetch('https://api.scryfall.com/cards/search?order=cmc&q=c%3Ared+pow%3D3',{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    }).then((response)=>response.json())
    .catch((error)=>(error))
          
  };
  
  const styles = StyleSheet.create({
    getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 50,
    },
    homeScreenFilename: {
      marginVertical: 7,
    },
    codeHighlightContainer: {
      borderRadius: 3,
      paddingHorizontal: 4,
    },
    getStartedText: {
      fontSize: 17,
      lineHeight: 24,
      textAlign: 'center',
    },
    helpContainer: {
      marginTop: 15,
      marginHorizontal: 20,
      alignItems: 'center',
    },
    helpLink: {
      paddingVertical: 15,
    },
    helpLinkText: {
      textAlign: 'center',
    },
  });
  