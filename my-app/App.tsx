import { StyleSheet } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Page from "./page";
import MySafeAreaView from "./MySafeAreaView";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();

export default function App() {
  // axios.get('https://pokeapi.co/api/v2/pokemon/ditto')
  // .then((response) => {
  //   console.log(response);
  // })
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <MySafeAreaView edges={["top"]} style={styles.fullScreen}>
          <Page />
        </MySafeAreaView>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    height: "100%",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
