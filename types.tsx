import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  PokéDex: undefined;
  TabOne: undefined;
  TabTwo: undefined;
};

export type PokemonParamList = {
  PokemonListScreen: undefined;
  PokemonDetailsScreen: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type PokemonTabProps<T extends keyof PokemonParamList> = {
  navigation: StackNavigationProp<PokemonParamList, T>;
  route: RouteProp<PokemonParamList, T>;
};
