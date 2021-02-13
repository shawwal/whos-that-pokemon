import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import WhosThatPokemonScreen from '../screens/WhosThatPokemonScreen';
import AboutScreen from '../screens/AboutScreen';
import PokemonListScreen from '../screens/PokemonListScreen';
import PokemonDetailsScreen from '../screens/PokemonDetailsScreen';
import CustomTabBar from './CustomTabBar';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, PokemonParamList } from '../types';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="PokéDex"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        style: {
          backgroundColor: 'transparent',
          elevation: 0,
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <BottomTab.Screen
        name="PokéDex"
        component={PokemonListNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-list" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="PokéQuiz"
        component={WhosThatNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-star" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="About"
        component={AboutNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-information-circle" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const PokemonListStack = createStackNavigator<PokemonParamList>();

function PokemonListNavigator() {
  const colorScheme = useColorScheme();
  // const headerHeight = useHeaderHeight();
  return (
    <PokemonListStack.Navigator
    // mode="modal"
    >
      <PokemonListStack.Screen
        name="PokemonListScreen"
        component={PokemonListScreen}
        options={{
          headerTitle: 'PokéDex',
          headerTransparent: false,
          headerBackground: () => (
            <BlurView tint={colorScheme} intensity={100} style={StyleSheet.absoluteFill} />
          ),
        }}
      />
      <PokemonListStack.Screen
        name="PokemonDetailsScreen"
        component={PokemonDetailsScreen}
        options={{ headerShown: false }}
      // options={{ headerTitle: 'Pokémon Details', headerBackTitleVisible: false, }}
      />
    </PokemonListStack.Navigator>
  );
}


const TabOneStack = createStackNavigator<TabOneParamList>();

function WhosThatNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="WhosThatPokemonScreen"
        component={WhosThatPokemonScreen}
        options={{ headerShown: false }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function AboutNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{ headerTitle: 'About This App' }}
      />
    </TabTwoStack.Navigator>
  );
}
