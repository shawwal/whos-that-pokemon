import * as React from 'react';
import { StyleSheet, Image } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import '@expo/match-media';
import { useMediaQuery } from "react-responsive";

export default function TabOneScreen() {

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })

  const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)'
  })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })


  return (
    <View style={styles.container}>
      <Image style={{width: 200, height: 300, resizeMode: 'contain'}} source={require('./../assets/images/whosthatpokemon.png')}/>
      <Text style={styles.title}>Tab One</Text>
      <Text style={styles.title}>{isTablet ? 'Hi Tablet User' : 'Hi Phone User'}</Text>
      <Text>Device Test!</Text>
      {isDesktopOrLaptop && <>
        <Text>You are a desktop or laptop</Text>
        {isBigScreen && <Text>You also have a huge screen</Text>}
        {isTabletOrMobile && <Text>You are sized like a tablet or mobile phone though</Text>}
      </>}
      {isTabletOrMobileDevice && <Text>You are a tablet or mobile phone</Text>}
      <Text>Your are in {isPortrait ? 'portrait' : 'landscape'} orientation</Text>
      {isRetina && <Text>You are retina</Text>}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
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
