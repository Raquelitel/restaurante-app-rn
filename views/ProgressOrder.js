import { Box, Button, Container, Heading, NativeBaseProvider, View } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { Text, StyleSheet } from 'react-native'
import OrdersContext from '../context/orders/ordersContext'
import firebase from '../firebase'
import globalStyles from '../styles/global'
import Countdown from 'react-countdown'
import { useNavigation } from '@react-navigation/native'

const ProgressOrder = () => {

  const { idorder } = useContext(OrdersContext)

  const [time, setTime] = useState(0)
  const [ complete, setComplete ] = useState(false)
  
  const navigate = useNavigation()

  useEffect(() => {
    const getProduct = () => {
      firebase.db.collection("ordenes")
        .doc(idorder)
        //onSnapshot para traer la información en tiempo real
        .onSnapshot(function (doc) {
          setTime(doc.data().tiempoentrega)
          setComplete(doc.data().completado)
        })
    }
    getProduct()
  }, [])

  const renderer = ({minutes, seconds}) => {
    

    return (
      <Text style={styles.time}> {minutes} : {seconds}</Text>
    )
  }

  return (
    <NativeBaseProvider style={globalStyles.container}>
      <Box style={[globalStyles.contenido, { marginTop: 50 }]}>
  
          {time === 0 && (
            <>
              <Text style={{textAlign: "center"}}>Hemos recibido tu orden...</Text>
              <Text style={{textAlign: "center"}}>En breve le indicaremos el tiempo de entrega</Text>
            </>
          )}

          {!complete && time > 0 && (
            <>
              <Text style={{textAlign: "center"}}>Su orden estará lista en </Text>
              <Text>
                <Countdown
                date={Date.now() + time * 60000}
                renderer={renderer} />
              </Text>
            
            </>
          )}

          { complete && (
            <>
            <Heading style={styles.textComplete}>Orden Lista</Heading>
            <Text style={styles.textComplete}>Por favor, pase a recoger su pedido</Text>
            <Button 
              style={[globalStyles.boton, {marginTop: 100}]}
              onPress={() => navigate.navigate("NewOrder")}
            
            >
              <Text style={globalStyles.botonText}>Comenzar un pedido nuevo</Text>
            </Button>
            </>
          )}

      
      </Box>
    </NativeBaseProvider>

  )
}

const styles = StyleSheet.create({
  time: {
    marginBottom: 20,
    fontSize: 60,
    textAlign: "center",
    marginTop: 30
  },
  textComplete: {
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 20
  }
})

export default ProgressOrder