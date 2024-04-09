import {
  Modal,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Touchable,
  TouchableOpacity,
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



  function adicionarProduto() {
    setVisible(!visible)
  }

  return (
    <SafeAreaView>
      <ScrollView>

        <View>
          <SelectList
            setSelected={(nome) => setSelecionar(nome)}
            data={produto}
            save="value"
            onSelect={() => adicionarProduto()}
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
                  <Text>Modal Aerto</Text>
                  <TouchableOpacity onPress={() => adicionarProduto()}>
                    <Text>Fechar</Text>
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
    margin:50,
  },
})