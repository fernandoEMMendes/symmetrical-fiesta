import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    TextInput,
    Image,
} from "react-native"

import { useEffect, useState } from "react"
import { useNavigation } from '@react-navigation/native'

import apiLocal from "../../api/apiLocal"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function IDmesas() {

    const id = '1b7a3108-161b-4729-a24d-7a3cf63a6820'
    const navigation = useNavigation()
    const [mesa, setMesa] = useState([''])
    const [listarUnicaMesa, setListarUnicaMesa] = useState('')

    useEffect(() => {
        async function listarMesaUnica() {

            const iToken = await AsyncStorage.getItem('@token')
            const token = JSON.parse(iToken)

            const resposta = await apiLocal.get(`/ListarMesaUnica/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + `${token}`
                }
            })
            setMesa(resposta.data)
            if (!resposta.data) {
                navigation.navigate('inicial')
                return
            }
        }
        listarMesaUnica()
    }, [mesa])

    return (
        <SafeAreaView>
            <View>
                <Text>Visualizando ID da mesa</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "beige"
    }
})