import { eliminardatos, obtenerdatos } from "./promesas.js";

// Espera a que la página se haya cargado completamente
window.addEventListener("load", () => {
    // Obtiene los datos a través de la función obtenerdatos (probablemente una promesa)
    var datos = obtenerdatos()
    console.log(datos)  // Muestra los datos obtenidos en la consola para depuración
    var altodato = document.getElementById("cuerpotabla");  // Obtiene el contenedor donde se insertarán las filas de la tabla
    
    // Espera a que la promesa de obtener los datos se resuelva
    datos.then((listado) => {
        let filas = ""  // Inicializa una cadena vacía para almacenar las filas HTML

        // Itera sobre cada elemento del listado de datos y crea una fila para cada uno
        listado.forEach((d) => {
            filas += "<tr>"
            filas += "<td>" + d.nombres + "</td>"  // Agrega una celda con el nombre
            filas += "<td>" + d.apellidos + "</td>"  // Agrega una celda con el apellido
            filas += "<td>" + d.edad + "</td>"  // Agrega una celda con la edad
            filas += "<td>" + d.direccion + "</td>"  // Agrega una celda con la dirección
            filas += "<td>" + d.numero + "</td>"  // Agrega una celda con el número de teléfono
            filas += "<td>" + d.tamano + "</td>"  // Agrega una celda con el tamaño
            filas += "<td>" + d.perro + "</td>"  // Agrega una celda con el nombre del perro
            filas += "<td>" + d.motivo + "</td>"  // Agrega una celda con el motivo
            filas += "<td>" + d.acepto + "</td>"  // Agrega una celda con el valor de 'aceptó'
            filas += "<td><button id='mod" + d.id + "'>Modificar</button></td>"  // Agrega un botón de 'Modificar'
            filas += "<td><button id='eli" + d.id + "'>Eliminar</button></td>"  // Agrega un botón de 'Eliminar'
            filas += "</tr>"
        })
        
        console.log(filas)  // Muestra las filas generadas en la consola para depuración
        altodato.innerHTML = filas;  // Inserta las filas generadas dentro del cuerpo de la tabla en el HTML

        // Añade los eventos para los botones de eliminar y modificar para cada dato
        listado.forEach((d) => {
            // Obtiene el botón de eliminar correspondiente
            let botonEliminar = document.getElementById("eli" + d.id);
            
            // Añade un evento de clic al botón de eliminar
            botonEliminar.addEventListener("click", () => {
                // Confirma si el usuario realmente desea eliminar el dato
                if (confirm("comooo, si eliminas a : " + d.nombres + " un perrito quedara sin dueño")) {
                    console.log("eliminaste")  // Muestra un mensaje en la consola para depuración
                    // Llama a la función eliminardatos para eliminar el dato con el id correspondiente
                    eliminardatos(d.id).then(() => {
                        alert("se elimino estas feliz... mala persona.")  // Muestra un mensaje de éxito
                        console.log("mala persona")  // Muestra un mensaje en la consola para depuración
                        location.reload()  // Recarga la página para reflejar los cambios
                    }).catch((e) => {
                        console.log("no se elimino na weoncito" + e)  // Si ocurre un error, muestra un mensaje en la consola
                    })
                } else {
                    console.log("tai puro weando")  // Si el usuario no confirma, muestra un mensaje en la consola
                }
            })
            
            // Obtiene el botón de modificar correspondiente
            let botonActualizar = document.getElementById("mod" + d.id);
            
            // Añade un evento de clic al botón de modificar
            botonActualizar.addEventListener("click", () => {
                alert("vamos pa maiami el id " + d.id);  // Muestra un mensaje de alerta con el id
                // Redirige a la página de modificación con el id del dato como parámetro en la URL
                window.location.href = "/modificar.html?id=" + d.id;
            })
        })
    })
});
