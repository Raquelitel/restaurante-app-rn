import React from 'react'
import { StyleSheet } from 'react-native'
import {
  NativeBaseProvider,
  FormControl,
  Stack,
  Button,
  Box,
  Text,
  Input,
  View,
  VStack,
  Icon,
  Heading,
  HStack
} from "native-base"


import { useNavigation } from '@react-navigation/native'
import globalStyles from '../styles/global'
import OrdersContext from '../context/orders/ordersContext'

const FormPlate = () => {
  return (
    <NativeBaseProvider>
      <Box>
        <FormControl>
        <Heading style={globalStyles.title}>Cantidad</Heading>
        <HStack>

          <Button>
          <Icon name="remove"/>
          </Button>


          <Button>
          <Icon name="add"/>
          </Button>




        </HStack>
        </FormControl>
      </Box>
    </NativeBaseProvider> 
  )
}

export default FormPlate