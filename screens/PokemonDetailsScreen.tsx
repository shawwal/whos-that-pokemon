import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Image, Alert, ActivityIndicator, SafeAreaView, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Text, View } from '../components/Themed';
import axios from 'axios';
import { PokemonTabProps } from "./../types";
import TypeColors from '../constants/TypeColors';
import PokemonTypes from '../components/PokemonTypes';
import Constants from 'expo-constants';

export default function PokemonDetailsScreen({ route }: PokemonTabProps<"PokemonDetailsScreen">) {
  const { endPoint, imgId } = route.params as any;
  const [details, setDetail] = useState([]) as any;
  const [species, setSpecies] = useState([]) as any;
  const [dominantType, setDominantType] = useState('');
  const [activeTabs, setActiveTabs] = useState(0) as any;
  const officalArtWork = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + imgId + ".png";

  const getPokemon = async () => {
    axios({
      url: endPoint,
      method: 'GET',
    }).then((response) => {
      if (response.status === 200) {
        setDetail(response.data);
        setDominantType(response.data.types[0].type.name);
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
        let englishFiltered = response.data.flavor_text_entries.filter((obj: any) => obj.language.name.includes('en'));
        setSpecies(englishFiltered);
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
  const TabArray = ['Stats', 'Evolution', 'Moves'];
  const StatsArray = ['hp', 'atk', 'satk', 'def', 'sdef', 'spd'];

  let animation = useRef(new Animated.Value(0));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={{ ...styles.imageBg, backgroundColor: TypeColors[dominantType] }} />
        <Image
          defaultSource={require('./../assets/images/pokeball.png')}
          style={styles.pokemonImg}
          source={{ uri: officalArtWork }}
        />
        <View style={styles.detailsBg}>
          <Text style={styles.pokemonName} ellipsizeMode='tail' numberOfLines={1}>{details.name}</Text>
          <View style={styles.typeRow}>
            {details.types?.map((obj: any, index: string | number | undefined) => {
              const pokeType = PokemonTypes[obj.type.name];
              return (
                <View key={index} style={{ ...styles.typeBorder, backgroundColor: TypeColors[obj.type.name], borderColor: TypeColors[obj.type.name] }}>
                  {/* @ts-ignore */}
                  <Image source={pokeType} />
                  <Text style={styles.typeText}>{obj.type.name}</Text>
                </View>
              )
            })}
          </View>
          {newDesc == undefined ? <ActivityIndicator /> : <Text style={styles.descText}>{String(newDesc)}</Text>}
          {details.height ?
            <View style={styles.bmi}>
              <Text>Height: {details.height / 10} m</Text>
              <Text>Weight: {details.weight / 10} kg</Text>
            </View>
            : null}
          {details.stats ?
            <View style={styles.tabContainer}>
              <View style={styles.tabRow}>
                {TabArray.map((obj: any, index: number) => {
                  const checkActiveTabs = activeTabs == index ? TypeColors[dominantType] : undefined;
                  const checkActiveText = activeTabs == index ? 'white' : TypeColors[dominantType];
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{ ...styles.tabs, backgroundColor: checkActiveTabs }}
                      onPress={() => setActiveTabs(index)}
                    >
                      <Text style={{ ...styles.tabText, color: checkActiveText }}>{obj}</Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
              {activeTabs == 0 ?
                <View>
                  {details.stats?.map((obj: any, index: number) => {

                    const range = obj.base_stat / 200 * 100;
                    let width = animation.current.interpolate({
                      inputRange: [0, 200],
                      outputRange: [`${range}%`, "100%"],
                      extrapolate: "clamp"
                    })

                    return (
                      <View style={styles.statsRow} key={index}>
                        <Text style={{ ...styles.statText, color: TypeColors[dominantType] }}>{StatsArray[index]}</Text>
                        <Text style={styles.statNumber}>{obj.base_stat}</Text>
                        <View style={{ ...styles.progressBar, borderColor: TypeColors[dominantType], }}>
                          <Animated.View style={{ backgroundColor: TypeColors[dominantType], width }} />
                        </View>
                      </View>
                    )
                  })}
                </View>
                : null}
            </View>
            : null}
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    alignItems: 'center',
  },
  bmi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  imageBg: {
    backgroundColor: 'red',
    width: '100%',
    height: 270,
    alignItems: 'center',
    marginBottom: -70,
    zIndex: 1,
  },
  detailsBg: {
    paddingTop: 70,
    width: '100%',
    flex: 1,
    borderTopRightRadius: 55,
    borderTopLeftRadius: 55,
    zIndex: 2,
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
    fontSize: 27,
    textAlign: 'center'
  },
  typeText: {
    textTransform: 'capitalize',
    paddingLeft: 7,
    fontSize: 17,
    color: 'white'
  },
  typeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  typeBorder: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
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
    zIndex: 3,
    top: 10,
    // top: Constants.statusBarHeight,
    position: 'absolute',
    resizeMode: 'contain',
  },
  tabContainer: {
    padding: 10
  },
  tabText: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: 15,
  },
  tabRow: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 11,

  },
  tabs: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    padding: 5,
    margin: 3,
    borderRadius: 10,
    width: '33%',
    justifyContent: 'center',
  },
  statsRow: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  statText: {
    fontSize: 15,
    width: 45,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  statNumber: {
    width: 35,
    fontSize: 15,
    display: 'flex',
    textAlign: 'right',
    paddingRight: 5
  },
  statWrapper: {
    display: 'flex',
    flex: 1,
  },
  progressBar: {
    flexDirection: 'row',
    height: 10,
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    display: 'flex',
    flex: 1,
    alignSelf: 'center',
  },
});