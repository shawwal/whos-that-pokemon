import * as React from 'react';
import { StyleSheet, Image, SafeAreaView } from 'react-native';
import useColorScheme from '../hooks/useColorScheme';

export default function WhosThatPokemon() {
  const theme = useColorScheme();
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.whosThat}
        source={require('./../assets/images/whosthatpokemon.png')}
      />
      <Image
        style={{...styles.pikachu, tintColor: theme == 'dark' ? 'white' : 'black'}}
        source={require('./../assets/images/pikachu.png')}
      />
      <Image
        style={styles.commingSoon}
        source={require('./../assets/images/comingsoon.png')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whosThat: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  pikachu: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
  },
  commingSoon: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  }
});
