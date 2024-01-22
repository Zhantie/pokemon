import { StyleSheet } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Page from "./page";

const queryClient = new QueryClient();

export default function App() {
  // axios.get('https://pokeapi.co/api/v2/pokemon/ditto')
  // .then((response) => {
  //   console.log(response);
  // })
  return (
    <QueryClientProvider client={queryClient}>
      <Page />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
