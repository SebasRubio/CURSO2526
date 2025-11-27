const mensajeconf = document.getElementById("erroroexito");
const formulario = document.getElementById("nueva-cita");
const btn = document.getElementById("botonForm");
const mascotaInput = document.getElementById("mascota");
const propietarioInput = document.getElementById("propietario");
const telefonoInput = document.getElementById("telefono");
const fechaInput = document.getElementById("fecha");
const horaInput = document.getElementById("hora");
const sintomasInput = document.getElementById("sintomas");
const ulCitas = document.getElementById("citas");
let citas = [];

function limpiarHTML(elemento) {
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}
formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  ///////////////////////////////////////////////////////////////////
  // EJERCICIO A
  ///////////////////////////////////////////////////////////////////
  if (mascotaInput.value.trim() === "") {
    mensajeconf.textContent = "Error: el campo mascota es obligatorio";
    mensajeconf.classList.remove("mensaje-exito");
    mensajeconf.classList.add("mensaje-error");
    return;
  } else if (propietarioInput.value.trim() === "") {
    mensajeconf.textContent = "Error: el campo propietario es obligatorio";
    mensajeconf.classList.remove("mensaje-exito");
    mensajeconf.classList.add("mensaje-error");
    return;
  } else if (telefonoInput.value.trim() === "") {
    mensajeconf.textContent = "Error: el campo teléfono es obligatorio";
    mensajeconf.classList.remove("mensaje-exito");
    mensajeconf.classList.add("mensaje-error");
    return;
  } else if (fechaInput.value.trim() === "") {
    mensajeconf.textContent = "Error: el campo fecha es obligatorio";
    mensajeconf.classList.remove("mensaje-exito");
    mensajeconf.classList.add("mensaje-error");
    return;
  } else if (horaInput.value.trim() === "") {
    mensajeconf.textContent = "Error: el campo hora es obligatorio";
    mensajeconf.classList.remove("mensaje-exito");
    mensajeconf.classList.add("mensaje-error");
    return;
  } else if (sintomasInput.value.trim() === "") {
    mensajeconf.textContent = "Error: el campo síntomas es obligatorio";
    mensajeconf.classList.remove("mensaje-exito");
    mensajeconf.classList.add("mensaje-error");
    return;
  }

  mensajeconf.textContent = "¡Formulario enviado correctamente!";
  mensajeconf.classList.remove("mensaje-error");
  mensajeconf.classList.add("mensaje-exito");

  //////////////////////////////////////////////////////////////////
  //EJERCICIO B
  //////////////////////////////////////////////////////////////////

  const cita = {
    mascota: mascotaInput.value,
    propietario: propietarioInput.value,
    telefono: telefonoInput.value,
    fecha: fechaInput.value,
    hora: horaInput.value,
    sintomas: sintomasInput.value,
  };

  citas.push(cita);

  console.log(cita);
  console.log(citas);

  agregarCita(cita);

  formulario.reset();
});

function agregarCita(cita) {

  const li = document.createElement("li");
  li.classList.add("list-group-item");
  li.innerHTML = `
      <h3>${cita.mascota}</h3>
      <p><strong>Propietario:</strong> ${cita.propietario}</p>
      <p><strong>Teléfono:</strong> ${cita.telefono}</p>
      <p><strong>Fecha:</strong> ${cita.fecha}</p>
      <p><strong>Hora:</strong> ${cita.hora}</p>
      <p><strong>Síntomas:</strong> ${cita.sintomas}</p>
      <button type="button" class="btn btn-danger btn-eliminar">Eliminar Cita ❌</button>
      <button type="button" class="btn btn-info btn-editar">Editar Cita 🖊</button>
  `;

  ulCitas.appendChild(li);

  //////////////////////////////////////////////////////////////////
  //EJERCICIO C
  //////////////////////////////////////////////////////////////////

  const eliminarBtn = li.querySelector(".btn-eliminar");
  const editarBtn = li.querySelector(".btn-editar");

  eliminarBtn.addEventListener("click", () => eliminarCita(cita, li));
  editarBtn.addEventListener("click", () => editarCita(cita));
}


function editarCita(cita) {

  mascotaInput.value = cita.mascota;
  propietarioInput.value = cita.propietario;
  telefonoInput.value = cita.telefono;
  fechaInput.value = cita.fecha;
  horaInput.value = cita.hora;
  sintomasInput.value = cita.sintomas;


  btn.textContent = "Editar cita";
  btn.classList.add("btn-warning");


  citas = citas.filter((citaActual) => citaActual !== cita);
  limpiarHTML(ulCitas);
  citas.forEach((cita) => agregarCita(cita));

  formulario.onsubmit = function (e) {
    e.preventDefault();
    btn.textContent = "Crear Cita";
    btn.classList.remove("btn-warning");
  };
}

//////////////////////////////////////////////////////////////////
//EJERCICIO D
//////////////////////////////////////////////////////////////////


function eliminarCita(cita, elementoLi) {

  citas = citas.filter((citaActual) => citaActual !== cita);
  elementoLi.remove();
}
