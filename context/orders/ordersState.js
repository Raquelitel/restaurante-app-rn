import React, {useReducer} from "react";

import OrdersReducer from "./ordersReducer"
import OrdersContext from "./ordersContext"

import {
    SELECCIONAR_PRODUCTO,
    CONFIRMAR_ORDER_PLATE,
    MOSTRAR_RESUMEN,
    ELIMINAR_PRODUCTO
} from "../../types"


const OrdersState = props => {
   
    const initialState = {
        order: [],
        plate: null,
        total: 0,
        selectionPlate
    }

    const [ state, dispatch ] = useReducer(OrdersReducer, initialState)

    const selectionPlate = (plate) => {
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: plate
        })
    }

    const saveOrder = order => {
        dispatch({
            type: CONFIRMAR_ORDER_PLATE,
            payload: order
        })
    }

    const mostrarResumen = total => {
        dispatch({
            type: MOSTRAR_RESUMEN,
            payload: total
        })
    }

    const deleteProduct = id => {
        dispatch({
            type: ELIMINAR_PRODUCTO,
            payload: id
        })
    }

    return (
        <OrdersContext.Provider
            value={{
                order: state.order,
                plate: state.plate,
                total: state.total,
                selectionPlate,
                saveOrder,
                mostrarResumen,
                deleteProduct
            }}
        >
            {props.children}
        </OrdersContext.Provider>
    )
}

export default OrdersState