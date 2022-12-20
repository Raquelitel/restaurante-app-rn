import {
    SELECCIONAR_PRODUCTO,
    CONFIRMAR_ORDER_PLATE,
    MOSTRAR_RESUMEN,
    ELIMINAR_PRODUCTO,
    PEDIDO_ORDENADO
} from "../../types"

export default (state, action) => {
    switch(action.type) {
        case SELECCIONAR_PRODUCTO:
            return {
                ...state,
                plate: action.payload
            }
        case CONFIRMAR_ORDER_PLATE:
            return {
                ...state,
                order: [...state.order, action.payload]
            }
        case MOSTRAR_RESUMEN:
            return {
                ...state,
                total: action.payload
            }
        case ELIMINAR_PRODUCTO:
            return {
                ...state,
                order: state.order.filter( product => product.id !== action.payload)
            }
        case PEDIDO_ORDENADO:
            return {
                ...state,
                order: [],
                total: 0,
                idorder: action.payload
            }
        default: 
            return state;
    }
}