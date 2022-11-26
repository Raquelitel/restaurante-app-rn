import React from 'react'
import { View, StyleSheet } from 'react-native'
import { NativeBaseProvider, Box, Container, Button, Text } from "native-base"
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../styles/global'


const NewOrder = () => {
  const navigation = useNavigation()
  return (
    <NativeBaseProvider>
      <Box style={globalStyles.container}>
        <View style={[globalStyles.contenido, styles.contenido]}>
          <Button
            style={globalStyles.boton}
            onPress={ () => navigation.navigate("Menu")}
          >
            <Text style={globalStyles.botonText}>Crear Nueva Orden</Text>
          </Button>
        </View>
      </Box>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  contenido: {
    flexDirection: "column",
    justifyContent: "center"
  }
})

export default NewOrder