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

import {SearchBar, ListItem } from 'react-native-elements'

import { useEffect, useState } from "react";
import { useNavigation, route } from "@react-navigation/native";

import apiLocal from "../../api/apiLocal";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function IDmesas({ navigation, route }) {

  const [produto, setProduto] = useState([""]);

  //https://www.geeksforgeeks.org/how-to-add-searchbar-in-react-native/

const nome = produto.map((item) => item.nome)

funcaoProcurar = (text) => { 
  const updatedData = this.arrayholder.filter((item) => { 
    const item_data = `${item.nome.toUpperCase()})`; 
    const text_data = text.toUpperCase(); 
    return item_data.indexOf(text_data) > -1; 
  }); 
  this.setState({ data: updatedData, searchValue: text }); 
}; 


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

  // useEffect(() => {
  //   async function localizaProduto(){
  //     const iToken = await AsyncStorage.getItem('@token')
  //     const token = JSON.parse(iToken)
  //     const resposta = await apiLocal.get('')
  //   }
  // }, [])


  function voltarTela() {
    navigation.navigate("mesas");
  }
  
    return ( 
      <View style={styles.container}> 
        <SearchBar 
          placeholder="Search Here..."
          lightTheme 
          round 
          value={this.state.searchValue} 
          onChangeText={(text) => this.searchFunction(text)} 
          autoCorrect={false} 
        /> 
        <FlatList 
          data={this.state.data} 
          renderItem={renderItem} 
          keyExtractor={(item) => item.id} 
        /> 
      </View> 
    ); 
  } 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "beige",
  },
  container2: { 
    marginTop: 30, 
    padding: 2, 
    width: 250
  }, 
  item: { 
    backgroundColor: "#f5f520", 
    padding: 20, 
    marginVertical: 8, 
    marginHorizontal: 16, 
  }, 
  // titulo: {
  //   marginTop: -170,
  //   fontSize: 30,
  //   fontWeight: "bold",
  // },
  // buscar: {
  //   marginTop: -100,
  //   borderColor: "black",
  //   borderWidth: 1,
  //   borderRadius: 10,
  //   width: 300,
  //   paddingLeft: 10,
  //   paddingVertical: 5,
  //   fontWeight: "bold",
  //   fontSize: 16,
  // },
  // botaoVoltar: {
  //   borderColor: "black",
  //   backgroundColor: "red",
  //   borderRadius: 8,
  //   borderWidth: 2,
  //   padding: 10,
  //   width: 120,
  //   marginTop: 20,
  // },
  // textoVoltar: {
  //   fontWeight: "bold",
  //   color: "white",
  //   textAlign: "center",
  //   fontSize: 18,
  //   paddingVertical: 2,
  // },
});
