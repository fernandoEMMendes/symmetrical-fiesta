//****NÃO APAGAR. USAR ESTE COMO MODELO!!!!!!*********************************

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiLocal from "../../api/apiLocal";
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
import { useEffect, useState } from "react";

export default function Mesas() {
  const navigation = useNavigation();
  const [mesa, setMesa] = useState([""]);
  //MOSTRAR MESAS

  useEffect(() => {
    async function loadMesas() {
      const token = await AsyncStorage.setItem("@token",
      JSON.stringify(resposta.data.token)
      );
      const resposta = await apiLocal.get("/ListarMesas", {
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
      });
      console.log(resposta);
      setMesa(resposta.data);
    }
    loadMesas();
  }, []);

  // SELECIONAR A MESA E FAZER PEDIDO PARA A MESMA
  function irProdutos() {
    navigation.navigate("produtos");
  }

  // FAZER LOGOFF
  function Logoff() {
    AsyncStorage.removeItem("@token");
    navigation.navigate("inicial");
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* AQUI VÃO AS IMAGENS DAS MESAS PARA PODER SER REDIRECIONADA PARA A RESPECTIVA MESA */}
      <View style={styles.mesaContainer}>
        <TouchableOpacity onPress={irProdutos}>
          <Image
            source={require("../../../images/mesa.png")}
            style={styles.mesa}
          />
          <Text style={styles.textoMesa}>MESA 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={irProdutos}>
          <Image
            source={require("../../../images/mesa.png")}
            style={styles.mesa}
          />
          <Text style={styles.textoMesa}>MESA 2</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={irProdutos}>
          <Image
            source={require("../../../images/mesa.png")}
            style={styles.mesa}
          />
          <Text style={styles.textoMesa}>MESA 3</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mesaContainer2}>
        <TouchableOpacity onPress={irProdutos}>
          <Image
            source={require("../../../images/mesa.png")}
            style={styles.mesa}
          />
          <Text style={styles.textoMesa}>MESA 4</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={irProdutos}>
          <Image
            source={require("../../../images/mesa.png")}
            style={styles.mesa}
          />
          <Text style={styles.textoMesa}>MESA 5</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={irProdutos}>
          <Image
            source={require("../../../images/mesa.png")}
            style={styles.mesa}
          />
          <Text style={styles.textoMesa}>MESA 6</Text>
        </TouchableOpacity>
      </View>
      {/* DESLOGAR DO APP */}
      <TouchableOpacity onPress={Logoff} style={styles.footer}>
        <Text style={styles.footerTexto}>ENCERRAR EXPEDIENTE</Text>
      </TouchableOpacity>
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
  mesaContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    gap: 55,
    marginTop: -85,
  },
  mesaContainer2: {
    flex: 2,
    alignItems: "center",
    flexDirection: "row",
    gap: 55,
    marginTop: -500,
  },
  mesa: {
    width: 50,
    height: 50,
  },
  textoMesa: {
    fontWeight: "bold",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    backgroundColor: "red",
    height: 70,
    width: 393,
    justifyContent: "center",
    alignItems: "center",
  },
  footerTexto: {
    fontWeight: "bold",
    fontSize: 23,
  },
});
