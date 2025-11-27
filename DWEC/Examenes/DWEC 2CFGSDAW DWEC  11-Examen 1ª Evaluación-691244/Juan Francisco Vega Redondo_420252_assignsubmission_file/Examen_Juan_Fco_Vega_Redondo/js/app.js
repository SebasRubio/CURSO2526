// Declaracion variables
const formulario = document.querySelector('#nueva-cita');
const listacitas = document.querySelector('#citas');
const nombremascota = document.querySelector('#mascota');
const nombrepropietario = document.querySelector('#propietario');
const telefonopropietario = document.querySelector('#telefono');
const fechacita = document.querySelector('#fecha');
const horacita = document.querySelector('#hora');
const sintomasmascota = document.querySelector('#sintomas');
const arraycitas = [];
const notificacion = document.querySelector('.titulo');
const botoncrearcita = document.querySelector('.btn-success');

// Eventlisteners
registrareventlistener();

function registrareventlistener() {
    formulario.addEventListener('submit', citanueva);
}

// Funciones
function citanueva(e) {
    e.preventDefault();

    nombre = nombremascota.value;
    propietario = nombrepropietario.value;
    telefono = telefonopropietario.value;
    fecha = fechacita.value;
    hora = horacita.value;
    sintomas = sintomasmascota.value;

    if ((nombre == "") || (propietario == "") || (telefono == "") || (fecha == "") || (hora == "") || (sintomas == "")) {

        const alertaerror = document.createElement('h4');
        alertaerror.textContent = "Todos los campos son obligatorios";
        notificacion.appendChild(alertaerror);
        return;
    } else {

        const alertaacierto = document.createElement('h4');
        alertaacierto.textContent = "Los campos introducidos son válidos";
        notificacion.appendChild(alertaacierto);

        const cita = {
            nombre,
            propietario,
            telefono,
            fecha,
            hora,
            sintomas,
            id: Date.now()
        }

        añadircitas(cita);
        mostrarcitas(arraycitas);
        formulario.reset();

    }
}

function añadircitas(cita) {
    limpiarHTML();
    arraycitas.push(cita);
}

function eliminarcitas(idcita) {
    arraycitasnuevo = arraycitas.filter(cita => cita.id !== idcita);
    mostrarcitas(arraycitasnuevo);
    
}

function editarcitas(idcita) {
    const citamodificar = arraycitas.find(cita => cita.id === idcita);

    nombremascota.value = citamodificar.nombre;
    nombrepropietario.value = citamodificar.propietario;
    telefonopropietario.value = citamodificar.telefono;
    fechacita.value = citamodificar.fecha;
    horacita.value = citamodificar.hora;
    sintomasmascota.value = citamodificar.sintomas;

    botoncrearcita.textContent = "Editar Cita";
    botoncrearcita.style.backgroundColor = "red";
    botoncrearcita.onclick = () => {
        añadircitas(citamodificar);           
    }

}


function mostrarcitas(array) {
    limpiarHTML();

    array.forEach(cita => {

        const { nombre, propietario, telefono, fecha, hora, sintomas, id } = cita;

        const elementolista = document.createElement('li');
        elementolista.classList.add('list-group-item');
        elementolista.dataset.id = id;
        elementolista.innerHTML = `
                <h3 class="text-primary">🐾 ${nombre}</h3>
                <p><strong>Propietario:</strong> ${propietario}</p>
                <p><strong>Teléfono:</strong> ${telefono}</p>
                <p><strong>Fecha:</strong> ${fecha}</p>
                <p><strong>Hora:</strong> ${hora}</p>
                <p><strong>Síntomas:</strong> ${sintomas}</p>
        `;

        const botoneliminar = document.createElement('button');
        botoneliminar.classList.add('btn');
        botoneliminar.textContent = 'Eliminar';
        botoneliminar.onclick = () => eliminarcitas(id);

        const botoneditar = document.createElement('button');
        botoneditar.classList.add('btn');
        botoneditar.textContent = 'Editar';
        botoneditar.onclick = () => editarcitas(id);

        elementolista.appendChild(botoneliminar);
        elementolista.appendChild(botoneditar);
        listacitas.appendChild(elementolista);

    });
}


function limpiarHTML() {
    while (listacitas.firstChild) {
        listacitas.removeChild(listacitas.firstChild);
    }
}

