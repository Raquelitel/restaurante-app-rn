import React, {useReducer} from "react";

import firebase from "../../firebase";
import FirebaseReducer from "./firebaseReducer";
import FirebaseContext from "./firebaseContext";

import { OBTENER_PRODUCTOS } from "../../types";

const FirebaseState = props => {
   
    const initialState = {
        menu: []
    }

    const [ state, dispatch ] = useReducer(FirebaseReducer, initialState)

    const obtenerProductos = () => {
       dispatch({
        type: OBTENER_PRODUCTOS
       });

       // consultar firebase
       firebase.db
        .collection('productos')
        .where("existencia", "==", true)
        .onSnapshot(handleSnapshot)

       function handleSnapshot(snapshot) {
        console.log(snapshot)
        let plates = snapshot.docs.map( doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });
        console.log(plates)
        
       }
    }

    return (
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                firebase,
                obtenerProductos
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState 

