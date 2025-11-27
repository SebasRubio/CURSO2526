let nuevacita = document.getElementById("nueva-cita");
let contenido = document.getElementById("contenido");
let mascota = document.getElementById("mascota");
let propietario = document.getElementById("propietario");
let telefono = document.getElementById("telefono");
let fecha = document.getElementById("fecha");
let hora = document.getElementById("hora");
let sintomas = document.getElementById("sintomas");
let administra = document.getElementById("administra");
let citas = document.getElementById("citas");
let botonagregar = document.querySelector('button[type="submit"]');

botonagregar.addEventListener("click", (e) => {
  e.preventDefault();
  //comprobar que ningun elemento del formulario este vacio
  if (
    !mascota.value ||
    !propietario.value ||
    !telefono.value ||
    !fecha.value ||
    !hora.value ||
    !sintomas.value
  ) {
    alert("debes rellenar todos los campos");
    return;
  }

  //añadir los datos que ha metido el usurario al ul del html

  let mascotav = mascota.value;
  let propietariov = propietario.value;
  let telefonov = telefono.value;
  let fechav = fecha.value;
  let horav = hora.value;
  let sintomasv = sintomas.value;
  let div = document.createElement("div");
  let li = document.createElement("li");
  li.innerHTML = `
          <h1>${mascotav}</h1>
          <p>Propietario:${propietariov}</p>
          <p>Telefono${telefonov}</p>
          <p>Fecha de la cita${fechav}</p>
          <p>Hora de la cita${horav}</p>
          <p>Sintomas:${sintomasv}</p>
        `;
  //los botones para elminar y editar
  const botoneditar = document.createElement("button");
  botoneditar.textContent = "editar";
  botoneditar.classList = "btn";
  botoneditar.style.backgroundColor = "grey";
  const botoneliminar = document.createElement("button");
  botoneliminar.textContent = "eliminar";
  botoneliminar.classList = "btn";
  botoneliminar.style.backgroundColor = "red";

  //elimina el contenido del div
  botoneliminar.addEventListener("click", function () {
    div.textContent = "";
  });

  botoneditar.addEventListener("click", function () {
    mascota.value = mascotav;
    propietario.value = propietariov;
    telefono.value = telefonov;
    fecha.value = fechav;
    hora.value = horav;
    sintomas.value = sintomasv;

    //cambiar el valor del boton
    botonagregar.textContent = "Guardar Cambios";

    //agregar a la lista otra vez los datos cambiados
    botonagregar.addEventListener("click", function () {
      li.innerHTML = `
                    <h1>${mascota.value}</h1>
                    <br>
                    <p>Propietario:>${propietario.value}</p>
                    <p>Telefono${telefono.value}</p>
                    <p>Fecha de la cita${fecha.value}</p>
                    <p>Hora de la cita${hora.value}</p>
                    <p>Sintomas:${sintomas.value}</p>
                `;
      botonagregar.textContent = "Agregar Cita";
      div.textContent = "";
    });
  });

  div.appendChild(li);
  div.appendChild(botoneditar);
  div.appendChild(botoneliminar);
  citas.appendChild(div);
});
