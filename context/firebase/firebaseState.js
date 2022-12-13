import React, {useReducer} from "react";

import firebase from "../../firebase";
import FirebaseReducer from "./firebaseReducer";
import FirebaseContext from "./firebaseContext";

import { OBTENER_PRODUCTOS_EXISTO } from "../../types";

const FirebaseState = props => {
   
    const initialState = {
        menu: []
    }

    const [ state, dispatch ] = useReducer(FirebaseReducer, initialState)

    const obtenerProductos = () => {


       // consultar firebase
       firebase.db
        .collection('productos')
        .where("existencia", "==", true)
        .onSnapshot(handleSnapshot)

       function handleSnapshot(snapshot) {
        let plates = snapshot.docs.map( doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        plates = Array.from(
            plates.reduce(
              (m, {categoria, ...data}) =>
                m.set(categoria, [...(m.get(categoria) || []), data]),
              new Map(),
            ),
            ([categoria, data]) => ({categoria, data}),
          );

        dispatch({
            type: OBTENER_PRODUCTOS_EXISTO,
            payload: plates
           });
        
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

