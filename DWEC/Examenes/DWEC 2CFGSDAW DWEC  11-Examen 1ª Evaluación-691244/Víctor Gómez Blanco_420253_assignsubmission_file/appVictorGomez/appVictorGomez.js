// Variables
const nuevaCita = document.querySelector("#nueva-cita");
const listaCitas = document.querySelector("#citas");
let citas =[];

// Event Listeners
eventListeners();
function eventListeners() {
    // Cuando usuario agrega un nuevo tweet
    nuevaCita.addEventListener("submit", agregarCita);
}

// Añadir cita
function agregarCita(e) {

     e.preventDefault();

     // leer el valor del textarea
    const mascota = document.querySelector('#mascota').value;
     // validación
    if(mascota === '') {
          mostrarError('Un mensaje no puede ir vacio');
          return;
    }
    console.log(mascota);
    // leer el valor del textarea
    const propietario = document.querySelector('#propietario').value;
     // validación
    if(propietario === '') {
          mostrarError('Un mensaje no puede ir vacio');
          return;
    }
    console.log(propietario);
     // leer el valor del textarea
     const telefono = document.querySelector('#telefono').value;
     // validación
    if(telefono === '') {
          mostrarError('Un mensaje no puede ir vacio');
          return;
    }
    console.log(telefono);
    // leer el valor del textarea
     const fecha = document.querySelector('#fecha').value;
     // validación
    if(fecha === '') {
          mostrarError('Un mensaje no puede ir vacio');
          return;
    }
    console.log(fecha);
     // leer el valor del textarea
     const hora = document.querySelector('#hora').value;
     // validación
    if(hora === '') {
          mostrarError('Un mensaje no puede ir vacio');
          return;
    }
    console.log(hora);
     // leer el valor del textarea
     const sintomas = document.querySelector('#sintomas').value;
     // validación
    if(sintomas === '') {
          mostrarError('Un mensaje no puede ir vacio');
          return;
    }
    console.log(sintomas);

    // Crear un objeto Cita
    const citaObj = {
        id: Date.now(),
        mascota: mascota,
        propietario: propietario,
        telefono: telefono,
        fecha: fecha,
        hora: hora,
        sintomas: sintomas
    }
    console.log(citaObj);
    // Añadirlo a mis citas
    citas = [...citas, citaObj];
    console.log(citas);
     
    // Una vez agregado, mandamos renderizar nuestro HTML
    crearHTML();

    console.log("Agregar cita funcionando....")

    // Reiniciar el formulario
    nuevaCita.reset();

}

//FUncion editar cita
function editarCita(e){

    const mascota = document.querySelector('#mascota');
    mascota.value = e.mascota;
    const propietario = document.querySelector('#propietario');
    propietario.value = e.propietario;
    const telefono = document.querySelector('#telefono');
    telefono.value = e.telefono;
    const fecha = document.querySelector('#fecha');
    fecha.value = e.fecha;
    const hora = document.querySelector('#hora');
    hora.value = e.hora;
    const sintomas = document.querySelector('#sintomas');
    sintomas.value = e.sintomas;

}

//FUncion de errores
function mostrarError(error) {
    const mensajeEerror = document.createElement('p');
    mensajeEerror.textContent = error;
    mensajeEerror.classList.add('error');

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeEerror);

    setTimeout(() => {
        mensajeEerror.remove();
    }, 3000);
    console.log("Error funcionando...")
}

// Creamos HTML
function crearHTML() {
    
    limpiarHTML();
     
    if(citas.length > 0 ) {
        citas.forEach( cita =>  {
    
            // Crear elemento y añadirle el contenido a la lista

            const li = document.createElement('li');

            // Añade el texto
            li.innerText = `Mascota: ${cita.mascota}\nPropietario: ${cita.propietario}\nTelefono: ${cita.telefono}\nFecha: ${cita.fecha}\nHora: ${cita.hora}\nSintomas: ${cita.sintomas}\n`;

            // Crear botón de eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.classList = 'btn btn-danger';
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.addEventListener('click', function() {
                li.remove();
            });
            // Crear botón de editar
            const btnEditar = document.createElement('button');
            btnEditar.classList = 'btn btn-info';
            btnEditar.textContent = 'Editar';
            btnEditar.addEventListener('click', function() {
                editarCita(cita);
            });
    
            // Agregar botón al li
            li.appendChild(btnEliminar);
            li.appendChild(btnEditar);

            // añade un atributo único...
            li.dataset.citaId = cita.id;

            // añade la cita a la lista
            listaCitas.appendChild(li);
            });
    }

}

// Elimina los cursos del carrito en el DOM
function limpiarHTML() {
    while(listaCitas.firstChild) {
        listaCitas.removeChild(listaCitas.firstChild);
    }
}