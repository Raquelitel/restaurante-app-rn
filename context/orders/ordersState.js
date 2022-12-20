import React, {useReducer} from "react";

import OrdersReducer from "./ordersReducer"
import OrdersContext from "./ordersContext"

import {
    SELECCIONAR_PRODUCTO,
    CONFIRMAR_ORDER_PLATE,
    MOSTRAR_RESUMEN,
    ELIMINAR_PRODUCTO,
    PEDIDO_ORDENADO
} from "../../types"


const OrdersState = props => {
   
    const initialState = {
        order: [],
        plate: null,
        total: 0,
        selectionPlate,
        idorder: ""
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
    const handleOrder = id => {
        dispatch({
            type: PEDIDO_ORDENADO,
            payload: id
        })
    }

    return (
        <OrdersContext.Provider
            value={{
                order: state.order,
                plate: state.plate,
                total: state.total,
                idorder: state.idorder,
                selectionPlate,
                saveOrder,
                mostrarResumen,
                deleteProduct,
                handleOrder
            }}
        >
            {props.children}
        </OrdersContext.Provider>
    )
}

export default OrdersState