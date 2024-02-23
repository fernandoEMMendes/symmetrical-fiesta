import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Produtos() {

  const nav = useNavigation();

  function salvarVoltarMesas() {
    nav.navigate("mesas");
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar style="auto" />
        <Text>MESA X</Text>
        <View style={styles.containerBotoes}>
          <TouchableOpacity onPress={salvarVoltarMesas}>
            <Text>SALVAR</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={salvarVoltarMesas}>
            <Text>VOLTAR</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 400,
  },
});