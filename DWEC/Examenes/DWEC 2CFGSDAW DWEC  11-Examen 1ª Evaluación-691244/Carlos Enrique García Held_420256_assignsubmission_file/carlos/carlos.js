const form = document.getElementById('nueva-cita');
const inputMascota = document.getElementById('mascota');
const inputPropietario = document.getElementById('propietario');
const inputTelefono = document.getElementById('telefono');
const inputFecha = document.getElementById('fecha');
const inputHora = document.getElementById('hora');
const inputSintomas = document.getElementById('sintomas');
const listaCitas = document.getElementById('citas');              
const tituloPrincipal = document.querySelector('h2.titulo');      

let citas = [];
let editandoId = null; 

const escapeHTML = (s = '') =>
  s.replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

function mostrarAviso(texto, tipo = 'error') {
 

  let zonaAviso = document.getElementById('zona-aviso');
  if (!zonaAviso) {
    zonaAviso = document.createElement('div');
    zonaAviso.id = 'zona-aviso';
   
//poner debajo del titulo
    tituloPrincipal.insertAdjacentElement('afterend', zonaAviso);
  }
  zonaAviso.innerHTML = `
    <div class="alert ${tipo === 'ok' ? 'alert-success' : 'alert-danger'} mt-3 mb-0" 
         style="opacity:.5">
      ${escapeHTML(texto)}
    </div>
  `;
}

function guardar() {
  try { localStorage.setItem('citas_vet', JSON.stringify(citas)); } catch {}
}

function cargar() {
  try { citas = JSON.parse(localStorage.getItem('citas_vet')) || []; } catch { citas = []; }
}

function limpiarLista() {
  while (listaCitas.firstChild) listaCitas.removeChild(listaCitas.firstChild);
}

function pintar() {
  limpiarLista();

  if (citas.length === 0) {
    const li = document.createElement('li');
    li.className = 'list-group-item cita';
    li.innerHTML = '<p class="mb-0 text-muted">no hay citas</p>';
    listaCitas.appendChild(li);
    return;
  }

  const ordenadas = citas.slice().sort((a, b) =>
    a.fecha.localeCompare(b.fecha) || a.hora.localeCompare(b.hora) || a.mascota.localeCompare(b.mascota)
  );

  for (const c of ordenadas) {
    const li = document.createElement('li');
    li.className = 'list-group-item cita';

    li.innerHTML = `
      <p><span>Mascota:</span> ${escapeHTML(c.mascota)}</p>
      <p><span>Propietario:</span> ${escapeHTML(c.propietario)}</p>
      <p><span>Teléfono:</span> ${escapeHTML(c.telefono)}</p>
      <p><span>Fecha:</span> ${escapeHTML(c.fecha)}</p>
      <p><span>Hora:</span> ${escapeHTML(c.hora)}</p>
      <p><span>Síntomas:</span> ${escapeHTML(c.sintomas)}</p>

      <button class="btn btn-info btn-sm me-2" data-accion="editar" data-id="${c.id}">
        Editar
      </button>
      <button class="btn btn-danger btn-sm" data-accion="eliminar" data-id="${c.id}">
        Eliminar
      </button>
    `;
    listaCitas.appendChild(li);
  }
}

function setModoEdicion(activo) {
  const btnSubmit = form.querySelector('button[type="submit"]');
  if (!btnSubmit) return;

  if (activo) {
    btnSubmit.textContent = 'Editar Cita';
    btnSubmit.classList.remove('btn-success');
    btnSubmit.classList.add('btn-warning');
  } else {
    btnSubmit.textContent = 'Crear Cita';
    btnSubmit.classList.remove('btn-warning');
    btnSubmit.classList.add('btn-success');
  }
}
//listener
document.addEventListener('DOMContentLoaded', () => {
  cargar();
  pintar();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const mascota    = inputMascota.value.trim();
  const propietario= inputPropietario.value.trim();
  const telefono   = inputTelefono.value.trim();
  const fecha      = inputFecha.value.trim();
  const hora       = inputHora.value.trim();
  const sintomas   = inputSintomas.value.trim();
//ninguncampo vacio
  if (!mascota || !propietario || !telefono || !fecha || !hora || !sintomas) {
    mostrarAviso('campo esta vacio');
    return;
  }

  const cita = {
    id: editandoId ?? Date.now(),
    mascota, propietario, telefono, fecha, hora, sintomas
  };

  if (editandoId) {
 //actualizar
    citas = citas.map(c => c.id === editandoId ? cita : c);
    editandoId = null;
    setModoEdicion(false);
  
  } else {
  //crear
    citas.push(cita);
    mostrarAviso('todo ha sido correcto');
  }

  guardar();
  pintar();
  form.reset();
});

//eventos eliminar
listaCitas.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-accion]');
  if (!btn) return;

  const id = Number(btn.dataset.id);
  const accion = btn.dataset.accion;

  if (accion === 'eliminar') {
    citas = citas.filter(c => c.id !== id);
    guardar();
    pintar();
   
    if (editandoId === id) { 
      editandoId = null;
      setModoEdicion(false);
      form.reset();
    }
  }

  if (accion === 'editar') {
    const c = citas.find(x => x.id === id);
    if (!c) return;

    inputMascota.value = c.mascota;
    inputPropietario.value = c.propietario;
    inputTelefono.value = c.telefono;
    inputFecha.value = c.fecha;
    inputHora.value = c.hora;
    inputSintomas.value = c.sintomas;

    editandoId = id;
    setModoEdicion(true);
  }
});