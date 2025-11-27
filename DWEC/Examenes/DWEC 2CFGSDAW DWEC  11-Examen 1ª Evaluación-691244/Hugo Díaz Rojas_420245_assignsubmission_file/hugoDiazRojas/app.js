
const nuevaCita = document.querySelector('#nueva-cita')
const listaCitas = document.querySelector('#citas')

let citas = []

//guardar los datos en un array


eventListeners();


function eventListeners() {
    nuevaCita.addEventListener('submit', crearCita)
    listaCitas.addEventListener('click', borrarCita)
    listaCitas.addEventListener('click', editarCita)
    document.addEventListener('DOMContentLoaded', () => {
        citas = [];
        crearHTML();
    });
}

function crearCita(e) {
    e.preventDefault();

    const id = Date.now
    const nombreMascota = document.querySelector('#mascota').value;
    const nombreDueno = document.querySelector('#propietario').value
    const tlf = document.querySelector('#telefono').value
    const fechaCita = document.querySelector('#fecha').value
    const horaCita = document.querySelector('#hora').value
    const sintom = document.querySelector('#sintomas').value


     

    const cita = [
        id,
        nombreMascota,
        nombreDueno,
        tlf,
        fechaCita,
        horaCita,
        sintom
    ]


    citas = [...citas, cita];

    crearHTML();

    nuevaCita.reset();
    console.log(citas)

    if(cita.length<7) {
          mostrarError('No puede haber campos vacíos');
          return; 
     }
}

function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}


function crearHTML() {
    limpiarHTML();
    console.log(citas)
    if (citas.length > 0) {
        citas.forEach(cita => {
            const botonBorrar = document.createElement('button');
            botonBorrar.innerText = 'Borrar Cita';
            const botonEditar = document.createElement('button')
            botonEditar.innerText='editar cita'
            console.log(cita.nombreDueno)
            const li = document.createElement('li');

            li.innerText = citas.cita

            li.appendChild(botonBorrar);
            li.appendChild(botonEditar)

            listaCitas.appendChild(li);
        });
    }

}

function borrarCita(e) {
    e.preventDefault();

    const id = e.target.parentElement.dataset.citaId;

    citas = citas.filter(cita => cita.id != id);

    crearHTML();
}


function editarCita(e) {
    e.preventDefault();

    const id = e.target.parentElement.dataset.citaId;

    citas = citas.filter(cita => cita.id != id);

    crearHTML();
}


function limpiarHTML() {
    while (listaCitas.firstChild) {
        listaCitas.removeChild(listaCitas.firstChild);
    }
}



