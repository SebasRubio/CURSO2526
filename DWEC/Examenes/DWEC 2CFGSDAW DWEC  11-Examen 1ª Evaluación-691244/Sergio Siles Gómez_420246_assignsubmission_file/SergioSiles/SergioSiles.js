const mascotaInput = document.querySelector("#mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");
const formulario = document.querySelector("#nueva-cita");
const contenedorCitas = document.querySelector("#citas");
const titulo = document.querySelector("h2");

let listaCitas = [];
let objCita = {};
let citaSeleccionada = {};

eventlisteners();
function eventlisteners() {
  formulario.addEventListener("click", crearCita);
  contenedorCitas.addEventListener("click", accionCita);
}

function crearCita(e) {
  e.preventDefault();
  const boton = document.querySelector("button");
  if (e.target.classList.contains("btn")) {
    if (
      mascotaInput.value === "" ||
      propietarioInput.value === "" ||
      telefonoInput.value === "" ||
      fechaInput.value === "" ||
      horaInput.value === "" ||
      sintomasInput.value === ""
    ) {
      crearError();
    } else {
      objCita = {
        nombre: mascotaInput.value,
        propietario: propietarioInput.value,
        telefono: telefonoInput.value,
        fecha: fechaInput.value,
        hora: horaInput.value,
        sintomas: sintomasInput.value,
        id: Date.now(),
      };
      listaCitas.push(objCita);
      formulario.reset();
      boton.style.backgroundColor = "#28b62c";
      boton.style.borderColor = "#28b62c";
      boton.textContent = "CREAR CITA";
      crearHTML();
    }
  }
}

function accionCita(e) {
  if (e.target.classList.contains("btnEliminarCita")) {
    let idSeleccionada = e.target.id;
    listaCitas = listaCitas.filter((objCita) => idSeleccionada != objCita.id);
    crearHTML();
  }
  if (e.target.classList.contains("btnEditarCita")) {
    rellenarFormulario();
  }
}
function rellenarFormulario() {
  mascotaInput.value = objCita.nombre;
  propietarioInput.value = objCita.propietario;
  telefonoInput.value = objCita.telefono;
  fechaInput.value = objCita.fecha;
  horaInput.value = objCita.hora;
  sintomasInput.value = objCita.sintomas;
  citaSeleccionada.id = objCita.id;
  editarCita();
}

function editarCita() {
  if (
    mascotaInput.value === "" ||
    propietarioInput.value === "" ||
    telefonoInput.value === "" ||
    fechaInput.value === "" ||
    horaInput.value === "" ||
    sintomasInput.value === ""
  ) {
    crearError();
  } else {
    const boton = document.querySelector("button");
    boton.textContent = "EDITAR CITA";
    boton.style.backgroundColor = "skyblue";
    boton.style.borderColor = "skyblue";
    listaCitas.forEach((objCita) => {
      if (citaSeleccionada.id == objCita.id) {
        crearHTML();
        listaCitas = listaCitas.filter((cita) => cita.id !== objCita.id);
      }
    });
  }
}

function crearError() {
  let divT = document.createElement("div");
  let h2 = document.createElement("h2");
  h2.textContent = "Hay un campo vacio";
  h2.classList = "text-center";
  divT.appendChild(h2);
  titulo.after(divT);
}
function crearHTML() {
  limpiarHTML(contenedorCitas);
  listaCitas.forEach((objCita) => {
    let div = document.createElement("div");
    let nombreMascota = document.createElement("h2");
    let propietario = document.createElement("p");
    let telefono = document.createElement("p");
    let fecha = document.createElement("p");
    let hora = document.createElement("p");
    let sintomas = document.createElement("p");
    let btnEliminarCita = document.createElement("button");
    btnEliminarCita.id = objCita.id;
    let btnEditarCita = document.createElement("button");
    nombreMascota.textContent = objCita.nombre;
    propietario.textContent = "Propietario: " + objCita.propietario;
    telefono.textContent = "Telefono: " + objCita.telefono;
    fecha.textContent = "Fecha: " + objCita.fecha;
    hora.textContent = "Hora: " + objCita.hora;
    sintomas.textContent = "Sintomas: " + objCita.sintomas;
    btnEliminarCita.textContent = "ELIMINAR";
    btnEliminarCita.classList = "btnEliminarCita";
    btnEditarCita.textContent = "EDITAR";
    btnEditarCita.classList = "btnEditarCita";
    div.appendChild(nombreMascota);
    div.appendChild(propietario);
    div.appendChild(telefono);
    div.appendChild(fecha);
    div.appendChild(hora);
    div.appendChild(sintomas);
    div.appendChild(btnEliminarCita);
    div.appendChild(btnEditarCita);
    contenedorCitas.appendChild(div);
  });
}
function limpiarHTML(elemento) {
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}
