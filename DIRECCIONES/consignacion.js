document.addEventListener("DOMContentLoaded", function () {
    const d = document;

    //LocalStrorage
    let consignacion;
    const GuardarConsignacion = localStorage.getItem("consignacion");
    //Si la lista es nula muestreme el listado 
    if (GuardarConsignacion == null || GuardarConsignacion === undefined) {
        compras = [] // Revisar bien que sean las mismas variables
    } else {
        // Parsear el valor almacenado como un array
        compras = JSON.parse(GuardarConsignacion);
    }
    const listaCampers = JSON.parse(localStorage.getItem('campers'))
    const listaConceptos = JSON.parse( localStorage.getItem('conceptos'))


    // Restaurar el contenido de contenedorCliente desde localStorage si existe
    const contenedorCamper = d.getElementById('info-camper');
    const camperResumen = JSON.parse(localStorage.getItem('camperResumen'));
    if (camperResumen) {
        contenedorCliente.innerHTML = clienteResumen;
    }

    // Restaurar el contenido de contenedorCompra desde localStorage si existe
    const contenedorCompra = d.getElementById('sumatoria');
    const compraResumen = JSON.parse(localStorage.getItem('compraResumen'));
    if (compraResumen) {
        contenedorCompra.innerHTML = compraResumen;
    }
});