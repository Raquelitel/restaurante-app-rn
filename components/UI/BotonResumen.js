import React, { useContext } from 'react'
import { Text, Button, NativeBaseProvider } from 'native-base'
import globalStyles from '../../styles/global'
import { useNavigation } from '@react-navigation/native'
import OrdersContext from '../../context/orders/ordersContext'

const BotonResumen = () => {
    const navigate = useNavigation()

    const { order } = useContext(OrdersContext)

    if(order.length === 0) return null;
    return (
        <NativeBaseProvider>
            <Button style={globalStyles.boton}
                onPress={() => navigate.navigate("ResumeOrder")}
            
            >
                <Text style={globalStyles.botonText}>Mi Pedido</Text>
            </Button>
        </NativeBaseProvider>

    )
}

export default BotonResumen