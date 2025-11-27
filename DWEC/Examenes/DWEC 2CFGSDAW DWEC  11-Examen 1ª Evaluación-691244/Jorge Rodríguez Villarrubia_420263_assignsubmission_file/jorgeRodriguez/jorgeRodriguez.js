const citas = document.querySelector(`#citas`);
const formulario = document.querySelector(`#nueva-cita`);
let citasMascotas = [];

// Event Listeners
eventListeners();

function eventListeners() {
    // Cuando el usuario agrega un nuevo cita
    formulario.addEventListener(`submit`, agregarConsultas);

    // Para eliminar citasMascotas
    citas.addEventListener(`click`, eliminarCitas);
}

// Funciones
function agregarConsultas(e) {
    e.preventDefault();

    // Datos que recogemos del cliente
    const mascota = document.querySelector(`#mascota`).value;
    const propietario = document.querySelector(`#propietario`).value;
    const telefono = document.querySelector(`#telefono`).value;
    const fecha = document.querySelector(`#fecha`).value;
    const hora = document.querySelector(`#hora`).value;
    const sintomas = document.querySelector(`#sintomas`).value;


    // Validación
    if (mascota === `` || propietario === `` || telefono === `` || fecha === `` || hora === `` || sintomas === ``) {
        alert('Por favor, ingrese un gasto y una cantidad válidos.');
        return;
    }
    
    else {
        mostrarError (`Cita realizada`);
        return;
    }

    if (mascota === ``) {
        mostrarError(`Falta el nombre de la mascota`);
        return;
    }

    if (propietario === ``){
        mostrarError(`Falta el nombre del propietario`);
        return;
    }

    if (telefono === ``) {
        mostrarError(`Falta el numero de telefono`);
        return;
    }

    if (fecha === ``) {
        mostrarError(`Falta la fecha`);
        return;
    }

    if (hora === ``) {
        mostrarError(`Falta la hora`);
        return;
    }

    if (sintomas === ``) {
        mostrarError (`Faltan los sintomas`);
        return;
    }

    citasMascotas.push({ mascota, propietario, telefono, fecha, hora, sintomas });

    // Una vez agregado, creamos el HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
}

// Mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement(`p`);
    mensajeError.textContent = error;
    mensajeError.classList.add(`error`);

    // Insertarlo en el Contenido
    const contenido = document.querySelector(`#contenido`);
    contenido.appendChild(mensajeError);

    // Elimina la alerta después de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 10000);
}

// Muestra un listado de los citasMascotas
function crearHTML() {
    limpiarHTML();

    if (citasMascotas.length > 0) {
        citasMascotas.forEach(mascota => {
            //Imprimimos la cita
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            li.textContent = `${mascota} ${propietario} ${telefono} ${fecha} ${hora} ${sintomas}`;

            // Botones eliminar 
            const btnDelete = document.createElement('button');
            btnDelete.classList.add('btn', 'btn-danger', 'btn-sm');
            btnDelete.textContent = 'Eliminar';
            btnDelete.dataset.index = index;
            btnDelete.addEventListener('click', deleteExpense);

            // Boton editar
            const btnModificar = document.createElement('button');
            btnModificar.classList.add('btn', 'btn-alert', 'btn-sm');
            btnModificar.textContent = 'Modificar';
            btnModificar.dataset.index = index;
            btnModificar.addEventListener('click', replace());

            li.appendChild(btnDelete);
            citas.appendChild(li);
        });
    }
}

// Elimina un consulta
function deleteExpense(e) {
    const mascotaBorrar = mascota(e.target.dataset.index);
    const propietarioBorrar = propietario(e.target.dataset.index);
    const telefonoBorrar = telefono(e.target.dataset.index);
    const fechaBorrar = fecha(e.target.dataset.index);
    const horaBorrar = hora(e.target.dataset.index);
    const sintomasBorrar = sintomas(e.target.dataset.index);
    citasMascotas.splice(mascotaBorrar, propietarioBorrar, telefonoBorrar, fechaBorrar, horaBorrar, sintomasBorrar);

    // Update
    const deleteExpense = e.target.parentElement.querySelector('span').textContent.split('$')[1];
    restante += Number(deleteExpense);
    restanteElement.textContent = restante;

    displayExpenses();
}

// Limpiar el HTML
function limpiarHTML() {
    while (citas.firstChild) {
        citas.removeChild(citas.firstChild);
    }
}