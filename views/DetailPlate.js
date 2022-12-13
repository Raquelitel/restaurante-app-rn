import React, { useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Image, Pressable } from 'react-native'

import {
  NativeBaseProvider,
  HStack,
  Button,
  Box,
  Text,
  Heading,
  VStack,
  Divider,
  Center,
  View
} from "native-base"
import globalStyles from "../styles/global"

import OrdersContext from "../context/orders/ordersContext"

const DetailPlate = () => {

  const { plate } = useContext(OrdersContext)
  const { nombre, imagen, descripcion, precio } = plate


  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: nombre });
  }, [])

  return (
    <NativeBaseProvider style={globalStyles.container}>

      <Box style={globalStyles.contenido}>

        <Heading size="2xl" style={globalStyles.title}>{nombre}</Heading>

        <VStack divider={<Divider />}>
          <Box>
            <Image source={{ uri: imagen }} style={globalStyles.imagen} />
            <Text style={{ marginTop: 20 }}>{descripcion}</Text>
            <Text style={globalStyles.price} > Precio: {precio} €</Text>
          </Box>
        </VStack>

        <HStack justifyContent="center">
          <Button style={globalStyles.boton}
            onPress={() => navigation.navigate("FormPlate")}
          >
            <Text style={globalStyles.botonText}>Ordenar Pedido</Text>
          </Button>
        </HStack>

      </Box>

    </NativeBaseProvider>

  )
}

export default DetailPlate