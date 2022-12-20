import React, { useContext, useEffect } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import FirebaseContext from '../context/firebase/firebaseContext'
import OrdersContext from "../context/orders/ordersContext"
import { useNavigation } from '@react-navigation/native'
import {
  NativeBaseProvider,
  Box,
  Text,
  Avatar,
  HStack,
  VStack,
  Spacer,
  SectionList,
} from 'native-base';
import globalStyles from "../styles/global";

const Menu = () => {

  // Context de firebase
  const { menu, obtenerProductos } = useContext(FirebaseContext)


  // Context de order
  const { selectionPlate } = useContext(OrdersContext)

  const navigation = useNavigation()

  useEffect(() => {
    obtenerProductos()

  }, [])

  return (

    <NativeBaseProvider
      style={globalStyles.container}
    >
      <SectionList
        w="94%"
        mx={3}
        sections={menu}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => {
          const { imagen, nombre, descripcion, categoria, precio, id } = item;

          return (
            <Pressable
              onPress={() => {
                const { existencia, ...item2 } = item
                selectionPlate(item2)
                navigation.navigate("DetailPlate")
              }}
            >
              <Box
                ml='2'
                mr='2'
                borderBottomWidth="1"
                _dark={{ borderColor: "muted.50" }}
                borderColor="muted.300"
                pl={["0", "4"]}
                pr={["0", "5"]}
                py="2"

              >

                <HStack
                  space={[4, 3]} //espacio entre el avatar y el texto nombre
                  justifyContent="space-between">

                  <Avatar size="54px" source={{ uri: imagen }} />

                  <VStack>

                    <Text _dark={{ color: "warmGray.50" }} color="coolGray.800" bold>
                      {nombre}
                    </Text>

                    <Text color="coolGray.600" _dark={{ color: "warmGray.200" }}>
                      {descripcion}
                    </Text>

                  </VStack>
                  <Spacer />
                  <Text
                    fontSize="xs"
                    mr='3'
                    mt='3'
                    _dark={{ color: "warmGray.50" }}
                    color="coolGray.800"
                    alignSelf="flex-start"
                  >
                    ${precio}

                  </Text>
                </HStack>

              </Box>
            </Pressable>
          )
        }
        }

        renderSectionHeader={({ section: { categoria } }) => (
          <Box
            bg="muted.200"
            color="light.500"
            mt={5}
            mb="3"
            p="2"
            pb="2"
            _text={{
              fontSize: 'md',
              fontWeight: 'bold',
              textTransform: 'capitalize',
              textAlign: 'center',
            }}>
            {categoria}
          </Box>
        )}
      />
    </NativeBaseProvider>
  )
}

export default Menu
