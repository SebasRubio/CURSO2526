const formulario = document.querySelector('#nueva-cita');
const listaHTML = document.querySelector('#citas');
let lista = [];

registrarEventListeners();

function registrarEventListeners(){
	formulario.addEventListener('submit', crearCita);
	listaHTML.addEventListener('click', administrarCitas);
}

function crearCita(e){
	e.preventDefault();
	const mascota = document.querySelector('#mascota').value;
	const propietario = document.querySelector('#propietario').value;
	const telefono = document.querySelector('#telefono').value;
	const fecha = document.querySelector('#fecha').value;
	const hora = document.querySelector('#hora').value;
	const sintomas = document.querySelector('#sintomas').value;
	const id=Date.now();
	const cita ={
		mascota,
		propietario,
		telefono,
		fecha,
		hora,
		sintomas,
		id
	}
	if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
			const titulo= document.querySelector('.titulo');
			const alerta=document.createElement('p');
			alerta.style.color='red';
			alerta.style.fontWeight='bold';
			alerta.style.fontSize='20px';
			alerta.style.textAlign='center';
			alerta.style.backgroundColor='black';
			alerta.textContent="Has dejado un campo vacío, rellénalo por favor";
			titulo.appendChild(alerta);
			return;
		}
	lista.push(cita);
	console.log(lista);
    citasHTML();
	formulario.reset();
}

function citasHTML(){
	limpiarHTML();
	lista.forEach(cita => {
		const div=document.createElement('div');
		const mascota = document.createElement('h3');
		mascota.textContent=cita.mascota;
		const propietario = document.createElement('p');
		propietario.textContent='Propietario: ' + cita.propietario;
		const telefono = document.createElement('p');
		telefono.textContent='Teléfono: ' + cita.telefono;
		const fecha = document.createElement('p');
		fecha.textContent='Fecha: ' + cita.fecha;
		const hora = document.createElement('p');
		hora.textContent='Hora: ' + cita.hora;
		const sintomas = document.createElement('p');
		sintomas.textContent='Síntomas: ' + cita.sintomas;
		const botonBorrar=document.createElement('button');
		botonBorrar.classList='borrarcita btn btn-danger';
		botonBorrar.textContent='Eliminar';
		botonBorrar.id=cita.id;
		const botonEditar = document.createElement('button');
		botonEditar.classList='editarcita btn btn-info';
		botonEditar.textContent='Editar';
		botonEditar.id=cita.id;
		div.appendChild(mascota);
		div.appendChild(propietario);
		div.appendChild(telefono);
		div.appendChild(fecha);
		div.appendChild(hora);
		div.appendChild(sintomas);
		div.appendChild(botonBorrar);
		div.appendChild(botonEditar);
		listaHTML.appendChild(div);
	});
}

function administrarCitas(e){
	e.preventDefault();
	if(e.target.classList.contains('borrarcita')){
		const idSeleccionado = e.target.id;
		lista = lista.filter( cita => cita.id != idSeleccionado);
		citasHTML();
	};
	if(e.target.classList.contains('editarcita')){
		const idSeleccionado = e.target.id;
		const citaEditar = lista.find( cita => cita.id == idSeleccionado);
		document.querySelector('#mascota').value = citaEditar.mascota;
		document.querySelector('#propietario').value = citaEditar.propietario;
		document.querySelector('#telefono').value = citaEditar.telefono;
		document.querySelector('#fecha').value = citaEditar.fecha;
		document.querySelector('#hora').value = citaEditar.hora;
		document.querySelector('#sintomas').value = citaEditar.sintomas;
		const botonSubmit = document.querySelector('button[type="submit"]');
		botonSubmit.textContent = 'Editar cita';
		botonSubmit.style.backgroundColor = 'blue';
		lista = lista.filter( cita => cita.id != idSeleccionado);
		citasHTML();
	}
}

function limpiarHTML(){
	while(listaHTML.firstChild){
		listaHTML.removeChild(listaHTML.firstChild);
	}
}