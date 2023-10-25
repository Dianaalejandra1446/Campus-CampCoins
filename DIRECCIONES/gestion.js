const d = document;

d.addEventListener("DOMContentLoaded", () => {
    delegateEvents();
})


let campers;

let idDad;
let saveData = localStorage.getItem('campers');// Llamar al localStorage Key campers
//Validacion saveData
if(saveData == null || saveData === undefined){
    campers = [];
}else{
    campers = JSON.parse(saveData);
}
//ID CAMPERS(modificar Camper)
let saveID = localStorage.getItem('id');
let idGlobal;
if(saveID = null || !saveID){
    localStorage.setItem('id','0');
    idGlobal = '0'//El id comienza en 0 si no hay datos 
}else{
    idGlobal = saveID
}

if(campers){
    let contenedor = d.getElementById('camperNuevo');
    contenedor.innerHTML = '';
    for (let i = 0; i < campers.length; i++) {
        const Camp = campers[i];
        //Id por camper
        let id = campers[i].id
        contenedor.innerHTML += `<div id="contenedor-campers" camper-set=${id}>
        <tr>
        <td>${Camp.nombre}</td>
        <td>${Camp.identificacion}</td>
        <td>${Camp.telefono}</td>
        <td>${Camp.correo}</td>
        <td>${Camp.grupo}</td>
        <td>${Camp.campcoins}</td>
        <td><button type = "button" type="button" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#update" data-bs-whatever="@getbootstrap" id="editar" >Editar</button></td>
        <td><button onclick = deleteCamp(${i})>Eliminar</button></td>
        </tr>
        </div>`
    }
}

