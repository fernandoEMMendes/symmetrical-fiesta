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

import { SelectList } from "react-native-dropdown-select-list";
import { useEffect, useState } from "react";
import { useNavigation, route } from "@react-navigation/native";

import apiLocal from "../../api/apiLocal";
import AsyncStorage from "@react-native-async-storage/async-storage";

console.disableYellowBox = true;

export default function IdMesas({ navigation, route }) {
  const [visible, setVisible] = useState(false);

  const [produto, setProduto] = useState([""]);
  const [prodConsulta, setProdConsulta] = useState([""])

  const [prodNome, setProdNome] = useState("")
  const [prodDesc, setProdDesc] = useState("")
  const [prodPreco, setProdPreco] = useState(1)
  const [prodValTotal, setProdValTotal] = useState(1)
  const [quant, setQuant] = useState(1);

  const [selecionar, setSelecionar] = useState("");
  const idMesa = AsyncStorage.getItem("@idMesa");
  const [itensPedidoInicial, setItensPedidoInicial] = useState([""])
  const [itensPedido, setItensPedido] = useState([""]);

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function verificaToken() {
      const iToken = await AsyncStorage.getItem("@token");
      const token = JSON.parse(iToken);

      const resposta = await apiLocal.get("/ListarProduto/files", {
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
      });

      setProdConsulta(resposta.data)

      let newArray = resposta.data.map((palmito) => {
        return { key: palmito.id, value: palmito.nome };
      });

      setProduto(newArray);

      if (!resposta.data) {
        navigation.navigate("inicial");
        return;
      }
    }
    verificaToken();
  }, []);

  useEffect(() => {
    async function verificaToken() {
      const iToken = await AsyncStorage.getItem("@token");
      const token = JSON.parse(iToken);

      const resposta = await apiLocal.get("/ListarPedido", {
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
      });

      const mesaID = String(idMesa._j);

      const filtro = resposta.data.filter((palmito) => palmito.mesaID === mesaID)

      setItensPedidoInicial(filtro);

      setLoading(false)

      if (!resposta.data) {
        navigation.navigate("inicial");
        return;
      }
    }
    verificaToken()
  }, [])

  useEffect(() => {
    async function RecuperarDados() {
      const consultado = prodConsulta.filter((palmito) => palmito.id === selecionar)
      setProdNome(consultado[0].nome)
      setProdDesc(consultado[0].descricao)
      setProdPreco(consultado[0].preco)
      setProdValTotal(consultado[0].preco)
      setQuant(1)
    }
    RecuperarDados()
  }, [selecionar])

  useEffect(() => {
    async function calcularPreco() {
      setProdValTotal(prodPreco * quant)
    }
    calcularPreco()
  }, [quant])

  function handleToggleModalAbrir() {
    setVisible(true);
  }

  function handleToggleModalFechar() {
    setVisible(false);
  }

  function handleAdicionar() {
    setQuant(quant + 1);
  }

  function handleRetirar() {
    if (quant <= 1) {
      return;
    }
    setQuant(quant - 1);
  }

  async function enviarPedido() {
    const iToken = await AsyncStorage.getItem("@token");
    const token = JSON.parse(iToken);

    try {
      const mesaID = String(idMesa._j);

      const resposta = await apiLocal.post(
        "/CriarPedido",
        {
          produtoID: selecionar,
          mesaID: mesaID,
          quant: quant
        },
        {
          headers: {
            Authorization: "Bearer " + `${token}`,
          },
        }
      );

      let precoTotal = resposta.data.quant * resposta.data.produto.preco

      let array = {
        id: resposta.data.produto.id,
        nome: resposta.data.produto.nome,
        quant: resposta.data.quant,
        preco: precoTotal
      }

      setItensPedido(oldArray => [...oldArray, array]);

      setVisible(false);

    } catch (err) {
      alert(err.response.data.error);
    }
  }


  if (loading === true) {
    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            <Text>Carregando....</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>

          <View>
            <TouchableOpacity onPress={() => navigation.navigate("mesas")}>
              <Text style={[styles.modalFechar, { textAlign: "left" }]}>{"❌"}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.distancia} />

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

            <Modal visible={visible} animationType="fade" transparent={true}>
              <SafeAreaView style={styles.modal}>
                <ScrollView>
                  <View>
                    <TouchableOpacity onPress={handleToggleModalFechar}>
                      <Text style={styles.modalFechar}>{"❌"}</Text>
                    </TouchableOpacity>

                    <View>
                      <Text style={styles.modalText}>{prodNome}</Text>
                      <Text style={styles.modalSubText}>{prodDesc}</Text>
                    </View>

                    <View style={styles.modalBotoes}>
                      <TouchableOpacity onPress={handleRetirar}>
                        <Text style={styles.modalMenos}>{"➖"}</Text>
                      </TouchableOpacity>
                      <Text style={styles.modalText}>{quant}</Text>
                      <TouchableOpacity onPress={handleAdicionar}>
                        <Text style={styles.modalMais}>{"➕"}</Text>
                      </TouchableOpacity>
                    </View>

                    <View>
                      <Text style={styles.modalText}>R$: {prodValTotal}</Text>
                    </View>

                    <View>
                      <TouchableOpacity onPress={enviarPedido}>
                        <Text style={[styles.modalAdd, { color: "blue" }]}>Adicionar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
              </SafeAreaView>
            </Modal>

            <View>
              {itensPedidoInicial.length !== 0 && (
                <>
                  {itensPedidoInicial.map((palmito) => {
                    return (
                      <View>
                        <Text style={styles.modalSubText}>{palmito.produto.nome} x{palmito.quant}</Text>
                      </View>
                    )
                  })}
                </>
              )}
            </View>

            {itensPedido.length !== 1 && (
              <Text style={styles.modalSubText2}>Novos Pedidos</Text>
            )}

            <View>
              {itensPedido.length !== 1 && (
                <>
                  {itensPedido.map((palmito) => {
                    return (
                      <>
                        {palmito.length !== 0 && (
                          <View>
                            <Text style={styles.modalSubText}>{palmito.nome} x{palmito.quant}</Text>
                          </View>
                        )}
                      </>
                    )
                  })}
                </>
              )}
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 2,
    margin: 30,
  },
  containerText: {
    fontSize: 50,
  },
  modal: {
    flex: 1,
    textAlignVertical: "center",
    backgroundColor: "bisque",
    margin: 50,
    padding: 20,
    borderRadius: 50,
  },
  modalText: {
    fontSize: 50,
    marginTop: 10,
    marginBottom: 25,
    textAlign: "center",
  },
  modalSubText: {
    fontSize: 25,
    marginTop: 5,
    marginBottom: 10,
    textAlign: "center",
  },
  modalSubText2: {
    fontSize: 25,
    marginTop: 30,
    marginBottom: 30,
    textAlign: "center",
  },
  modalFechar: {
    fontSize: 30,
    textAlign: "right",
  },
  modalBotoes: {
    flexDirection: "row",
    alignSelf: "center",
  },
  modalMais: {
    fontSize: 50,
    paddingLeft: 30
  },
  modalMenos: {
    fontSize: 50,
    paddingRight: 30
  },
  modalAdd: {
    fontSize: 50,
    marginTop: 100,
  },
  distancia: {
    marginTop: 50
  },
});
