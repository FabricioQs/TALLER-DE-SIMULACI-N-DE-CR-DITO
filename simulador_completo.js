
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  function ocultarSecciones(){
    // Se obtiene cada sección y se le quita la clase "activa"
    document.getElementById("parametros").classList.remove("activa");
    document.getElementById("clientes").classList.remove("activa");
  }

  function mostrarSeccion(id) {
    //Invocar ocultarSecciones() para limpiar la pantalla
    ocultarSecciones();
    //Agregar la clase activa solo a la sección indicada por el parámetro
    document.getElementById(id).classList.add("activa");
  }

  
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios