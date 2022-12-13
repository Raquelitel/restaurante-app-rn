import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contenido: {
        marginHorizontal: "2.5%",
        flex: 1
    },
    boton: {
        backgroundColor: "#FFDA00"
    },
    botonText: {
        textTransform: "uppercase",
        color: "#000",
        fontWeight: "bold"
    },
    title: {
        textAlign: "center",
        marginTop: 40,
        marginBottom: 20,
    },
    imagen: {
        height: 300,
        width: "100%"
    },
    price: {
        marginVertical: 20,
        fontSize: 20,
        fontWeight: "bold"
    }
})

export default globalStyles