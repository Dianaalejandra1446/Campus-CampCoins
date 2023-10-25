const d = document;

let concept;

const Almacenar = localStorage.getItem('conceptos');
//Local storage para el id 
let saveID = localStorage.getItem("id");
/*idGlobal (que se inicializa con el valor de saveID o se establece en "0" si no existe en el almacenamiento local. */
let idGlobal;

if (saveID == null || !saveID) {
    localStorage.setItem("id", "0");
    idGlobal = "0";
} else {
    idGlobal = saveID;
}
//Si la lista es nula muestreme el listado 
if (Almacenar == null || Almacenar === undefined) {
    concept = []; //Revisar bien que sea las mismas variables
} else {
    // Parsear el valor volviendolo objeto js
    concept = JSON.parse(Almacenar);
}

if(concept){
    const container = d.getElementById('container-concepts');
    container.innerHTML = "";
    for (let i = 0; i < concept.length; i++) {
        const newconcept = concept[i];
        container.innerHTML += `
        <div class= "contenedor">
        <h2>Nuevo Concepto:</h2>
        <p>ID: ${newconcept.id}</p>
        <p>${newconcept.concepto}</p>
        <p>${newconcept.valor}</p>
        <button type="button" onclick="deleteConcept(${i})" id ='Eliminar'>Eliminar</button>
        </div>`
        
    }
}

function addConcept(){
     //Obtenemos el numero del valor del ID
     let ObtenerID = parseInt(localStorage.getItem("id"))

     // Verificar si el ID es un número válido
        if (isNaN(ObtenerID)) {
         ObtenerID = 0;
     }
     //Generar un ID incrementando +1
     let id = ObtenerID +1
     
     let Inputconcepto = d.getElementById('Inputconcepto').value;
     let InputValor = d.getElementById('InputValor').value;

     let NewConcept = {
        id,
        concepto: Inputconcepto,
        valor: InputValor
     }
     console.log(Inputconcepto)
     concept.push(NewConcept);

        //Enviar el listado al localstorage
    localStorage.setItem('conceptos', JSON.stringify(concept));

    // Almacenar el nuevo ID en el almacenamiento local
    localStorage.setItem("id", `${id}`);
    viewConcept();
    //Limpiamos los campos del formulario
    d.getElementById('Inputconcepto').value = '';
    d.getElementById('InputValor').value = '';
 }
 function viewConcept(){
    const container = d.getElementById('container-concepts');
    container.innerHTML = "";
    for (let i = 0; i < concept.length; i++) {
        const newconcept = concept[i];
        container.innerHTML += `
        <div class= "contenedor">
        <h2>Nuevo Concepto:</h2>
        <p>ID: ${newconcept.id}</p>
        <p>${newconcept.concepto}</p>
        <p>${newconcept.valor}</p>
        <button type="button" onclick="deleteConcept(${i})" id ='Eliminar'>Eliminar</button>
        </div>`
        
    }
 }
 function deleteConcept(index){
    if (confirm("¿Estas seguro de eliminar el concepto?")) {
        concept.splice(index, 1);//Elimina el elemento en la posicion 'index' del arreglo listado
        let ObtenerID = parseInt(localStorage.getItem("id"));
        if (!isNaN(ObtenerID) && ObtenerID > 0) {
            ObtenerID--;//Para que se decremente 1
            localStorage.setItem("id", ObtenerID.toString());
        }
        localStorage.setItem('conceptos', JSON.stringify(concept));
        viewConcept();
    
    } 
 }
 const buttonAdd = d.getElementById('agregar');
 buttonAdd.addEventListener('click', addConcept)