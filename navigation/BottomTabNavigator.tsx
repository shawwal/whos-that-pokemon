import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import PokemonListScreen from '../screens/PokemonListScreen';
import PokemonDetailsScreen from '../screens/PokemonDetailsScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, PokemonParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="PokéDex"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="PokéDex"
        component={PokemonListNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-book" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
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
  return (
    <PokemonListStack.Navigator
      // mode="modal"
    >
      <PokemonListStack.Screen
        name="PokemonListScreen"
        component={PokemonListScreen}
        options={{ headerTitle: 'Pokémon List' }}
      />
      <PokemonListStack.Screen
        name="PokemonDetailsScreen"
        component={PokemonDetailsScreen}
        options={{ headerShown: false}}
        // options={{ headerTitle: 'Pokémon Details', headerBackTitleVisible: false, }}
      />
    </PokemonListStack.Navigator>
  );
}


const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: 'Tab One Title' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );
}
