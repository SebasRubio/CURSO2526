const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');
const titulo = document.querySelector('.titulo');

let editado = false;
let citas= [];

// Objeto cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora:'',
    sintomas:'',

};

// Escuchadores
eventListeners();
function eventListeners(){
    formulario.addEventListener('submit', nuevaCita);
    formulario.addEventListener('input', datosCita );
}

// Guardar los datos
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

// Enseñar el mensaje
function mostrarMensaje(mensaje, tipo) {
    const advertencia = document.createElement('div');
    advertencia.classList.add('alert');

    if (tipo === 'error') {
        advertencia.classList.add('alert-danger');
    } else {
        advertencia.classList.add('alert-success');
    }

    advertencia.textContent = mensaje;

    const contenedor = document.querySelector('h2.titulo');
    contenedor.insertAdjacentElement('afterend', advertencia);
    
    // Que la alerta desaparezca
    setTimeout(() => advertencia.remove(), 2000); // 2 seg
}

function nuevaCita(e) {
    e.preventDefault();

    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    // campos vacios
    if ([mascota, propietario, telefono, fecha, hora, sintomas].includes('')) {
    mostrarMensaje('Todos los campos son obligatorios', 'error');
    return;
  }
// Nueva cita
  if (editado) {
    citas = citas.map(cita => cita.id === citaObj.id ? { ...citaObj } : cita);
    mostrarMensaje('Cita actualizada correctamente');
    formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';
    formulario.querySelector('button[type="submit"]').classList.remove('btn-warning');
    formulario.querySelector('button[type="submit"]').classList.add('btn-success');
    editando = false;
  } else {
    // Crear nueva cira
    citaObj.id = Date.now();
    citas.push({...citaObj});
    mostrarMensaje('Su cita a sido agregada')
  }

  // Reinicia el formulario para mostrar las citas
  formulario.reset();
  reiniciarObjeto();
  mostrarCitas();

}

// Esto es para que se vacie el objeto
function reiniciarObjeto() {
    for (let prop in citaObj){
        citaObj [prop] = '';
    }
}

function mostrarCitas() {
    limpiarHTML();

    citas.forEach(cita => {
        const { mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

        const divCita = document.createElement('li');
        divCita.classList.add('cita');
        divCita.dataset.id;

        divCita.innerHTML = `
         <p><span>Mascota:</span> ${mascota}</p>
         <p><span>Propietario:</span> ${propietario}</p>
         <p><span>Teléfono:</span> ${telefono}</p>
         <p><span>Fecha:</span> ${fecha}</p>
         <p><span>Hora:</span> ${hora}</p>
         <p><span>Síntomas:</span> ${sintomas}</p>
        `;

        //Boton de eliminar
        const botonEliminar = document.createElement('button');
        botonEliminar.classList.add('btn');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => eliminarCita(id);

        

        divCita.appendChild(botonEliminar);
        

        contenedorCitas.appendChild(divCita);
    });
}

// Limpia la lista antes de volver a pintar
function limpiarHTML() {
  while (contenedorCitas.firstChild) {
    contenedorCitas.removeChild(contenedorCitas.firstChild);
  }
}

// Eliminar cita
function eliminarCita(id) {
  citas = citas.filter(cita => cita.id !== id);
  mostrarCitas();
  mostrarMensaje('Cita eliminada correctamente');
}

// Cargar cita para edición
function cargarEdicion(cita) {
  const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

  document.querySelector('#mascota').value = mascota;
  document.querySelector('#propietario').value = propietario;
  document.querySelector('#telefono').value = telefono;
  document.querySelector('#fecha').value = fecha;
  document.querySelector('#hora').value = hora;
  document.querySelector('#sintomas').value = sintomas;

  citaObj.mascota = mascota;
  citaObj.propietario = propietario;
  citaObj.telefono = telefono;
  citaObj.fecha = fecha;
  citaObj.hora = hora;
  citaObj.sintomas = sintomas;
  citaObj.id = id;

  
  formulario.querySelector('button[type="submit"]').classList.remove('btn-success');
  formulario.querySelector('button[type="submit"]').classList.add('btn-warning');

  editando = true;
}







