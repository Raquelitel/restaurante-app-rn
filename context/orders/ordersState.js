import React, {useReducer} from "react";

import OrdersReducer from "./ordersReducer"
import OrdersContext from "./ordersContext"

import {
    SELECCIONAR_PRODUCTO
} from "../../types"


const OrdersState = props => {
   
    const initialState = {
        order: [],
        plate: null,
        selectionPlate
    }

    const [ state, dispatch ] = useReducer(OrdersReducer, initialState)

    const selectionPlate = (plate) => {
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: plate
        })
    }

    return (
        <OrdersContext.Provider
            value={{
                order: state.order,
                plate: state.plate,
                selectionPlate
            }}
        >
            {props.children}
        </OrdersContext.Provider>
    )
}

export default OrdersState