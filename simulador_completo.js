let clientes = [];
let creditos = [];

let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;

function ocultarSecciones() {
    // Se obtiene cada sección y se le quita la clase "activa"
    document.getElementById("parametros").classList.remove("activa");
    document.getElementById("clientes").classList.remove("activa");
    document.getElementById("credito").classList.remove("activa");
    document.getElementById("contacto").classList.remove("activa");
    document.getElementById("listaCreditos").classList.remove("activa");
}

function mostrarSeccion(id) {
    //Invocar ocultarSecciones() para limpiar la pantalla
    ocultarSecciones();
    //Agregar la clase activa solo a la sección indicada por el parámetro
    document.getElementById(id).classList.add("activa");
}

function guardarTasa() {
    // Obtener el valor y convertirlo a número usando tu utilitario
    let tasaIngresada = recuperarInt("tasaInteres");

    // Validar que esté entre 10 y 20
    if (tasaIngresada >= 10 && tasaIngresada <= 20) {
        //Si es válido, guardamos en la variable global y mostramos mensaje
        tasaInteres = tasaIngresada;
        mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + tasaInteres + "%");
    } else {
        // Si no es válido, mostramos el mensaje de error
        mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
    }
}

function limpiar() {
    // Vaciar todos los inputs usando la función del archivo utilitarios
    mostrarTextoEnCaja("txtCedula", "");
    mostrarTextoEnCaja("txtNombre", "");
    mostrarTextoEnCaja("txtApellido", "");
    mostrarTextoEnCaja("txtIngresos", "");
    mostrarTextoEnCaja("txtEgresos", "");
    mostrarTextoEnCaja("txtCorreo", "");
    
    // Limpiar la variable global de selección
    clienteSeleccionado = null;
}

function buscarCliente(cedula) {
    // Recorrer el arreglo para buscar coincidencia
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].cedula === cedula) {
            return clientes[i]; // Retorna el cliente si existe
        }
    }
    return null; // Retorna null si no lo encuentra
}

function guardarCliente() {
    // Obtener datos del formulario
    let valCedula = recuperaraTexto("txtCedula");
    let valNombre = recuperaraTexto("txtNombre");
    let valApellido = recuperaraTexto("txtApellido");
    let valIngresos = recuperarFloat("txtIngresos");
    let valEgresos = recuperarFloat("txtEgresos");
    let valCorreo = recuperaraTexto("txtCorreo"); 

    // Verificar si estamos creando o actualizando
    if (clienteSeleccionado == null) {
        // Si NO existe (clienteSeleccionado es null) -> Crear
        let nuevoCliente = {
            cedula: valCedula,
            nombre: valNombre,
            apellido: valApellido,
            ingresos: valIngresos,
            egresos: valEgresos,
            correo: valCorreo
        };
        clientes.push(nuevoCliente);
    } else {
        // Si existe (clienteSeleccionado tiene datos) -> Actualizar (excepto cédula)
        clienteSeleccionado.nombre = valNombre;
        clienteSeleccionado.apellido = valApellido;
        clienteSeleccionado.ingresos = valIngresos;
        clienteSeleccionado.egresos = valEgresos;
        clienteSeleccionado.correo = valCorreo;
    }

    // Al final, repintamos la tabla y limpiamos el formulario
    pintarClientes();
    limpiar();
}

function pintarClientes() {
    // Recuperamos el cuerpo de la tabla
    let tbody = document.getElementById("tablaClientes");
    let filas = "";
    
    // Recorremos el arreglo
    for (let i = 0; i < clientes.length; i++) {
        let cliente = clientes[i];
        
        filas += "<tr>";
        filas += "<td>" + cliente.cedula + "</td>";
        filas += "<td>" + cliente.nombre + "</td>";
        filas += "<td>" + cliente.apellido + "</td>";
        filas += "<td>" + cliente.ingresos + "</td>";
        filas += "<td>" + cliente.egresos + "</td>";
        filas += "<td>" + cliente.correo + "</td>";
        
        // Botón Actualizar usando la combinación de comillas del archivo de ejemplo
        filas += "<td><button onclick=\"seleccionarCliente('" + cliente.cedula + "')\">Actualizar</button></td>";
        
        filas += "</tr>";
    }
    
    // Insertamos las filas generadas en el HTML
    tbody.innerHTML = filas;
}

function seleccionarCliente(cedula) {
    // 1. Buscar el cliente usando la función
    let clienteEncontrado = buscarCliente(cedula);

    if (clienteEncontrado != null) {
        // 2. Guardarlo en la variable global clienteSeleccionado
        clienteSeleccionado = clienteEncontrado;

        // 3. Mostrar datos en inputs usando los utilitarios
        mostrarTextoEnCaja("txtCedula", clienteEncontrado.cedula);
        mostrarTextoEnCaja("txtNombre", clienteEncontrado.nombre);
        mostrarTextoEnCaja("txtApellido", clienteEncontrado.apellido);
        mostrarTextoEnCaja("txtIngresos", clienteEncontrado.ingresos);
        mostrarTextoEnCaja("txtEgresos", clienteEncontrado.egresos);
        mostrarTextoEnCaja("txtCorreo", clienteEncontrado.correo);
    }
}

