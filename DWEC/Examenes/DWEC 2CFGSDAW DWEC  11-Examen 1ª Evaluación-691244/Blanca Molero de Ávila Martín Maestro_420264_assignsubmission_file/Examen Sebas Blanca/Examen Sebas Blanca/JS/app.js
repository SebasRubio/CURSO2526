const formulario=document.querySelector("#nueva-cita");
const citas=document.querySelector("#citas");
let mascota = [];

eventListeners();

function eventListeners() {
    formulario.addEventListener('submit', agregarmascota);
    citas.addEventListener('click', eliminarmascota);
    document.addEventListener('DOMContentLoaded', () => {
        mascota = JSON.parse( localStorage.getItem('mascota') ) || []  ;
        console.log(mascota,'Ha sido cargado correctamente');
        crearHTML();
     });
}

function agregarmascota(e) {
    e.preventDefault();

    const nombre = document.querySelector('#mascota').value;
    const propietario = document.querySelector('#propietario').value;
    const telefono = document.querySelector('#telefono').value;
    const fecha = document.querySelector('#fecha').value;
    const hora = document.querySelector('#hora').value;
    const sintomas = document.querySelector('#sintomas').value;

    if (nombre === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        mostrarAlerta('Fatan campos a completar');
        return;
    }

    const citasObj = {
        nombre,
        propietario,
        telefono,
        fecha,
        hora,
        sintomas
    }

    const citas = [citas,citasObj];

    formulario.reset();
}

function eliminarmascota() {}

function mostrarAlerta() {
    const Alerta = document.createElement("p");
    
}

function crearHTML() {}