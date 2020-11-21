import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { Text, View } from '../components/Themed';
import axios from 'axios';
import { PokemonTabProps } from "./../types";
import TypeColors from '../constants/TypeColors';

export default function PokemonDetailsScreen({ route }: PokemonTabProps<"PokemonDetailsScreen">) {
  const { endPoint, imgId } = route.params as any;
  const [details, setDetail] = useState([]) as any;
  const [species, setSpecies] = useState([]) as any;
  const officalArtWork = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + imgId + ".png";
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

  const speciesEndpoint = 'https://pokeapi.co/api/v2/pokemon-species/' + imgId;

  const getPokemonSpecies = async () => {
    axios({
      url: speciesEndpoint,
      method: 'GET',
    }).then((response) => {
      if (response.status === 200) {
        // console.log('check', JSON.stringify(response.data))
        setSpecies(response.data.flavor_text_entries);
        // console.log('check', species.flavor_text_entries[0])
      }
    }).catch((error) => {
      Alert.alert('Something went wrong', error);
    })
  }

  useEffect(() => {
    getPokemon();
    getPokemonSpecies();
  }, []);

  let desc = species[0]?.flavor_text;
  const newDesc = desc?.replace(/[\n\r\f]+/g, ' ');

  return (
    <View style={styles.container}>
      <Image
        defaultSource={require('./../assets/images/pokeball.png')}
        style={styles.pokemonImg}
        source={{ uri: officalArtWork }}
      />
      <Text style={styles.pokemonName} ellipsizeMode='tail' numberOfLines={1}>{details.name}</Text>
      <View style={styles.typeRow}>
        {details.types?.map((obj: any, index: string | number | undefined) => {
          return (
            <View key={index} style={{ ...styles.typeBorder, backgroundColor: TypeColors[obj.type.name], borderColor: TypeColors[obj.type.name] }}>
              <Text style={styles.typeText}>{obj.type.name}</Text>
            </View>
          )
        })}
      </View>
      {newDesc == undefined ? <ActivityIndicator /> : <Text style={styles.descText}>{String(newDesc)}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    // borderWidth: 1,
    // borderColor: 'blue',
    // tintColor: 'red'
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
  pokemonName: {
    textTransform: 'capitalize',
    fontSize: 27
  },
  typeText: {
    textTransform: 'capitalize',
  },
  typeRow: {
    flexDirection: 'row',
    marginBottom: 10
  },
  typeBorder: {
    borderWidth: 1,
    padding: 5,
    margin: 3,
    borderRadius: 10,
  },
  descText: {
    paddingHorizontal: 10,
    textAlign: 'center'
  },
  pokemonImg: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
});
