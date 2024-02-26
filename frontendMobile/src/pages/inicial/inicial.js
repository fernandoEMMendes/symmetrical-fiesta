import { useNavigation } from "@react-navigation/native";
import apiLocal from "../../api/apiLocal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import { useState } from "react";

export default function Inicial() {
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault(e);
    if (!nome || !password) {
      alert("Existem campos em branco!");
      return;
    }
    try {
      const resposta = await apiLocal.post("/LoginAtendentes", {
        nome,
        password,
      });
      await AsyncStorage.setItem(
        "@id_atendente",
        JSON.stringify(resposta.data.id)
      );
      await AsyncStorage.setItem("@nome", JSON.stringify(resposta.data.nome));
      await AsyncStorage.setItem("@token", JSON.stringify(resposta.data.token));

      navigation.navigate("mesas");
      alert("Login efetuado com sucesso!");
      //APÓS O LOGIN, O NOME E A SENHA FICAM EM BRANCO
      setNome("");
      setPassword("");
    } catch (err) {
      alert("Usuário / Senha incorretos");
    }
    Keyboard.dismiss();
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.containerLogin}>
        <Text style={styles.titulo}>LOGIN ATENDENTE</Text>

        <TextInput
          style={styles.inputLogin}
          placeholder="Digite seu usuário"
          value={nome}
          onChangeText={setNome}
          placeholderTextColor="whitesmoke"
          // value={}
          // onChangeText={}
        />
        <View style={{ marginTop: 10 }}>
          <TextInput
            style={styles.inputLogin}
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="whitesmoke"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.botaoEntrar}>
          <Text style={styles.textoEntrar} onPress={handleLogin}>
            Entrar
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFB26E",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 20,
  },
  containerLogin: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputLogin: {
    borderColor: "black",
    width: 220,
    height: 40,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    color: "black",
    textAlign: "center",
    fontSize: 18,
  },
  botaoEntrar: {
    marginTop: 20,
    width: 120,
  },

  textoEntrar: {
    fontWeight: "bold",
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 37,
    paddingVertical: 2,
  },
});
