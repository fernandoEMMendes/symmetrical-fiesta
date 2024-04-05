// function procurarProduto(nomeProcura) {
//     const updatedData = nomeMap.filter((palmito) => {
//       const nomeMaisculo = `${palmito.toUpperCase()}`
//       const procuraMaiusculo = nomeProcura.toUpperCase()
//       // console.log("nomeMaisculo", nomeMaisculo)
//       // console.log("procurarMaisculo", procuraMaiusculo)


//       // const Item = ({ title }) => { 
//       //   return ( 
//       //     <View style={styles.item}> 
//       //       <Text>{title}</Text> 
//       //     </View> 
//       //   ); 
//       // }; 

//       // const renderItem = ({ item }) => <Item title={item.title} />; 

//       const receberNome = (objeto) => {
//         return (
//           <View style={styles.item}>
//             <Text>{objeto}</Text>
//           </View>
//         )
//       }


//       setTitulo(receberNome(nomeMaisculo))


//       setData(updatedData)
//       setSearchValue(nomeProcura)

//       return nomeMaisculo.indexOf(procuraMaiusculo) > -1
//     })


//   }

//   return (
//     <View>

//       <View style={styles.container}>
//         <SearchBar
//           placeholder="Search Here..."
//           lightTheme
//           round
//           value={searchValue}
//           onChangeText={(text) => procurarProduto(text)}
//           autoCorrect={false}
//         />
//         <FlatList
//           data={data}
//           renderItem={titulo}
//           keyExtractor={(palmito) => palmito.id}
//         />
//       </View>
//     </View>
//   );
// }