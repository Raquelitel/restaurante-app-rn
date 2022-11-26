import React, {useReducer} from "react";

import OrdersReducer from "./ordersReducer"
import OrdersContext from "./ordersContext"


const OrdersState = props => {
   
    const initialState = {
        order: []
    }

    const [ state, dispatch ] = useReducer(OrdersReducer, initialState)

    return (
        <OrdersContext.Provider
            value={{
                order: state.order
            }}
        >
            {props.children}
        </OrdersContext.Provider>
    )
}

export default OrdersState