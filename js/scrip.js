import { agregarDatos } from "./promesas.js";  // Importa la función para agregar datos (probablemente a una base de datos)

// Espera a que la página se cargue completamente
window.addEventListener("load", () => {
    console.log("Está vivo");  // Muestra un mensaje en la consola al cargar la página
    
    // Selecciona los elementos del formulario por su id
    const nombres = document.getElementById('nombres');
    const apellidos = document.getElementById('apellidos');
    const edad = document.getElementById('edad');
    const direccion = document.getElementById('direccion');
    const telefono = document.getElementById('telefono');
    const tamano = document.getElementById('tamano');
    const motivo = document.getElementById('motivo');
    const acepto = document.getElementById('acepto');
    const formulario = document.querySelector('form');

    let vdog = ""; // Variable global para almacenar la preferencia de edad del perro

    // Función para validar los campos del formulario antes de enviarlo
    function validarFormulario() {
        let formularioValido = true;
        const ecachorro = document.getElementById("cachorro");
        const eadulto = document.getElementById("adulto");

        // Determina la preferencia de edad del perro: cachorro, adulto o señor
        if (ecachorro.checked) {
            vdog = "cachorro";
        } else if (eadulto.checked) {
            vdog = "adulto";
        } else {
            vdog = "senor";  // Si no se selecciona ninguno, se asigna "senor"
        }

        // Lista de campos a validar
        const campos = [nombres, apellidos, edad, direccion, telefono, motivo];

        // Resetear los bordes de los campos (eliminando el color rojo)
        campos.forEach(campo => campo.style.border = "");

        // Validar campos vacíos
        campos.forEach(campo => {
            if (!campo.value.trim()) {
                campo.style.border = "2px solid red";  // Marca el campo con borde rojo si está vacío
                formularioValido = false;
            }
        });

        // Validar la edad (debe ser un número y mayor o igual a 18)
        const edadNumerica = parseInt(edad.value, 10);
        if (isNaN(edadNumerica) || edadNumerica < 18) {
            edad.style.border = "2px solid red";  // Marca el campo de edad con borde rojo si no es válida
            alert("La edad debe ser un número mayor o igual a 18. llame a su mamita pk firme");
            formularioValido = false;
        }

        // Validar que el checkbox "Acepto" esté marcado
        if (!acepto.checked) {
            alert("mire o usted acepta darle una vida digna al perro o se va por donde llego.");
            formularioValido = false;
        }

        // Si algún campo es inválido, muestra una alerta general
        if (!formularioValido) {
            alert("mi pagina mis reglas le faltan datos por llenar >:(.");
        }

        return formularioValido;  // Devuelve si el formulario es válido o no
    }

    // Evitar el envío del formulario por defecto (para poder validarlo primero)
    formulario.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevenir el envío por defecto

        // Recolecta los datos y los valida antes de enviarlos
        if (validarFormulario()) {
            console.log("Formulario enviado correctamente.");  // Muestra un mensaje en la consola al ser válido

            const datos = {
                nombres: nombres.value,
                apellidos: apellidos.value,
                edad: edad.value,
                direccion: direccion.value,
                numero: telefono.value,
                tamano: tamano.value,
                perro: vdog,  // La preferencia de edad del perro
                motivo: motivo.value,
                acepto: acepto.checked  // Estado del checkbox "acepto"
            };

            try {
                // Intenta guardar los datos en la base de datos (Firebase, según se asume)
                await agregarDatos(datos);
                alert("Datos enviados exitosamente. ya nomas le llega su perrito");  // Mensaje de éxito
                // Limpiar el formulario después de enviar los datos
                formulario.reset();  // Restablece todos los campos a sus valores por defecto

            } catch (error) {
                console.error("Error al enviar los datos:", error);  // Muestra un mensaje de error en consola
                alert("Hubo un problema al enviar los datos. Por favor, inténtalo nuevamente.");
            }
        }
    });
});
