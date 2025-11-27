



cita = document.querySelector('.btn btn-success w-100 d-block');
const registro = document.querySelector('#citas');

formulario = document.querySelector('#nueva-cita');

formulario.addEventListener('submit', agregarMascota)

//colorBtn.style.backgroundColor = colors['#ff9999'];

//Creamos una clase
class Veterinaria{
    constructor (veterinaria){
        this.nombre = String(veterinaria)
        this.propietario = String(veterinaria)
        this.tlf = String(veterinaria)
        this.fecha = String(veterinaria)
        this.hora = String(veterinaria)
        this.sintomas = String(veterinaria)
        this.listado = []
    }

    //guardamos en el array
    guardar(pacien){

        this.listado = [...this.listado, pacien];
        
    }

    //Eliminamos una mascota especifica mediante un filtrado
    eliminarMascota(nombre){
       this.listado = this.listado.filter(array => array.nombre !== nombre)
       agregarListado(this.listado)
       
       
    }


    

};//Fin veterinaria




class UI{


    // Método para mostrar mensajes de alerta
    imprimirAlerta(mensaje, tipo){
        // Crea un elemento div para el mensaje
        const div = document.createElement('div');
        // Añade clases base para el estilo
        div.classList.add('text-center', 'alert');

        // Según el tipo de mensaje, añade clases de color diferentes
        if(tipo === 'error'){
            div.classList.add('alert-danger');  // Rojo para errores
        }else if(tipo === 'alert'){
            div.classList.add('alert-danger');  // Rojo para alertas (parece error)
        }
        // ERROR: Esta línea siempre se ejecuta, sobrescribiendo lo anterior
        div.classList.add('alert-success');     // Verde para éxito
        
        // Establece el texto del mensaje
        div.textContent = mensaje;
        // Inserta el mensaje antes del formulario
        //document.querySelector('.row').insertBefore(div, formulario);
        alert('Funciona toda, pero el insertbefore no lo lee')
        // Elimina el mensaje automáticamente después de 2 segundos
        setTimeout(()=>{
            div.remove();
        },2000)
    };


    //Agregamos los que esta en array al HTML
    agregarListado(listado){
        this.limpiarHTML();

        listado.forEach(element => {

            const {nombre, propietario, tlf, fecha, hora, sintomas} = element;
            const crearLista = document.createElement('li')
            
            // Añade el ID como atributo data para identificarlo
            crearLista.dataset.id = id
            
            // Crea el HTML interno del li con el gasto y cantidad
            crearLista.innerHTML = `<h3>${nombre}</h3><p>Propietario: ${propietario}</p><p>Teléfono: ${tlf}</p> <p>Fecha: ${fecha}</p> <p>hora: ${hora}</p> <p>sintomas: ${sintomas}</p>` 

            const btn = document.createElement('button');

            btn.onclick= ()=>{
                veterinaria.eliminarMascota(id)
            }

            crearLista.appendChild(btn)

            //Agregar al html
            registro.appendChild(crearLista)
        })
    };


    limpiarHTML(registro) {
	    while(registro.firstChild){
		registro.removeChild(registro.firstChild);
	}
}

}//Fin UI




//Agregar mascota al listado

function agregarMascota(e){

    e.preventDefault();     //Primero evitamos que se envie el formulario para que nos de tiempo a hacer operaciones 

    const nombre = document.querySelector('#mascota').value;
    const propietario = document.querySelector('#propietario').value;
    const tlf = document.querySelector('#telefono').value;
    const fecha = document.querySelector('#fecha').value;
    const hora = document.querySelector('#hora').value;
    const sintomas = document.querySelector('#sintomas').value;

    //Validacion de vacios

    if(nombre === ''|| propietario === '' || tlf === '' || fecha === '' || hora === '' || sintomas === '' ){
        ui.imprimirAlerta('Ambos campos son obligatorios.', 'error')
    }else{
        ui.imprimirAlerta('Gasto añadido exitosamente' , 'success')
    }

    const paciente = {nombre, propietario, tlf, fecha, hora, sintomas}
    console.log(paciente.nombre);
    veterinaria.guardar(paciente);

    ui.agregar(listado);


    formulario.reset()
}







//instanciar
const ui = new UI();

let veterinaria;


