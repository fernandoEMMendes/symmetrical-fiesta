import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import Rotas from "./src/pages/rotas/routes";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='black' barStyle='light-content' translucent={false} />
      <Rotas />
    </NavigationContainer>
  );
}
