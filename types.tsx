import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  PokéDex: undefined;
  PokéQuiz: undefined;
  About: undefined;
};

export type PokemonParamList = {
  PokemonListScreen: undefined;
  PokemonDetailsScreen: undefined;
};

export type TabOneParamList = {
  WhosThatPokemonScreen: undefined;
};

export type TabTwoParamList = {
  AboutScreen: undefined;
};

export type PokemonTabProps<T extends keyof PokemonParamList> = {
  navigation: StackNavigationProp<PokemonParamList, T>;
  route: RouteProp<PokemonParamList, T>;
};
