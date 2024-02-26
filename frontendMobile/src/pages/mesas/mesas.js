import { useNavigation, useRoute } from "@react-navigation/native";
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

console.disableYellowBox = true;

export default function Mesas() {
  const navigation = useNavigation();

  const [mesa, setMesa] = useState([""]);
  const [id, setId] = useState("");
  const [respNome, setRespNome] = useState("");
  const [respToken, setRespToken] = useState("");

  useEffect(() => {
    async function handleAsyncNome() {
      const iNome = JSON.parse("@nome");
      const nNome = JSON.parse(iNome);
      setRespToken("");
      setRespNome(nNome);
    }

    async function handleAsyncToken() {
      const iToken = await AsyncStorage.getItem("@token");
      const token = JSON.parse(iToken);
      setRespNome("");
      setRespToken(token);
    }

    async function loadID() {
      const iID = await AsyncStorage.getItem("@id_atendente");
      const id = JSON.parse(iID);
    }

    async function verificaToken() {
      const iToken = await AsyncStorage.getItem("@token");
      const token = JSON.parse(iToken);

      const resposta = await apiLocal.get("/ListarMesas", {
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
      });
      setMesa(resposta.data);
      if (!resposta.data) {
        navigation.navigate("inicial");
        return;
      }
    }
    verificaToken();
  }, [mesa]);

  // FAZER LOGOFF
  function Logoff() {
    AsyncStorage.removeItem("@token");
    navigation.navigate("inicial");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.mesaContainer2}>
        {mesa.map((lista) => {
          return (
            <View>
              {lista.length !== 0 && (
                <>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("mesa_id", {
                        mesaId: `${lista.numero_mesa}`,
                      })
                    }
                  >
                    <Image
                      source={require("../../../images/mesa.png")}
                      style={styles.mesa}
                    />
                    <Text style={styles.textoMesa}>{lista.numero_mesa}</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          );
        })}
      </View>

      <TouchableOpacity onLongPress={Logoff} style={styles.footer}>
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
    flexDirection: "column",
    gap: 25,
    marginTop: 30,
  },
  mesaContainer2: {
    flex: 2,
    alignItems: "center",
    flexDirection: "row",
    gap: 30,
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
    marginLeft: 20,
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