function buscarClienteCredito() {
    // Tomar el valor ingresado en el campo de cédula usando el utilitarios.js
    let cedula = recuperaraTexto("buscarCedulaCredito");

    // Buscar el cliente dentro del arreglo de clientes
    let clienteEncontrado = buscarCliente(cedula);

    // Recuperamos el componente donde vamos a pintar los datos
    let divDatos = document.getElementById("datosClienteCredito");

    // Evaluar si existe o no
    if (clienteEncontrado != null) {
        // Guardamos el cliente en la variable global para usarlo en el cálculo más adelante
        clienteSeleccionado = clienteEncontrado;

        divDatos.innerHTML = 
            "<h3>Datos del Cliente</h3>" +
            "<p><strong>Cédula: </strong>" + clienteEncontrado.cedula + "</p>" +
            "<p><strong>Nombre: </strong>" + clienteEncontrado.nombre + "</p>" +
            "<p><strong>Apellido: </strong>" + clienteEncontrado.apellido + "</p>" +
            "<p><strong>Ingresos: </strong>" + clienteEncontrado.ingresos + "</p>" +
            "<p><strong>Egresos: </strong>" + clienteEncontrado.egresos + "</p>" +
            "<p><strong>Correo: </strong>" + clienteEncontrado.correo + "</p>";
    } else {
        // Si no existe, limpiamos la variable global y mostramos un mensaje
        clienteSeleccionado = null;
        divDatos.innerHTML = "<h3>Cliente no encontrado</h3>";
    }
}

function calcularCredito() {
    // Validar que se haya buscado un cliente primero
    if (clienteSeleccionado == null) {
        alert("Por favor, busque un cliente válido primero.");
        return;
    }

    // Obtener los datos de monto y plazo usando el utilitario.js
    let monto = recuperarFloat("montoCredito");
    let plazo = recuperarInt("plazoCredito");

    // Guardamos en las variables globales para usarlas luego en el guardado
    montoCalculado = monto;
    plazoCalculado = plazo;

    // Cálculos del crédito
    let capacidadPago = clienteSeleccionado.ingresos - clienteSeleccionado.egresos;
    
    let interes = monto * (tasaInteres / 100);
    let totalPagar = monto + interes;
    let cuotaMensual = totalPagar / plazo;

    // Guardamos la cuota globalmente
    cuotaCalculada = cuotaMensual;

    // Determinar si es aprobado o rechazado y controlar el botón
    let resultadoTexto = "";
    let estiloClase = "";
    let btnAsignar = document.getElementById("btnAsignarCredito");

    if (cuotaMensual <= capacidadPago) {
        resultadoTexto = "APROBADO";
        estiloClase = "aprobado"; // Clase CSS para verde
        btnAsignar.disabled = false; // Se habilita el botón
    } else {
        resultadoTexto = "RECHAZADO";
        estiloClase = "rechazado"; // Clase CSS para rojo
        btnAsignar.disabled = true; // Se deshabilita el botón
    }

    // Mostrar el resultado y aplicar estilos
    let divResultado = document.getElementById("resultadoCredito");
    
    divResultado.innerHTML = 
        "Capacidad de pago: " + capacidadPago + "<br>" +
        "Total a pagar: " + totalPagar.toFixed(2) + "<br>" +
        "Cuota mensual: " + cuotaMensual.toFixed(2) + "<br>" +
        "RESULTADO: " + resultadoTexto;
        
    divResultado.className = estiloClase;
}

function asignarCredito() {
    // Crear el objeto con la estructura solicitada
    let credito = {
        cedula: clienteSeleccionado.cedula,
        nombre: clienteSeleccionado.nombre,
        apellido: clienteSeleccionado.apellido,
        monto: montoCalculado,
        tasa: tasaInteres,
        plazo: plazoCalculado,
        cuota: cuotaCalculada
    };

    // Agregar el objeto al arreglo de créditos
    creditos.push(credito);
    
    // Mensaje opcional para saber que funcionó
    alert("Crédito asignado correctamente al cliente " + clienteSeleccionado.nombre);
}


function buscarCreditos(cedula) {
    // 1. Crear un arreglo vacío para guardar los resultados
    let creditosEncontrados = [];

    // 2. Recorrer el arreglo global de créditos
    for (let i = 0; i < creditos.length; i++) {
        // Si la cédula del crédito coincide con la que buscamos, lo guardamos
        if (creditos[i].cedula === cedula) {
            creditosEncontrados.push(creditos[i]);
        }
    }

    // 3. Retornar el arreglo con los resultados
    return creditosEncontrados;
}

function pintarCreditos(arregloCreditos) {
    // Recuperamos el cuerpo de la tabla del historial
    let tbody = document.getElementById("tablaCreditos");
    let filas = "";

    // Recorremos el arreglo que llega por parámetro
    for (let i = 0; i < arregloCreditos.length; i++) {
        let credito = arregloCreditos[i];
        
        filas += "<tr>";
        filas += "<td>" + credito.cedula + "</td>";
        filas += "<td>" + credito.nombre + "</td>";
        filas += "<td>" + credito.apellido + "</td>";
        filas += "<td>" + credito.monto + "</td>";
        filas += "<td>" + credito.tasa + "%</td>";
        filas += "<td>" + credito.plazo + "</td>";
        // Usamos toFixed(2) para que la cuota se vea con dos decimales
        filas += "<td>" + credito.cuota.toFixed(2) + "</td>"; 
        filas += "</tr>";
    }
    
    // Insertamos las filas generadas en el HTML
    tbody.innerHTML = filas;
}

function buscarCreditosCliente() {
    // 1. Tomar el valor de la cédula desde la caja de texto
    // (Asegúrate de que el id sea exactamente el del HTML: buscarCedulaListado)
    let cedula = recuperaraTexto("buscarCedulaListado");

    // 2. Invocar la función buscarCreditos (esto nos devuelve el arreglo filtrado)
    let creditosFiltrados = buscarCreditos(cedula);

    // 3. Enviar el resultado obtenido a la función pintarCreditos
    pintarCreditos(creditosFiltrados);
}