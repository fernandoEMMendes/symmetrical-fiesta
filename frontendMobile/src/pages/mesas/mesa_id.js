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

  const idMesa = AsyncStorage.getItem("@idMesa")
  console.log(idMesa)

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


  function handleToggleModalAbrir() {
    setVisible(true)

  }

  function handleToggleModalFechar() {
    setVisible(false)
    // FAZER RESETAR MODAL

  }

  function handleAdicionar() {
    setQuant(quant + 1)
  }

  function handleRetirar() {
    if (quant <= 1) {
      return
    }
    setQuant(quant - 1)
  }

  async function enviarPedido() {
    try {
      const resposta = await apiLocal.post("/CriarPedido", {
        produtoID: selecionar,
        mesaID: idMesa,
        quant: quant
      })
      console.log(resposta.data)

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <View>
          <Text style={styles.containerText}>Mesa {route.params.mesaId}</Text>
        </View>

        <View>
          <SelectList
            setSelected={(nome) => setSelecionar(nome)}
            data={produto}
            save="key"
            onSelect={() => handleToggleModalAbrir()}
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
                  <TouchableOpacity onPress={handleToggleModalFechar}>
                    <Text style={styles.modalFechar}>{"❌"}</Text>
                  </TouchableOpacity>

                  <View style={styles.modalBotoes}>
                    <TouchableOpacity onPress={handleRetirar}>
                      <Text style={styles.modalText}>{"➖"}</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalText}>{quant}</Text>
                    <TouchableOpacity onPress={handleAdicionar}>
                      <Text style={styles.modalText}>{"➕"}</Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity onPress={enviarPedido}>
                      <Text style={styles.modalAdd}>Adicionar</Text>
                    </TouchableOpacity>
                  </View>
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
    margin: 30
  },
  containerText: {
    fontSize: 50
  },
  modal: {
    flex: 1,
    textAlignVertical: "center",
    backgroundColor: "bisque",
    margin: 50,
    padding: 20,
    borderRadius: 50
  },
  modalText: {
    fontSize: 50,
    marginTop: 10,
    marginBottom: 25
  },
  modalFechar: {
    fontSize: 30,
    textAlign: "right"
  },
  modalBotoes: {
    flexDirection: 'row',
  },
  modalAdd: {
    fontSize: 50,
    marginTop: 300,
  }
})