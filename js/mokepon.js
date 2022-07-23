function iniciarJuego(){
    let botonMascotaJuegador =document.getElementById("boton-mascota");
    botonMascotaJuegador.addEventListener('click', seleccionarMascotaJugador);

}
function seleccionarMascotaJugador(){
    if(document.getElementById('hipodoge').checked){
        alert ('hipodoge')
    }else if(document.getElementById('capipepo').checked){
        alert('capipepo')
    }else if(document.getElementById('ratigueya').checked){
        alert('ratigueya')
    }else{
        alert('no se seleciono mascota')
    }
}





window.addEventListener('load',iniciarJuego)

