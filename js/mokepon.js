function iniciarJuego(){
    let botonMascotaJuegador =document.getElementById("boton-mascota");
    botonMascotaJuegador.addEventListener('click', seleccionarMascotaJugador);

}
function seleccionarMascotaJugador(){
    let inputHipodoge = document.getElementById('hipodoge');
    let inputCapipepo = document.getElementById('capipepo');
    let inputRatigueya = document.getElementById('ratigueya');
    let spanMascotaJugador = document.getElementById('mascota-jugador');
    if(inputHipodoge.checked){
        alert ('seleccionaste a hipodoge');
        spanMascotaJugador.innerText='Hipodoge';
    }else if(inputCapipepo.checked){
        alert('seleccionaste a capipepo');
        spanMascotaJugador.innerHTML='Capipepo';
    }else if(inputRatigueya.checked){
        alert('seleccionaste a ratigueya');
        spanMascotaJugador.innerHTML='Ratigueya';
    }else{
        alert('no se seleciono mascota');
    }
}





window.addEventListener('load',iniciarJuego)

