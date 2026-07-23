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

    // Verificar si estamos creando o actualizando
    if (clienteSeleccionado == null) {
        // Si NO existe (clienteSeleccionado es null) -> Crear
        let nuevoCliente = {
            cedula: valCedula,
            nombre: valNombre,
            apellido: valApellido,
            ingresos: valIngresos,
            egresos: valEgresos
        };
        clientes.push(nuevoCliente);
    } else {
        // Si existe (clienteSeleccionado tiene datos) -> Actualizar (excepto cédula)
        clienteSeleccionado.nombre = valNombre;
        clienteSeleccionado.apellido = valApellido;
        clienteSeleccionado.ingresos = valIngresos;
        clienteSeleccionado.egresos = valEgresos;
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
    }
}

function buscarClienteCredito(){

}