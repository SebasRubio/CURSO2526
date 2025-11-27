// crear funciones para que los campos del formulario no queden vacios, es decir que todos son obligatorios 
// si algun campo esta vacio debe notificarlo que campo esta vacio y en caso contrario tiene que notificar que todo esta correcto
// y estos mensajes debe visualizarse dabajo de ADMINISTRADOR DE PACIENTES DE VETERINARIA
// luego los datos tienen que pasar a la derecha con dos botones de eliminar y editar

// Elementos del formulario
const form = document.getElementById('nueva-cita');
const listaCitas = document.getElementById('citas');
var camposvacios = [
    { id: 'mascota', label: 'Nombre Mascota' },
    { id: 'propietario', label: 'Propietario' },
    { id: 'telefono', label: 'Teléfono' },
    { id: 'fecha', label: 'Fecha' },
    { id: 'hora', label: 'Hora' },
    { id: 'sintomas', label: 'Síntomas' }
];
// Crear mensajes
const mensajes = document.createElement('div');
mensajes.id = 'mensajes';
document.querySelector('.titulo').after(mensajes);

// Mostrar mensaje
function mostrarMensaje(tipo, texto) {
    mensajes.innerHTML = `<div class="alert alert-${tipo}">${texto}</div>`;
    setTimeout(() => mensajes.innerHTML = '', 3000);
}

// Manejar envío del formulario
form.onsubmit = function(e) {
    e.preventDefault();
    
    // Verificar campos
    const campos = ['mascota', 'propietario', 'telefono', 'fecha', 'hora', 'sintomas'];
    const vacios = campos.filter(id => !document.getElementById(id).value.trim());
    var camposVacios = camposvacios.filter(campo => !document.getElementById(campo.id).value.trim());
    
    if (vacios.length > 0) {
        mostrarMensaje('danger', 'Faltan campos por llenar ' + camposVacios.map(c => c.label).join(', '));
        return;
    }

    // Crear cita
    const cita = {};
    campos.forEach(id => cita[id] = document.getElementById(id).value.trim());

    // Crear elemento en la lista
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
        <div>
            <h5>${cita.mascota}</h5>
            <p>Propietario: ${cita.propietario}</p>
            <p>Teléfono: ${cita.telefono}</p>
            <p>Fecha: ${cita.fecha} - Hora: ${cita.hora}</p>
            <p>Síntomas: ${cita.sintomas}</p>
            <button onclick="this.closest('li').remove()" class="btn btn-danger btn-sm">Eliminar</button>
            <button onclick="editarCita(this.closest('li'))" class="btn btn-warning btn-sm">Editar</button>
        </div>
    `;
    
    listaCitas.appendChild(li);
    mostrarMensaje('success', 'Todos los campos están correctos');
    form.reset();
};

// Función para editar cita
function editarCita(li) {
    const texto = li.innerText;
    const [mascota, propietario, telefono, fecha, hora, sintomas] = texto.split('\n');
    
    document.getElementById('mascota').value = mascota;
    document.getElementById('propietario').value = propietario;
    document.getElementById('telefono').value = telefono;
    document.getElementById('fecha').value = fecha;
    document.getElementById('hora').value = hora;
    document.getElementById('sintomas').value = sintomas;
    
    li.remove();
}
