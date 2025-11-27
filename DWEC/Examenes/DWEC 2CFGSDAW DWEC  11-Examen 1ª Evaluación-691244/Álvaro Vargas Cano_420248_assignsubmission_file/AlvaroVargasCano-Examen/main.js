const formulario = document.querySelector('#nueva-cita');
const titulo = document.querySelector('.titulo');
const contenedor = document.querySelector('#citas');
const btn = formulario.querySelector('button[type="submit"]');

let citas = [];
let editando = false;
let idActual = null;
formulario.addEventListener('submit', function(e) {
    e.preventDefault();    
    let mascota = document.querySelector('#mascota').value;
    let propietario = document.querySelector('#propietario').value;
    let telefono = document.querySelector('#telefono').value;
    let fecha = document.querySelector('#fecha').value;
    let hora = document.querySelector('#hora').value;
    let sintomas = document.querySelector('#sintomas').value;

    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        let alerta = document.querySelector('.alert');
        if (alerta) alerta.remove();

        let div = document.createElement('div');
        div.className = 'alert alert-danger';
        div.textContent = 'Hay algun campo que esta vacio';
        titulo.parentElement.insertBefore(div, titulo.nextSibling);
        return;
    }

    if (editando) {
        for (let i = 0; i < citas.length; i++) {
            if (citas[i].id === idActual) {
                citas[i].mascota = mascota;
                citas[i].propietario = propietario;
                citas[i].telefono = telefono;
                citas[i].fecha = fecha;
                citas[i].hora = hora;
                citas[i].sintomas = sintomas;
            }
        }
        
        editando = false;
        idActual = null;
        btn.textContent = 'Crear Cita';
    } else {
        let nuevaCita = {
            id: Date.now(),
            mascota: mascota,
            propietario: propietario,
            telefono: telefono,
            fecha: fecha,
            hora: hora,
            sintomas: sintomas
        };
        citas.push(nuevaCita);
    }

    formulario.reset();
    
    contenedor.innerHTML = '';
    for (let i = 0; i < citas.length; i++) {
        let c = citas[i];
        let div = document.createElement('div');
        div.className = 'cita';
        div.innerHTML = `
            <h2>${c.mascota}</h2>
            <p>Propietario: ${c.propietario}</p>
            <p>Teléfono: ${c.telefono}</p>
            <p>Fecha: ${c.fecha}</p>
            <p>Hora: ${c.hora}</p>
            <p>Síntomas: ${c.sintomas}</p>
            <button class="btn btn-primary" onclick="editar(${c.id})">Editar</button>
        `;
        contenedor.appendChild(div);
        contenedor.appendChild(cla);
    }
});

function editar(id) {
    for (let i = 0; i < citas.length; i++) {
        if (citas[i].id === id) {
            document.querySelector('#mascota').value = citas[i].mascota;
            document.querySelector('#propietario').value = citas[i].propietario;
            document.querySelector('#telefono').value = citas[i].telefono;
            document.querySelector('#fecha').value = citas[i].fecha;
            document.querySelector('#hora').value = citas[i].hora;
            document.querySelector('#sintomas').value = citas[i].sintomas;
        }
    }
    editando = true;
    idActual = id;
    btn.textContent = 'Editar Cita';
}