import { useQuery } from "@tanstack/react-query";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ActivityIndicator,
  TextInput,
  Pressable,
  FlatList,
  Switch,
} from "react-native";
import { Pokemon } from "./pokemon";
import { useState } from "react";
import { LocationAreaEncounters } from "./locationEncounters";
import Ionicons from "@expo/vector-icons/Ionicons";
import MySafeAreaView from "./MySafeAreaView";
import { RectButton, Swipeable } from "react-native-gesture-handler";

function generateRandomPokemon() {
  const min = 1;
  const max = 898;
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
}

export default function Page() {
  const [randomId, setRandomId] = useState(generateRandomPokemon());
  const [searchInput, setSearchInput] = useState("");
  const [starSelected, setStarSelected] = useState(false);
  const [favorites, setFavorites] = useState<Pokemon[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [shinyPokemon, setShinyPokemon] = useState<String[]>([]);

  const {
    data: dataPokemon,
    isLoading: isLoadingPokemon,
    error: errorPokemon,
  } = useQuery({
    queryKey: ["pokemon", "type", randomId],
    queryFn: () => {
      setSearchInput("");
      return fetch(
        `https://pokeapi.co/api/v2/pokemon/${
          searchInput.toLowerCase() || randomId
        }/`
      ).then((res) => res.json());
    },
  });

  const {
    data: LocationEncounters,
    isLoading: isLoadingLocationEncounters,
    error: errorLocationEncounters,
  } = useQuery({
    queryKey: ["pokemon", "encounters", randomId],
    queryFn: () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}/encounters`).then(
        (res) => res.json()
      ),
  });

  if (isLoadingPokemon || isLoadingLocationEncounters) {
    return <ActivityIndicator style={styles.container} size="large" />;
  }

  if (errorPokemon || errorLocationEncounters) {
    return (
      <View style={styles.container}>
        <Text style={styles.textContainer}>
          no pokemon found, please try again
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Whitch Pokemon?"
          keyboardType="numeric"
          onChangeText={(text) => setSearchInput(text)}
          value={searchInput}
        />
        <Button
          title="Search again"
          onPress={() => {
            setRandomId(generateRandomPokemon()); // Genereer een nieuwe randomId wanneer de knop wordt ingedrukt
          }}
        />
      </View>
    );
  }

  const pokemon = dataPokemon as Pokemon;
  const locationEncounters = LocationEncounters as LocationAreaEncounters;

  const renderRightActions = (name: string) => {
    return (
      <RectButton
        style={styles.favoriteCardsDelete}
        onPress={() => {
          setFavorites(favorites.filter((pokemon) => pokemon.name !== name));
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Delete</Text>
      </RectButton>
    );
  };

  return (
    <MySafeAreaView style={styles.fullscreen}>
      <View style={styles.container}>
        {isEnabled ? (
          <Image
            style={styles.image}
            source={{ uri: pokemon.sprites.front_shiny }}
          />
        ) : (
          <Image
            style={styles.image}
            source={{ uri: pokemon.sprites.front_default }}
          />
        )}
        <Switch
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            toggleSwitch();
            if (isEnabled) {
              setShinyPokemon(
                shinyPokemon.filter((name) => name !== pokemon.name)
              );
            } else {
              setShinyPokemon([...shinyPokemon, pokemon.name]);
            }
          }}
          value={isEnabled}
        />

        <View style={styles.nameType}>
          <Text style={styles.textContainer}>{pokemon.name}</Text>
          <Text style={styles.textContainer}>{pokemon.types[0].type.name}</Text>
        </View>
        <View>
          <Text style={styles.textContainer}>
            {locationEncounters[0]?.location_area?.name}
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Whitch Pokemon?"
          onChangeText={(text) => setSearchInput(text)}
          value={searchInput}
        />
        <Button
          title="Generate"
          onPress={() => {
            const RandomId = generateRandomPokemon();
            setIsEnabled(false);
            setRandomId(RandomId);
            setStarSelected(false);
          }}
        />
        <Pressable
          onPress={() => {
            console.log("pressed");
            setStarSelected(!starSelected);
            if (starSelected)
              setFavorites(favorites.filter((pokemon) => pokemon.name));
            else {
              if (!favorites.some((favorite) => favorite.name === pokemon.name))
                setFavorites([...favorites, pokemon]);
            }
          }}
        >
          <Ionicons
            name={starSelected ? "star" : "star-outline"}
            size={24}
            color="black"
          />
        </Pressable>

        <FlatList
          style={styles.favoriteList}
          data={favorites}
          keyExtractor={(pokemon) => pokemon.name}
          renderItem={({ item: pokemon }) => (
            <Swipeable
              renderRightActions={() => renderRightActions(pokemon.name)}
            >
              <View style={styles.favoriteCards}>
                <Image
                  source={{
                    uri: shinyPokemon.includes(pokemon.name) ? pokemon.sprites.front_shiny : pokemon.sprites.front_default,
                  }}
                  style={{ width: 60, height: 60 }}
                />
                <Text>{pokemon.name}</Text>
                <Text>{pokemon.id}</Text>
              </View>
            </Swipeable>
          )}
        />
      </View>
    </MySafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    marginTop: 50,
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  nameType: {
    flexDirection: "row",
  },
  textContainer: {
    margin: 5,
  },
  description: {},
  input: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  favoriteList: {
    width: "100%",
    marginBottom: 70,
    padding: 10,
  },
  favoriteCardsDelete: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    padding: 10,
    backgroundColor: "red",
  },
  favoriteCards: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "#fff",
  },
});
