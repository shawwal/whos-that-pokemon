import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Asset } from 'expo-asset';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        Asset.loadAsync([
          require('./../assets/images/types/bug.png'),
          require('./../assets/images/types/dark.png'),
          require('./../assets/images/types/dragon.png'),
          require('./../assets/images/types/electric.png'),
          require('./../assets/images/types/fairy.png'),
          require('./../assets/images/types/fighting.png'),
          require('./../assets/images/types/fire.png'),
          require('./../assets/images/types/flying.png'),
          require('./../assets/images/types/ghost.png'),
          require('./../assets/images/types/grass.png'),
          require('./../assets/images/types/ground.png'),
          require('./../assets/images/types/ice.png'),
          require('./../assets/images/types/normal.png'),
          require('./../assets/images/types/poison.png'),
          require('./../assets/images/types/psychic.png'),
          require('./../assets/images/types/rock.png'),
          require('./../assets/images/types/steel.png'),
          require('./../assets/images/types/water.png')
        ]),
          // Load fonts
          await Font.loadAsync({
            ...Ionicons.font,
            'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
