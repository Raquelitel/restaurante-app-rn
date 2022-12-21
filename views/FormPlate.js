import React, { useContext, useEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import {
  NativeBaseProvider,
  FormControl,
  Button,
  Box,
  Text,
  Input,
  Heading,
  HStack
} from "native-base"

import IconAdd from 'react-native-vector-icons/Ionicons';
import IconRemove from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native'
import globalStyles from '../styles/global'
import OrdersContext from '../context/orders/ordersContext'

const FormPlate = () => {

  const { plate, saveOrder } = useContext(OrdersContext)
  const { precio } = plate

  const [cuantity, setCuantity] = useState(1)
  const [total, setTotal] = useState(0)

  const navigation = useNavigation()

  useEffect(() => {
    getTotal()
  }, [cuantity])


  const handleDecrease = () => {
    if (cuantity > 1) {
      const newAmount = parseInt(cuantity) - 1
      setCuantity(newAmount)
    }
  }

  const handleIncrease = () => {
    const newAmount = parseInt(cuantity) + 1
    setCuantity(newAmount)
  }

  const getTotal = () => {
    const totalPrice = precio * cuantity
    setTotal(totalPrice)

  }

  const confirmOrder = () => {
    Alert.alert(
      "¿Desea confirmar el pedido?",
      "Una vez confirmado no se podrá eliminar",
      [
        {
          text: "Confirmar",
          onPress: () => {
            const order = {
              ...plate,
              cuantity,
              total
            }
            saveOrder(order)
            navigation.navigate("ResumeOrder")
          }
        },
        {
          text: "Cancelar",
          style: "cancel"
        }
      ]
    )
  }

  return (
    <NativeBaseProvider>
      <Box style={globalStyles.container}>
        <FormControl>
          <Heading style={globalStyles.title}>Cantidad</Heading>
          <HStack justifyContent="space-between">

            <IconRemove.Button
              name="remove"
              style={{ justifyContent: "center" }}
              size={50}
              width={130}
              onPress={() => handleDecrease()}
            />

            <Input
              w={{ base: "20%" }}
              size="2xl"
              value={cuantity.toString()}
              keyboardType="numeric"
              onChangeText={amount => setCuantity(amount)}
            />

            <IconAdd.Button
              name="add"
              style={{ justifyContent: "center" }}
              size={50}
              width={130}
              onPress={() => handleIncrease()}
            />

          </HStack>
          <Text style={globalStyles.price}>Subtotal: {total} €</Text>
        </FormControl>
      </Box>
      <HStack justifyContent="center">
        <Button style={[globalStyles.boton, styles.boton]}
          onPress={() => confirmOrder()}
        >
          <Text style={globalStyles.botonText}>Agregar al Pedido</Text>
        </Button>
      </HStack>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  boton: {
    marginBottom: 30,
    flexDirection: "row",
    flex: 1
  }
})

export default FormPlate