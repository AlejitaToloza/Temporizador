const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const botonInciarPausar = document.querySelector('#start-pause');
const textoIniciarPausar = document.querySelector('#start-pause span');
const iconoIniciarPausar = document.querySelector('.app__card-primary-butto-icon');
const tiempoEnPantalla = document.querySelector('#timer');

const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sonidos/play.wav');
const audioPausa = new Audio('./sonidos/pause.mp3');
const audioTiempoFinalizado = new Audio('./sonidos/beep.mp3');

let tiempoTranscurridoEnSegundos = 1500; /* Inicialmente se asigna un timepo de 5seg */ 
let idIntervalo = null;

musica.loop = true;

inputEnfoqueMusica.addEventListener('change',()=>{
    if (musica.paused){
        musica.play();
    } else {
        musica.pause();
    }
});

/* elemento.addEventListener(evento, callback); 
    
    Donde:

    * elemento: Es el elemento HTML al cual queremos asociar el evento.
    * evento: Es un string que representa el tipo de evento que queremos capturar.
    * callback: Es la función que se llamará cuando ocurra el evento.

*/

// botonCorto.addEventListener('click',() => {  /* addEventListener: Escucha el evento que va a ocurrir, en este caso un "Click".  Tambien se hace un "arrow function" */
//     html.setAttribute('data-contexto', 'descanso-corto'); /* Toma el valor que tenemos ahora y lo sustituye por otro valor */
//     banner.setAttribute('src','./imagenes/descanso-corto.png');
// })


botonCorto.addEventListener('click',() => { 
    tiempoTranscurridoEnSegundos = 300;
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
});

botonEnfoque.addEventListener('click',() => {
    tiempoTranscurridoEnSegundos = 1500;
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
});

botonLargo.addEventListener('click',() => {
    tiempoTranscurridoEnSegundos = 900;
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
});


function cambiarContexto(contexto) { /* Se crea una función con un parámetro el cual cambiará al realizar el evento "click" */

    mostrarTiempo()
    botones.forEach(function(contexto){ /* El loop "forEach" para cada uno de los botones que tenemos va a recibir un parámetro por medio de una función anónima para cambiar los botones  */
        contexto.classList.remove('active');
    })

    html.setAttribute('data-contexto',contexto); /* Se coloca la variable "contexto" que será la variable que cambiará */
    banner.setAttribute('src',`./imagenes/${contexto}.png`); /* Al utilizar las "Templates Strings" especifica que será la variable que cambiará, en esta caso la ruta de la imágen */

    switch (contexto) {
        case "enfoque": /* innerHTML hace que yo incluya en nuestro JavaScript un código HTML, un texto junto al código HTML. */
            titulo.innerHTML = `Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
            break;

        case "descanso-corto":
            titulo.innerHTML = `¿Qué tal tomar un respiro?<br>
                <strong class="app__title-strong">¡Haz una pausa corta!</strong>`
        break;

        case "descanso-largo":
            titulo.innerHTML = `Hora de volver a la superficie
            <strong class="app__title-strong">Haz una pausa larga.</strong>`
        break;
    default:
    }
}

/*Después, llamé a "audioTiempoFinalizado " dentro de la función `cuentaRegresiva()`*/

const cuentaRegresiva = () =>{
    if(tiempoTranscurridoEnSegundos <= 0) {
        audioTiempoFinalizado.play();
        alert('Tiempo Finalizado');
        reiniciar();
        return;
    }
    textoIniciarPausar.textContent = 'Pausar' //Se usa textContent para insertar un texto en el html
    iconoIniciarPausar.setAttribute('src', '/imagenes/pause.png');
    tiempoTranscurridoEnSegundos -= 1;
    mostrarTiempo();
}

botonInciarPausar.addEventListener('click',inciarPausar);

function inciarPausar(){
    if (idIntervalo){
        audioPausa.play();
        reiniciar();
        return;
    }
    audioPlay.play();
    idIntervalo = setInterval(cuentaRegresiva,1000); /* 1seg son 1000 milisegundos */
} 

function reiniciar(){
    clearInterval(idIntervalo);
    textoIniciarPausar.textContent = 'Comenzar';
    iconoIniciarPausar.setAttribute('src', '/imagenes/play_arrow.png');
    idIntervalo = null;
}

function mostrarTiempo(){
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000)
    const tiempoFormateado = tiempo.toLocaleTimeString('es-mx',{minute:'2-digit', second:'2-digit'})
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}
mostrarTiempo();