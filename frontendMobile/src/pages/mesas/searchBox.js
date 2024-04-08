import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from "react-native";

import { SearchBar } from 'react-native-elements'

import { Component, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import apiLocal from "../../api/apiLocal";
import AsyncStorage from "@react-native-async-storage/async-storage";

console.disableYellowBox = true

const navigation = useNavigation

useEffect(() => {
    async function verificaToken() {
        const iToken = await AsyncStorage.getItem("@token");
        const token = JSON.parse(iToken);

        const resposta = await apiLocal.get("/ListarProduto/files", {
            headers: {
                Authorization: "Bearer " + `${token}`,
            },
        });

        if (!resposta.data) {
            navigation.navigate("inicial");
            return;
        }

        return { produto: resposta.data }
    }
    verificaToken();
}, []);

const Item = ({ title }) => {
    return (
        <View style={styles.item}>
            <Text>{title}</Text>
        </View>
    )
}

const renderItem = ({ item }) => <Item title={item.nome} />
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: produto,
            error: null,
            searchValue: "",
        }
        this.arrayholder = produto
    }

    searchFunction = (text) => {
        const updatedData = this.arrayholder.filter((item) => {
            const item_data = `${item.nome.toUpperCase()}`
            const text_data = text.toUpperCase()
            return item_data.indexOf(text_data) > -1
        })
        this.setState({ data: updatedData, searchValue: text })
    }

    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    placeholder="Search Here..."
                    lightTheme
                    round
                    value={this.state.searchValue}
                    onChangeText={(text) => this.searchFunction(text)}
                    autoCorrect={false}
                />
                <FlatList
                    data={this.state.data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
        )
    }
}

export default Search

//https://www.geeksforgeeks.org/how-to-add-searchbar-in-react-native/
//
//
//
//
//

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
})