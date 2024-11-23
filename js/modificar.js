import { actualizardatos, obtenerdato } from "./promesas.js";  // Importa las funciones para obtener y actualizar datos en la base de datos

// Espera a que la página se cargue completamente
window.addEventListener("load", () => {
    alert("llegue");  // Muestra un mensaje de alerta cuando la página cargue
    let valores = window.location.search;  // Obtiene la cadena de parámetros de la URL
    console.log(valores);  // Muestra los parámetros en la consola

    const urlParams = new URLSearchParams(valores);  // Crea un objeto URLSearchParams a partir de los parámetros de la URL
    
    var id = urlParams.get("id");  // Obtiene el valor del parámetro "id" de la URL
    console.log(id);  // Muestra el "id" en la consola

    // Recuperar datos desde la base de datos y cargar el formulario
    obtenerdato(id).then((d) => {  // Llama a la función para obtener los datos con el "id" obtenido
        console.log("Datos recuperados:", d);  // Muestra los datos recuperados en la consola

        // Selecciona los elementos del formulario por su id
        let nombres = document.getElementById('nombres');
        let apellidos = document.getElementById('apellidos');
        let edad = document.getElementById('edad');
        let direccion = document.getElementById('direccion');
        let numero = document.getElementById('telefono');
        let tamano = document.getElementById('tamano');
        let motivo = document.getElementById('motivo');
        let acepto = document.getElementById('acepto');

        // Carga los datos recuperados en los campos correspondientes del formulario
        nombres.value = d.nombres;
        apellidos.value = d.apellidos;
        edad.value = d.edad;
        direccion.value = d.direccion;
        numero.value = d.numero;
        tamano.value = d.tamano;
        motivo.value = d.motivo;

        // Si el campo "acepto" es verdadero, marca el checkbox como seleccionado
        if (d.acepto) {
            acepto.checked = true;
        }
    }).catch((error) => {  // Si ocurre un error al obtener los datos
        console.error("Error al obtener los datos:", error);  // Muestra el error en la consola
        alert("Ocurrió un error al cargar los datos.");  // Muestra una alerta de error
    });

    // Selecciona el botón de actualizar
    let btnactualizar = document.getElementById("btnActualizar");
    // Agrega un evento al botón para cuando se haga clic
    btnactualizar.addEventListener("click", (e) => {
        e.preventDefault();  // Prevenir el envío por defecto del formulario

        // Recupera los elementos del formulario
        let enombres = document.getElementById('nombres');
        let eapellidos = document.getElementById('apellidos');
        let eedad = document.getElementById('edad');
        let edireccion = document.getElementById('direccion');
        let enumero = document.getElementById('telefono');
        let etamano = document.getElementById('tamano');
        let emotivo = document.getElementById('motivo');
        let eacepto = document.getElementById('acepto');

        // Recupera el contenido de los elementos del formulario
        let vnombres = enombres.value;
        let vapellidos = eapellidos.value;
        let vedad = eedad.value;
        let vdireccion = edireccion.value;
        let vnumero = enumero.value;
        let vtamano = etamano.value;
        let vmotivo = emotivo.value;
        let vacepto = eacepto.checked;

        console.log(vnombres, vapellidos, vedad, vdireccion, vnumero, vtamano, vmotivo, vacepto);  // Muestra los valores en la consola

        // Crea un objeto con los datos del formulario
        let datos = {
            'nombres': vnombres,
            'apellidos': vapellidos,
            'edad': vedad,
            'direccion': vdireccion,
            'numero': vnumero,
            'tamano': vtamano,
            'motivo': vmotivo,
            'acepto': vacepto
        };

        // Llama a la función para actualizar los datos en la base de datos
        actualizardatos(id, datos).then(() => {
            alert("Se actualizó los datos correctamente.");  // Muestra una alerta de éxito si los datos se actualizan
        }).catch((e) => {  // Si ocurre un error al actualizar los datos
            console.log(e);  // Muestra el error en la consola
            alert("Hubo un error al actualizar los datos.");  // Muestra una alerta de error
        });
    });
});
