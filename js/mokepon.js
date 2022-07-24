let ataqueJugador;
let ataqueEnemigo;
let vidasJugador=3;
let vidasEnemigo=3;

//let resultado


function iniciarJuego(){

    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    sectionSeleccionarAtaque.style.display = 'none';

    let sectionReiniciar = document.getElementById('reiniciar');
    sectionReiniciar.style.display = 'none';



    let botonMascotaJuegador =document.getElementById("boton-mascota");
    botonMascotaJuegador.addEventListener('click', seleccionarMascotaJugador);

    let botonFuego =document.getElementById('boton-fuego');
    botonFuego.addEventListener('click',ataqueFuego);

    let botonAgua=document.getElementById('boton-agua');
    botonAgua.addEventListener('click',ataqueAgua);
    let botonTierra=document.getElementById('boton-tierra');
    botonTierra.addEventListener('click',ataqueTierra);

    let botonReiniciar= document.getElementById('boton-reiniciar');
    botonReiniciar.addEventListener('click', reiniciarJuego);

}
function seleccionarMascotaJugador(){

    let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
    sectionSeleccionarMascota.style.display = 'none';
    
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    sectionSeleccionarAtaque.style.display = 'block';

    let inputHipodoge = document.getElementById('hipodoge');
    let inputCapipepo = document.getElementById('capipepo');
    let inputRatigueya = document.getElementById('ratigueya');
    let spanMascotaJugador = document.getElementById('mascota-jugador');
    if(inputHipodoge.checked){
        //alert ('seleccionaste a hipodoge');
        spanMascotaJugador.innerText='Hipodoge';
    }else if(inputCapipepo.checked){
        //alert('seleccionaste a capipepo');
        spanMascotaJugador.innerHTML='Capipepo';
    }else if(inputRatigueya.checked){
        //alert('seleccionaste a ratigueya');
        spanMascotaJugador.innerHTML='Ratigueya';
    }else{
        alert('No se selecionó mascota');
        reiniciarJuego();
    }

    seleccionarMascotaEnemigo();


   
}

function seleccionarMascotaEnemigo(){
    let mascotaAtaqueAleatorio= aleatorio(1,3);
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo');

    if(mascotaAtaqueAleatorio==1){
        spanMascotaEnemigo.innerHTML='Hipodoge';
    }else if(mascotaAtaqueAleatorio==2){
        spanMascotaEnemigo.innerHTML='Capipepo';
    }else{
        spanMascotaEnemigo.innerHTML='Ratigueya';
    }

}

function ataqueFuego(){
    ataqueJugador='FUEGO';
    ataqueAleatorioEnemigo();
}

function ataqueAgua(){
    ataqueJugador='AGUA';
    ataqueAleatorioEnemigo();
}

function ataqueTierra(){
    ataqueJugador='TIERRA';
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(1,3);
    
    if(ataqueAleatorio==1){
        ataqueEnemigo='FUEGO';

    }else if(ataqueAleatorio==2){
        ataqueEnemigo='AGUA';
        
    }else {
        ataqueEnemigo='TIERRA';
    }
    combate();

}

function combate(){
    let spanVidasJugador = document.getElementById('vidas-jugador');
    let spanVidasEnemigo = document.getElementById('vidas-enemigo');
    
    if(ataqueJugador==ataqueEnemigo){
        //resultado='EMPATE';
        crearMensaje('EMPATE')
        
    }else if(ataqueJugador=='FUEGO' && ataqueEnemigo=='TIERRA'||ataqueJugador=='AGUA' && ataqueEnemigo=='FUEGO'||ataqueJugador=='TIERRA' && ataqueEnemigo=='AGUA'){
        //resultado='GANASTE';
        crearMensaje('GANASTE');
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML=vidasEnemigo; 
        
    }else{
        //resultado='PERDISTE';
        crearMensaje('PERDISTE')
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
        
    }

    revisarVidas();
}

function revisarVidas(){
    if(vidasEnemigo==0){
        crearMensajeFinal('Felicitaciones, Ganaste')
    } else if (vidasJugador==0){
        crearMensajeFinal('lo siente, perdiste')
    }
}

function crearMensaje(resultado){
    let parrafo = document.createElement('p');
    let insertar =document.getElementById('mensajes');
    parrafo.innerHTML='Tu mascota ataco con '+ ataqueJugador + ', la mascota del enemigo ataco con '+ ataqueEnemigo + ' - '+ resultado; ;
    insertar.appendChild(parrafo);
}

function crearMensajeFinal(resultadoFinal){
    let parrafo = document.createElement('p');
    let insertar =document.getElementById('mensajes');
    parrafo.innerHTML= resultadoFinal;
    insertar.appendChild(parrafo);

    let botonFuego =document.getElementById('boton-fuego');
    botonFuego.disabled=true;
    let botonAgua=document.getElementById('boton-agua');
    botonAgua.disabled=true;
    let botonTierra=document.getElementById('boton-tierra');
    botonTierra.disabled=true;

    let sectionReiniciar = document.getElementById('reiniciar');
    sectionReiniciar.style.display = 'block';
}

function reiniciarJuego(){
    location.reload();
}

function aleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);

}

window.addEventListener('load',iniciarJuego)

