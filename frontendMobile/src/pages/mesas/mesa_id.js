import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";

//import { useEffect, useState } from "react";
//import { useNavigation, route } from "@react-navigation/native";

//import apiLocal from "../../api/apiLocal";
//import AsyncStorage from "@react-native-async-storage/async-storage";

export default function IDmesas({ navigation, route }) {

  // const navigation = useNavigation();
  // const [mesa, setMesa] = useState([""]);

  // useEffect(() => {
  //   async function listarMesaUnica() {
  //     const iToken = await AsyncStorage.getItem("@token");
  //     const token = JSON.parse(iToken);

  //     const resposta = await apiLocal.get(`/ListarMesaUnica/${id}`, {
  //       headers: {
  //         Authorization: "Bearer " + `${token}`,
  //       },
  //     });
  //     setMesa(resposta.data);

  //     if (!resposta.data) {
  //       navigation.navigate("inicial");
  //       return;
  //     }
  //   }
  //   listarMesaUnica();
  // }, []);

  function voltarTela() {
    navigation.navigate("mesas");
  }

  return (
    <SafeAreaView>
      <View>
        <Text>Esta é a Mesa: {route.params.mesaId}</Text>
      </View>
      <View>
        <TouchableOpacity>
          <Text onPress={voltarTela}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "beige",
  },
});
