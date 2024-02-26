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
import { useNavigation, route } from "@react-navigation/native";

import apiLocal from "../../api/apiLocal";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function IDmesas({ navigation, route }) {
  function voltarTela() {
    navigation.navigate("mesas");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.titulo}>MESA {route.params.mesaId}</Text>
      </View>
      <View>
        <TextInput
          style={styles.buscar}
          inputMode="search"
          placeholder="Buscar produto..."
          placeholderTextColor="black"
          selectionColor="black"
        />
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
  titulo: {
    marginTop: -340,
    fontSize: 30,
    fontWeight: "bold",
  },
  buscar: {
    marginTop: -280,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    width: 300,
    paddingLeft: 10,
    paddingVertical: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
});
