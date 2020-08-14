import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { Text, View, FlatList } from '../components/Themed';
import axios from 'axios';
import { PokemonTabProps } from "./../types";

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);

export default function PokemonListScreen({ navigation }: PokemonTabProps<"PokemonListScreen">) {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextApi, setNextApi] = useState('');

  const getPokemon = async () => {
    const getPokemon = API_URL;
    axios({
      url: getPokemon,
      method: 'GET',
    }).then((response) => {
      if (response.status === 200) {
        setPokemonList(response.data.results);
        setNextApi(response.data.next);
      }
    }).catch((error) => {
      Alert.alert('Something went wrong', error);
    })
  }

  useEffect(() => {
    getPokemon();
  }, []);

  function handlePokemonDetails(link: any, id: any) {
    // @ts-ignore
    navigation.navigate('PokemonDetailsScreen', {
      endPoint: link,
      imgId: id,
    });
  }

  function handleNextPokemon() {
    axios({
      url: nextApi,
      method: 'GET',
    }).then((response) => {
      if (response.status === 200) {
        if (response.data.next != null) {
          const nextResult = [...pokemonList, ...response.data.results] as any;
          setPokemonList(nextResult);
          setNextApi(response.data.next);
        } else {
          Alert.alert('No more Pokemon available at the moment');
        }
      }
    }).catch((error) => {
      Alert.alert('Something went wrong', error);
    })
  }

  return (
    <View style={styles.container}>
      {pokemonList.length == 0 ? <Loading /> :
        <FlatList
          data={pokemonList}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleNextPokemon}
          onEndReachedThreshold={0.23}
          removeClippedSubviews={true}
          renderItem={({ item, index }) => {
            const urlString = String(item.url);
            const pokemonId = urlString.slice(-7).replace(/\D|\//g, "");
            const pokmeonImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemonId + '.png';
            // console.log('pokemon:id', pokemonId)
            return (
              <TouchableOpacity
                onPress={() => handlePokemonDetails(item.url, pokemonId)}
                style={styles.pokemonWrapper}
                key={index}
              >
                <Image
                  style={styles.pokemonImg}
                  source={{ uri: pokmeonImage }}
                />
                <Text style={styles.titleCase} ellipsizeMode='tail' numberOfLines={1}>{item.name}</Text>
              </TouchableOpacity>
            )
          }}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
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
  pokemonWrapper: {
    alignItems: 'center',
    margin: 7,
    width: 110,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  titleCase: {
    textTransform: 'capitalize'
  },
  pokemonImg: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    // borderWidth: 1,
    // borderColor: 'blue',
    // tintColor: 'red'
  },
});