function add(){
    let actuallyID = parseInt(localStorage.getItem("id"));//Llamamos LS del id
    if(isNaN(actuallyID)){ //Validar que sea un numero
        actuallyID = 0; 
    }

    let id = actuallyID + 1 //Aumento de Id
    let nombre = d.getElementById('nombre'); 
    let identificacion = d.getElementById('identificacion'); 
    let telefono = d.getElementById('telefono'); 
    let correo = d.getElementById('correo'); 
    let grupo = d.getElementById('grupo'); 
    let campcoins = d.getElementById('campcoins');
    
    //Objeto Camper
    let camper = {
        id,
        nombre: nombre.value,
        identificacion:identificacion.value,
        telefono:telefono.value,
        correo:correo.value,
        grupo: grupo.value,
        campcoins: campcoins.value
    }
    campers.push(camper);//Se sube el camper individual al listado
    localStorage.setItem('campers',JSON.stringify(campers));//Enviamos los campers al json
    localStorage.setItem("id",`${id}` )
    view()
    d.getElementById('nombre').value = '';
    d.getElementById('identificacion').value = '';
    d.getElementById('telefono').value = '';
    d.getElementById('correo').value = ''; 
    d.getElementById('grupo').value = '';
    d.getElementById('campcoins').value = '';
    d.getElementById('camperNuevo').value = ''; 
    delegateEvents() 
}
function view(){
    let contenedor = d.getElementById('camperNuevo');
    contenedor.innerHTML = '';
    for (let i = 0; i < campers.length; i++) {
        const Camp = campers[i];
        //Id por camper
        let id = campers[i].id
        contenedor.innerHTML += `<div id="contenedor-campers" camper-set=${id}>
        <tr>
        <td>${Camp.nombre}</td>
        <td>${Camp.identificacion}</td>
        <td>${Camp.telefono}</td>
        <td>${Camp.correo}</td>
        <td>${Camp.grupo}</td>
        <td>${Camp.campcoins}</td>
        <td><button type = "button" type="button" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#update" data-bs-whatever="@getbootstrap"id="editar" >Editar</button></td>
        <td onclick = deleteCamp(${i}) ><button>Eliminar</button></td>
        </tr>
        </div>`
    }
    /* Al boton se le agregan los elementos del modal para un modal editar */
}
function deleteCamp (index){
    if(confirm("¿Estas seguro de eliminar este camper?")){
        campers.splice(index,1)
        let actuallyID = parseInt(localStorage.getItem('id'));
        if(!isNaN(actuallyID)&& actuallyID > 0){
            actuallyID--;
            localStorage.setItem('id', saveID.toString());
        }
        localStorage.setItem('campers', JSON.stringify(campers));
        view();
    }
}
function search(){
    let buscar = d.getElementById('buscar').value;
    if(buscar.trim() === ""){
        return;
    }
    let find = [];

    for (let i = 0; i < campers.length; i++) {
        //Find nombre
        if(campers[i].nombre.toLowerCase().includes(buscar.toLowerCase())){
            find.push(campers[i]);
        }
        //Find identificacion
        else if(campers[i].identificacion.includes(buscar.toLowerCase())){
            find.push(campers[i])
        }else {
            alert('Camper no encontrado')
        }

    }
    //Modifica contenedor
    //Queda el contenedor vacio y muestra lo que queremos buscar
    const camperNuevo = d.getElementById('camperNuevo');
    camperNuevo.innerHTML = '';

    if(find.length > 0) {
        for (let i = 0; i < find.length; i++) {
            const camper = find[i];
            //Creamos otra tabla
            const tr = d.createElement('tr');
            tr.innerHTML = `
            <tr>
                <td>${camper.nombre}</td>
                <td>${camper.identificacion}</td>
                <td>${camper.telefono}</td>
                <td>${camper.correo}</td>
                <td>${camper.grupo}</td>
                <td>${camper.campcoins}</td>
                <td><button type = "button" type="button" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#update" data-bs-whatever="@getbootstrap" id="editar" >Editar</button></td>
                <td onclick = deleteCamp(${i}) ><button>Eliminar</button></td>
            </tr>
            `;
            camperNuevo.appendChild(tr);   
        }
    }
}
function delegateEvents(){
    const buttonsUpdate = d.querySelectorAll('#editar');
    buttonsUpdate.forEach(button => {
        button.addEventListener('click', (e) => content (e))
    })

    const buttonUpdateInto = d.querySelectorAll("#updateContent");
    buttonUpdateInto.forEach(button => {
        button.addEventListener('click', Modify)
    })
}
function content(e) {
    let Object = ["nombre", "identificacion", "telefono", "correo", "grupo", "campcoins"]
    let Dad = e.target.parentNode;
    idDad = Dad.dataset.set;
    let campers = JSON.parse(localStorage.getItem("campers"));
    let camper = campers.filter(camper => camper.id == idDad);
    for(let x = 0; x < 6; x++){
        let element = d.querySelector(`[name = "${Object[x]}"]`);
        let updateValue = camper[0][Object[x]]
        element.value = updateValue;
    }   
}

//funcion contenido,delegarEventos
function Modify(){
    
    //Contenido del objeto
    let Object = ["nombre", "identificacion", "telefono", "correo", "grupo", "campcoins"]
    let ObjectPrin = {}
    //Recorre el ObjetPrin y asigna name
    for (let x = 0; x < 6; x++) {
        let element = d.querySelector(`[name = "${Object[x]}"]`).value;
        ObjectPrin[Object[x]] 
        = element;
    }
    let campers = JSON.parse(localStorage.getItem("campers"));
    let change = []
    for (let i = 0; i < campers.length; i++) {
        if(campers[i].id == idDad){
            console.log(true)
            for (let prop in ObjectPrin) {
                campers[i][prop] = ObjectPrin[prop]
                change = campers
            }
        }
    }
    localStorage.setItem("campers", JSON.stringify(change));
    view()

}


const btnAgregar = d.getElementById('agregar');
btnAgregar.addEventListener('click', add)

const btnBuscar = d.getElementById('btnBuscar');
btnBuscar.addEventListener('click',search)
