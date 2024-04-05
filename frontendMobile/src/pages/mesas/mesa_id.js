import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Modal,
  Button,
  ScrollView,
} from "react-native";

import { SearchBar, ListItem } from 'react-native-elements'

import { useEffect, useState } from "react";
import { useNavigation, route } from "@react-navigation/native";

import apiLocal from "../../api/apiLocal";
import AsyncStorage from "@react-native-async-storage/async-storage";

console.disableYellowBox = true

export default function IdMesas({ navigation, route }) {
  const [produto, setProduto] = useState([""])

  useEffect(() => {
    async function verificaToken() {
      const iToken = await AsyncStorage.getItem("@token");
      const token = JSON.parse(iToken);

      const resposta = await apiLocal.get("/ListarProduto/files", {
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
      });
      setProduto(resposta.data);
      if (!resposta.data) {
        navigation.navigate("inicial");
        return;
      }
    }
    verificaToken();
  }, []);

  //https://www.geeksforgeeks.org/how-to-add-searchbar-in-react-native/
  //
  //
  //
  //
  //

  const styles = StyleSheet.create({
    container: {
      marginTop: 30,
      padding: 2,
    },
    item: {
      backgroundColor: "#f5f520",
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
  })
}