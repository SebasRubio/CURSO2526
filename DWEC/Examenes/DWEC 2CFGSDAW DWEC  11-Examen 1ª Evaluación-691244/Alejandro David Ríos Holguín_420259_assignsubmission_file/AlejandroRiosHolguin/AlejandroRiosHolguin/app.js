let formulario = document.querySelector('#nueva-cita');
let listaCitas = document.querySelector('#citas');
Lista = [];

document.addEventListener('DOMContentLoaded', () =>{
    eventListener();
})

function eventListener(){
    formulario.addEventListener('submit', agregarCita);
    listaCitas.addEventListener('click', eliminarUeditar);
}

function agregarCita(e){
    e.preventDefault();

    let campoNombre = formulario.querySelector('#mascota').value;
    let campoPropietario = formulario.querySelector('#propietario').value;
    let campoTelef = formulario.querySelector('#telefono').value;
    let campoFecha = formulario.querySelector('#fecha').value;
    let campoHora = formulario.querySelector('#hora').value;
    let campoSintoma = formulario.querySelector('#sintomas').value;

    if(campoNombre!=='' && campoPropietario!=='' && campoTelef!=='' && campoFecha!=='' && campoHora!=='' && campoSintoma !==''){
        let objCitas = {
        id: Date.now(),
        nombre: campoNombre,
        propietario: campoPropietario,
        telefono: campoTelef,
        hora: campoHora,
        sintoma: campoSintoma
    }

        Lista=[...Lista,objCitas];

        crearCita(Lista);
    }else{
        console.error('ERROR: campo vacío');
        imprimirError();
    }
    
    
}

function crearCita(Lista){
    
    limpiarHTML();

    if(Lista.length > 0){
        Lista.forEach(campo =>{

            let li = document.createElement('li');
            li.classList.add('lista-contenedor')

            let nombreMascota = document.createElement('h1');
            nombreMascota.id='nombreMascota'
            nombreMascota.innerText = campo.nombre;
            
            let propietario = document.createElement('p');
            propietario.innerHTML = `<b>Propietario:</b> ${campo.propietario}`;     //b para negrita

            let telefono = document.createElement('p');
            telefono.innerHTML = `<b>Teléfono:</b> ${campo.telefono}`;

            let hora = document.createElement('p');
            hora.innerHTML = `<b>Hora:</b> ${campo.hora}`;

            let sintoma = document.createElement('p');
            sintoma.innerHTML = `<b>Sintoma:</b> ${campo.sintoma}`;

            let div = document.createElement('div');

            let btEliminar = document.createElement('button');
            btEliminar.classList.add('btn');
            btEliminar.innerText='ELIMINAR x'
            btEliminar.classList.add('btn-danger')
            btEliminar.classList.add('boton-Eliminar');
            btEliminar.id = campo.id;

            let btEditar = document.createElement('button');
            btEditar.classList.add('btn');
            btEditar.classList.add('btn-success');
            btEditar.classList.add('boton-Editar');
            
            btEditar.innerText='EDITAR l'
            //El cambio  a btn-outline-info

            div.appendChild(btEliminar);
            div.appendChild(btEditar);

            li.appendChild(nombreMascota);
            li.appendChild(propietario);
            li.appendChild(telefono);
            li.appendChild(hora);
            li.appendChild(sintoma);
            li.appendChild(div)
            

            listaCitas.appendChild(li);

        })
    }
}

function eliminarUeditar(e){

    if (e.target.classList.contains('boton-Eliminar')) {

        let botonId = Number(e.target.id);
        Lista = Lista.filter(boton => boton.id !== botonId);
        crearCita(Lista);

    }
    else if (e.target.classList.contains('boton-Editar')) {
        
        let boton = e.target;
        boton.classList.remove('btn-succes');
        boton.classList.toggle('btn-info')

        Lista.forEach(campo =>{

        })

        

        /*
        let campoPropietario = formulario.querySelector('#propietario');
        let campoTelef = formulario.querySelector('#telefono');
        let campoFecha = formulario.querySelector('#fecha');
        let campoHora = formulario.querySelector('#hora');
        let campoSintoma = formulario.querySelector('#sintomas');
        */

    }
}

function imprimirError(){
    let h1 = document.createElement('h1');
    h1.innerText='ERROR: hay campos vacios';
    h1.classList.add('text-center')
    h1.classList.add('titulo')

    let titulo = document.querySelector('.titulo')

    titulo.after(h1);
}

function limpiarHTML(){
    while (listaCitas.firstChild) {
        listaCitas.removeChild(listaCitas.firstChild);
    }
}