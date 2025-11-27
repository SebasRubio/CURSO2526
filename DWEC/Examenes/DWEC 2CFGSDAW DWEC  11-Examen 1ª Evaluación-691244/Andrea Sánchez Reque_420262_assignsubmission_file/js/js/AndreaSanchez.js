const formulario = document.querySelector("#nueva-cita");
const listaCitas = document.querySelector("#citas");

const h2 = document.querySelector(".titulo"); 

const contErrores = document.createElement('div');
contErrores.id = 'mensajes-error'; 
contErrores.classList.add('alert', 'alert-danger', 'mt-3', 'text-center');
const body = document.querySelector('body');
body.insertBefore(contErrores, listaCitas.parentElement.parentElement);

let citas = []

registrarEventListener();

function registrarEventListener() {
    formulario.addEventListener("submit", crearCita);
    listaCitas.addEventListener("click", eliminarCita);
    listaCitas.addEventListener("click", editarCita);
}

function crearCita(e) {
    e.preventDefault();

    let nombre = formulario.querySelector("#mascota").value; 
    let propietario = formulario.querySelector("#propietario").value;
    let telefono = formulario.querySelector("#telefono").value;
    let fecha = formulario.querySelector("#fecha").value;
    let hora = formulario.querySelector("#hora").value;
    let sintomas = formulario.querySelector("#sintomas").value;

    if (nombre === '' || propietario === '' || fecha === '') {
        console.error("Todos los campos son obligatorios.");
        return;
    }

    limpiarError();

    let objDatos = {
        nombre: nombre,
        propietario: propietario,
        telefono: telefono,
        fecha: fecha, 
        hora: hora,
        sintomas: sintomas, 
        id: Date.now()
    }

    citas = [...citas, objDatos];
    crearHTML();

    formulario.reset(); 
}

function mostrarError(mensaje) {
    limpiarError();
    contErrores.textContent = mensaje;
}

function limpiarError() {
    contErrores.textContent = '';
}

function crearHTML() {
    limpiarHTML();

    if (citas.length > 0) {
        citas.forEach(cita => {
            let li = document.createElement("li");
            li.dataset.id = cita.id;

            let divContenido = document.createElement('div');

            let nombre = document.createElement("h2");
            nombre.innerText = `Mascota: ${cita.nombre}`;
            divContenido.appendChild(nombre);

            let propietario = document.createElement("p");
            propietario.innerText = `Propietario: ${cita.propietario}`;
            divContenido.appendChild(propietario);

            let telefono = document.createElement("p");
            telefono.innerText = `Teléfono: ${cita.telefono}`;
            divContenido.appendChild(telefono);

            let fecha = document.createElement("p");
            fecha.innerText = `Fecha: ${cita.fecha}`;
            divContenido.appendChild(fecha);

            let hora = document.createElement("p");
            hora.innerText = `Hora: ${cita.hora}`;
            divContenido.appendChild(hora);

            let sintomasCita = document.createElement("p");
            sintomasCita.innerText = `Síntomas: ${cita.sintomas}`;
            divContenido.appendChild(sintomasCita);

            let divBotones = document.createElement('div');

            let btnEliminar = document.createElement("button");
            btnEliminar.classList.add("eliminar");
            btnEliminar.innerText = "ELIMINAR";
            btnEliminar.dataset.id = cita.id;
            divBotones.appendChild(btnEliminar);

            let btnEditar = document.createElement("button");
            btnEditar.classList.add("editar");
            btnEditar.innerText = "EDITAR";
            btnEditar.dataset.id = cita.id;
            divBotones.appendChild(btnEditar);

            li.appendChild(divContenido);
            li.appendChild(divBotones);

            listaCitas.appendChild(li);
        });
    }
}

function eliminarCita(e) {
    e.preventDefault();
    
}

function editarCita(e) {
    e.preventDefault();
    
}

function limpiarHTML() {

}