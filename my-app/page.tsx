import { useQuery } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { Pokemon } from "./pokemon";

export default function Page() {
  const { data: dataPokemon } = useQuery({
    queryKey: ["pokemon", "ditto"],
    queryFn: () =>
      fetch("https://pokeapi.co/api/v2/pokemon/ditto").then((res) =>
        res.json()
      ),
  });

  const { data: dataCharacteristics } = useQuery({
    queryKey: ["Characteristic", "ditto"],
    queryFn: () =>
      fetch("https://pokeapi.co/api/v2/characteristic/{id}/").then((res) =>
        res.json()
      ),
  });

  const pokemon = dataPokemon as Pokemon;
  //   const characteristics = dataCharacteristics as Pokemon;
  
  console.log(dataCharacteristics);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: pokemon.sprites.front_default }}
      />
      <View style={styles.nameType}>
        <Text style={styles.textContainer}>{pokemon.name}</Text>
        <Text style={styles.textContainer}>{pokemon.moves[0].move.name}</Text>
      </View>
      <View style={styles.description}>
        <Text style={styles.textContainer}>{pokemon.name}</Text>
      </View>
      <Button title="Generate"></Button>
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
});
