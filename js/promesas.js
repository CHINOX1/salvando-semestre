// Importa las funciones necesarias desde Firebase
import { db } from "./firebase.js";  // Importa la configuración de Firebase
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"; 

/**
 * Función para agregar datos a la colección "datos" en Firebase
 * 
 * @param {Object} datos - Los datos que se agregarán a la colección "datos"
 * @returns {Promise} Promesa que se resuelve cuando los datos son agregados exitosamente
 */
export let agregarDatos = async (datos) => {
    // Crea un nuevo documento en la colección "datos" con los datos proporcionados
    const docref = await addDoc(collection(db, "datos"), datos);
}

/**
 * Función para obtener todos los datos de la colección "datos" en Firebase
 * 
 * @returns {Promise<Array>} Promesa que devuelve un array con los datos de todos los documentos en la colección
 */
export let obtenerdatos = async () => {
    // Obtiene todos los documentos de la colección "datos"
    const querySnapshot = await getDocs(collection(db, "datos"));
    
    var datoss = [];  // Array donde se almacenarán los datos recuperados
    
    // Itera sobre cada documento en la colección y guarda sus datos
    querySnapshot.forEach((doc) => {
        let datos = {
            'id': doc.id,  // ID del documento
            'nombres': doc.data().nombres,  // Extrae el campo "nombres"
            'apellidos': doc.data().apellidos,  // Extrae el campo "apellidos"
            'edad': doc.data().edad,  // Extrae el campo "edad"
            'direccion': doc.data().direccion,  // Extrae el campo "direccion"
            'numero': doc.data().numero,  // Extrae el campo "numero"
            'tamano': doc.data().tamano,  // Extrae el campo "tamano"
            'perro': doc.data().perro,  // Extrae el campo "perro"
            'motivo': doc.data().motivo,  // Extrae el campo "motivo"
            'acepto': doc.data().acepto  // Extrae el campo "acepto"
        }
        // Agrega los datos del documento al array "datoss"
        datoss.push(datos);
        console.log(doc.id, " =>", doc.data());  // Muestra el ID del documento y los datos en consola
    });

    return datoss;  // Retorna el array con los datos de todos los documentos
}

/**
 * Función para eliminar un documento por su ID
 * 
 * @param {string} iddatos - El ID del documento a eliminar
 * @returns {Promise} Promesa que se resuelve cuando el documento es eliminado exitosamente
 */
export let eliminardatos = async (iddatos) => {
    // Elimina el documento con el ID proporcionado en la colección "datos"
    await deleteDoc(doc(db, "datos", iddatos));
}

/**
 * Función para obtener un solo documento por su ID
 * 
 * @param {string} iddatos - El ID del documento a obtener
 * @returns {Promise<Object>} Promesa que devuelve un objeto con los datos del documento solicitado
 */
export let obtenerdato = async (iddatos) => {
    // Referencia al documento con el ID proporcionado en la colección "datos"
    const docref = doc(db, "datos", iddatos);

    // Obtiene el documento y su snapshot
    const docSnap = await getDoc(docref);

    // Si el documento existe, crea un objeto con sus datos
    let dato = {
        'id': docSnap.id,  // ID del documento
        'nombres': docSnap.data().nombres,  // Extrae el campo "nombres"
        'apellidos': docSnap.data().apellidos,  // Extrae el campo "apellidos"
        'edad': docSnap.data().edad,  // Extrae el campo "edad"
        'direccion': docSnap.data().direccion,  // Extrae el campo "direccion"
        'numero': docSnap.data().numero,  // Extrae el campo "numero"
        'tamano': docSnap.data().tamano,  // Extrae el campo "tamano"
        'perro': docSnap.data().perro,  // Extrae el campo "perro"
        'motivo': docSnap.data().motivo,  // Extrae el campo "motivo"
        'acepto': docSnap.data().acepto  // Extrae el campo "acepto"
    }

    return dato;  // Retorna el objeto con los datos del documento
}

/**
 * Función para actualizar un documento con nuevos datos
 * 
 * @param {string} id - El ID del documento a actualizar
 * @param {Object} d - El objeto con los nuevos datos a actualizar
 * @returns {Promise} Promesa que se resuelve cuando los datos son actualizados exitosamente
 */
export let actualizardatos = async (id, d) => {
    try {
        // Referencia al documento que se quiere actualizar
        const docRef = doc(db, "datos", id);

        // Actualiza el documento con los nuevos datos proporcionados
        await updateDoc(docRef, d);

        // Si la actualización es exitosa, muestra un mensaje en la consola
        console.log("Datos actualizados correctamente.");
    } catch (error) {
        // Si ocurre un error, muestra el error en la consola y lanza una excepción
        console.error("Error al actualizar los datos:", error);
        throw new Error("Error al actualizar los datos");
    }
};
