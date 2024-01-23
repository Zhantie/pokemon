import { useQuery } from "@tanstack/react-query";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { Pokemon } from "./pokemon";
import { useState } from "react";
import { Description } from "./characteristic";

function generateRandomPokemon() {
  const min = 1;
  const max = 898;
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
}

export default function Page() {
  const [randomId, setRandomId] = useState(generateRandomPokemon());
  const [searchInput, setSearchInput] = useState("");

  const {
    data: dataPokemon,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pokemon", "type", randomId],
    queryFn: () =>
      fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchInput || randomId}/`
      ).then((res) => res.json()),
  });

  const {
    data: dataCharacteristic,
  } = useQuery({
    queryKey: ["pokemon", "type", randomId],
    queryFn: () =>
      fetch(
        `https://pokeapi.co/api/v2/characteristic/${randomId}/`
      ).then((res) => res.json()),
  });

  if (isLoading) {
    return <ActivityIndicator style={styles.container} size="large" />;
  }

  if (error) {
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
  const characteristic = dataCharacteristic as Description;

  console.log(characteristic);
  
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: pokemon.sprites.front_default }}
      />
      <View style={styles.nameType}>
        <Text style={styles.textContainer}>{pokemon.name}</Text>
        <Text style={styles.textContainer}>{pokemon.types[0].type.name}</Text>
      </View>
      <View>
        <Text style={styles.textContainer}>{characteristic.description}</Text>
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
          setRandomId(RandomId);
        }}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
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
});
