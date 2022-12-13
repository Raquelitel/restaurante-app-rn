import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FirebaseState from './context/firebase/firebaseState';
import OrdersState from './context/orders/ordersState'

import DetailPlate from "./views/DetailPlate"
import FormPlate from "./views/FormPlate"
import Menu from "./views/Menu"
import NewOrder from "./views/NewOrder"
import ProgressOrder from "./views/ProgressOrder"
import ResumeOrder from "./views/ResumeOrder"


const Stack = createStackNavigator();

const App = () => {

  return (
    <>
      <FirebaseState>
        <OrdersState>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: "#FFDA00"
                },
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontWeight: "bold"
                },
                headerTintColor: "#000"
              }}
            >
              <Stack.Screen
                name="NewOrder"
                component={NewOrder}
                options={{
                  title: "Nueva Orden"
                }}
              />

              <Stack.Screen
                name="Menu"
                component={Menu}
                options={{
                  title: "Menú"
                }}
              />

              <Stack.Screen
                name="FormPlate"
                component={FormPlate}
                options={{
                  title: "Formulario"
                }}
              />
              <Stack.Screen
                name="DetailPlate"
                component={DetailPlate}
                options={{
                  title: "Detalles"
                }}
              />
              <Stack.Screen
                name="ProgressOrder"
                component={ProgressOrder}
                options={{
                  title: "Progreso"
                }}
              />
              <Stack.Screen
                name="ResumeOrder"
                component={ResumeOrder}
                options={{
                  title: "Resumen del pedido"
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </OrdersState>
      </FirebaseState>
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;
