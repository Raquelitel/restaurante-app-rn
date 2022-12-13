
import { OBTENER_PRODUCTOS_EXISTO } from "../../types";

export default (state, action) => {

    switch(action.type) {

        case OBTENER_PRODUCTOS_EXISTO:
        return {
            ...state,
            menu: action.payload
        }

        default: 
            return state;
    }
}