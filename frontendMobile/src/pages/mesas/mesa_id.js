import {
  Modal,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Touchable,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";

import { SelectList } from 'react-native-dropdown-select-list'
import { useEffect, useState } from "react";
import { useNavigation, route } from "@react-navigation/native";

import apiLocal from "../../api/apiLocal";
import AsyncStorage from "@react-native-async-storage/async-storage";

console.disableYellowBox = true

export default function IdMesas({ navigation, route }) {

  const [produto, setProduto] = useState([""])
  const [selecionar, setSelecionar] = useState("")
  const [visible, setVisible] = useState(false)

  const [quant, setQuant] = useState(1)

  useEffect(() => {
    async function verificaToken() {
      const iToken = await AsyncStorage.getItem("@token");
      const token = JSON.parse(iToken);

      const resposta = await apiLocal.get("/ListarProduto/files", {
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
      });

      let newArray = resposta.data.map((palmito) => {
        return { key: palmito.id, value: palmito.nome }
      })

      setProduto(newArray);

      if (!resposta.data) {
        navigation.navigate("inicial");
        return;
      }
    }
    verificaToken();
  }, []);


  function handleToggleModal() {
    setVisible(!visible)
  }

  function handleAdicionar() {
    setQuant(quant + 1)
  }

  function handleRetirar() {
    setQuant(quant - 1)
  }

  async function enviarPedido() {
    try {

      const idMesa = AsyncStorage.getItem("@idMesa")

      const resposta = await apiLocal.post("/CriarPedido", {
        produtoID: selecionar,
        mesaID: idMesa,
        quant: quant
      })
      console.log(resposta)

    } catch (err) {
      ToastAndroid(err.response.data.error)
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>

        <View>
          <SelectList
            setSelected={(nome) => setSelecionar(nome)}
            data={produto}
            save="key"
            onSelect={() => handleToggleModal()}
            label="Produtos"
            placeholder="Digite o nome do produto..."
            searchPlaceholder="Buscando..."
            notFoundText="Produto não cadastrado..."
          />

          <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
          >
            <SafeAreaView style={styles.modal}>
              <ScrollView>
                <View>
                  <Text>{selecionar}</Text>
                  <TouchableOpacity onPress={() => handleToggleModal()}>
                    <Text>Fechar</Text>
                  </TouchableOpacity>

                  <Text>Quantidade: {quant}</Text>
                  <TouchableOpacity onPress={handleAdicionar}>
                    <Text>Adicionar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleRetirar}>
                    <Text>Retirar</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </SafeAreaView>
          </Modal>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

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
  modal: {
    flex: 1,
    textAlignVertical: "center",
    backgroundColor: "bisque",
    margin: 50,
  },
})