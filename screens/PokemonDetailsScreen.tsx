import React, {useEffect, useState} from 'react';
import { StyleSheet, Image, Alert } from 'react-native';
import { Text, View } from '../components/Themed';
import axios from 'axios';
import { PokemonTabProps } from "./../types";

export default function PokemonDetailsScreen({ route }: PokemonTabProps<"PokemonDetailsScreen">) {
  const { endPoint, imgId } = route.params as any;
  const [ details, setDetail ] = useState({}) as any;
  const officalArtWork = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+ imgId +".png";
  const getPokemon = async () => {
    axios({
      url: endPoint,
      method: 'GET',
    }).then((response) => {
      if (response.status === 200) {
        setDetail(response.data)
      }
    }).catch((error) => {
      Alert.alert('Something went wrong', error);
    })
  }

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.pokemonImg}
        source={{ uri: officalArtWork }}
      />
      <Text style={styles.titleCase} ellipsizeMode='tail' numberOfLines={1}>{details.name}</Text>
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
  titleCase: {
    textTransform: 'capitalize'
  },
  pokemonImg: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    // borderWidth: 1,
    // borderColor: 'blue',
    // tintColor: 'red'
  },
});
