import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Inicial from "../inicial/inicial";
import Mesas from "../mesas/mesas";
import IDmesas from '../mesas/mesa_id'
import Produtos from "../produtos/produtos";

const Stack = createNativeStackNavigator();

//options={ ({ route }) => ({ title: route.params })  }

export default function Rotas() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="inicial"
        component={Inicial}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="mesas"
        component={Mesas}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="produtos"
        component={Produtos}
        options={{ headerShown: false }}
      />
      <Stack.Screen
      name='mesa_id'
      component={IDmesas}
      options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}