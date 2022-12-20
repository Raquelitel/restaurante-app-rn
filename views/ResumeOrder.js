import React, { useContext, useEffect } from 'react'
import { StyleSheet, Alert, Image, Text } from 'react-native'
import { Avatar, Box, Button, FlatList, Heading, HStack, NativeBaseProvider, SectionList, VStack } from "native-base"

import { useNavigation } from '@react-navigation/native'
import firebase from '../firebase'
import globalStyles from '../styles/global'
import OrdersContext from '../context/orders/ordersContext'

const ResumeOrder = () => {
  const { order, total, mostrarResumen, deleteProduct, handleOrder } = useContext(OrdersContext)

  const navigation = useNavigation()

  useEffect(() => {
    getTotalOrder()
  }, [order])

  const getTotalOrder = () => {
    let newTotal = 0;
    newTotal = order.reduce((newTotal, product) => newTotal + product.total, 0)
    mostrarResumen(newTotal)
  }

  const handleProgressOrder = () => {
    Alert.alert(
      "¿Quieres ordenar tu pedido?",
      "Una vez que realices el pedido, no podrás modificarlo",
      [{
        text: "Confirmar",
        onPress: async () => {

          const orderObj = {
            tiempoentrega: 0,
            completado: false,
            total: Number(total),
            orden: order,
            creado: Date.now()
          }
         
          try {
            const order = await firebase.db.collection("ordenes").add(orderObj)
            handleOrder(order.id);
            navigation.navigate("ProgressOrder")
          } catch(error) {
            console.log(error)
          }

          
        }
      },
      { text: "Cancelar", style: "cancel" }]

    )
  }

  const confirmDelete = id => {
    Alert.alert(
      "¿Desea eliminar este producto?",
      "Una vez que eliminado, no se puede recuperar",
      [{
        text: "Confirmar",
        onPress: () => {
          deleteProduct(id)
        }
      },
      { text: "Cancelar", style: "cancel" }]

    )
  }

  return (
    <NativeBaseProvider style={globalStyles.container}>
      <Box>
        <Heading style={globalStyles.title}>Resumen de Pedido</Heading>

        <FlatList
          data={order}
          renderItem={({ item }) =>
            <Box
              borderBottomWidth="1"
              py="2"
              borderColor="muted.400"
            >
              <HStack space={[2, 3]}>
                <Image style={styles.image} source={{ uri: item.imagen }} />
                <VStack>
                  <Text>{item.nombre}</Text>
                  <Text>Cantidad: {item.cuantity}</Text>
                  <Text>Total: {item.precio} €</Text>
                  <Button
                  onPress={() => confirmDelete(item.id) }
                    colorScheme="danger"
                    width="full"
                  >
                    <Text style={[globalStyles.botonText, {color: "#FFF"}]}>Eliminar</Text>
                  </Button>
                </VStack>

              </HStack>

            </Box>
          }

        />
        <Text style={globalStyles.price}>Total a pagar: {total} € </Text>

        <Button
          style={{ marginTop: 20, marginHorizontal: 10, backgroundColor: "#000" }}
          onPress={() => navigation.navigate("Menu")}

        >
          <Text style={[globalStyles.botonText, { color: "#FFF" }]}>Seguir Pidiendo</Text>
        </Button>

      </Box>
      <VStack style={styles.botonFooter}>
        <Button
          style={[globalStyles.boton, { marginTop: 20 }]}
          onPress={() => handleProgressOrder()}
        >
          <Text style={globalStyles.botonText}>Finalizar Pedido</Text>
        </Button>
      </VStack>

    </NativeBaseProvider>

  )
}

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70
  },
  botonFooter: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 30
  },
})

export default ResumeOrder