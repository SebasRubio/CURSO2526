const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');
const formulario = document.querySelector('#nueva-cita');
const listaCitas = document.querySelector('#citas');

class Citas {
    constructor() {
        this.citas = [];
    }
    agregarCita(cita) {
        this.citas = [...this.citas, cita];
    }
    eliminarCita(id) {
        this.citas = this.citas.filter(e => e.id !== id);
    }
}

class UI {
    imprimirAlerta(mensaje, tipo) {
        const div = document.createElement('div');
        div.classList.add('text-center', 'alert', 'd-block', 'col-12');
        div.classList.add(tipo === 'error' ? 'alert-danger' : 'alert-success');
        div.textContent = mensaje;

        document.querySelector('#contenido').insertBefore(div, document.querySelector('.agregar-cita'));

        setTimeout(() => div.remove(), 2000);
    }

    mostrarCitas({ citas }) {
        this.limpiarHTML();

        citas.forEach(element => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = element;
            const div = document.createElement('div');
            div.classList.add('cita', 'p-3');
            div.dataset.id = id;

            // Crear elementos de texto
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${propietario}`;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Teléfono: </span> ${telefono}`;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Síntomas: </span> ${sintomas}`;

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar &times';
            btnEliminar.onclick = () => eliminarCita(id);

            div.appendChild(mascotaParrafo);
            div.appendChild(propietarioParrafo);
            div.appendChild(telefonoParrafo);
            div.appendChild(fechaParrafo);
            div.appendChild(horaParrafo);
            div.appendChild(sintomasParrafo);
            div.appendChild(btnEliminar);

            listaCitas.appendChild(div);
        });
    }

    limpiarHTML() {
        while (listaCitas.firstChild) {
            listaCitas.removeChild(listaCitas.firstChild);
        }
    }
}

const ui = new UI();
const administrarCitas = new Citas();

eventListeners();

function eventListeners() {
    mascotaInput.addEventListener('change', datosCita);
    propietarioInput.addEventListener('change', datosCita);
    telefonoInput.addEventListener('change', datosCita);
    fechaInput.addEventListener('change', datosCita);
    horaInput.addEventListener('change', datosCita);
    sintomasInput.addEventListener('change', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
};

function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

function nuevaCita(e) {
    e.preventDefault();

    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    citaObj.id = Date.now();
    administrarCitas.agregarCita({ ...citaObj });
    ui.imprimirAlerta('Cita creada correctamente', 'success');

    formulario.reset();
    reiniciarObj();
    ui.mostrarCitas(administrarCitas);
}

function reiniciarObj() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

function eliminarCita(id) {
    administrarCitas.eliminarCita(id);
    ui.imprimirAlerta('Cita eliminada correctamente', 'success');
    ui.mostrarCitas(administrarCitas);
}
