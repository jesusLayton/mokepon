

const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionReiniciar = document.getElementById('reiniciar');
const botonMascotaJuegador =document.getElementById("boton-mascota");
const botonReiniciar= document.getElementById('boton-reiniciar');
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const spanMascotaJugador = document.getElementById('mascota-jugador');
const spanMascotaEnemigo = document.getElementById('mascota-enemigo');
const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');
const sectionMensaje =document.getElementById('resultado');
const ataquesDelJugador =document.getElementById('ataque-del-juegador');
const ataquesDelEnemigo =document.getElementById('ataque-del-enemigo');

const insertar =document.getElementById('resultado');
const contenedorTarjetas = document.getElementById('contenedorTrjetas');
const contenedorAtaque = document.getElementById("contenedorAtaque");

const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa');
const anchoMaximoDelMapa = 350;


let jugadorId = null;
let mokepones = [];
let ataqueJugador =[];
let ataqueEnemigo =[];
let opcionDeMokepones;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya; 
let mascotaJugador;
let mascotaJugadorObjeto;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let botonFuego; 
let botonAgua;
let botonTierra;
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador =0;
let victoriasEnemigo = 0;
let vidasJugador=3;
let vidasEnemigo=3;
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = './assets/mokemap.png'
let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20;
alturaQueBuscamos = anchoDelMapa * (600/800);
mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

if(anchoDelMapa >anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa -50;
}

class Mokepon{
    constructor(nombre, foto, vida, fotoMapa){
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataque =[];
        this.ancho = 40;
        this.alto = 40;
        this.x= aleatorio(0, mapa.width - this.ancho);
        this.y = aleatorio(0, mapa.height - this.alto);
        this.mapaFoto = new Image();
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0;
        this.velocidadY = 0;
    }
    pintarMokepon(){
        lienzo.drawImage(
           this.mapaFoto,
            this.x,      
            this.y,
            this.ancho,
            this.alto   
        );
    }
}

let hipodoge = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png');
let capipepo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png');
let ratigueya= new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png');

let hipodogeEnemigo = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png');
let capipepoEnemigo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png');
let ratigueyaEnemigo= new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png');

//mokepones.push(hipodoge,capipepo,ratigueya);

hipodoge.ataque.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
);

hipodogeEnemigo.ataque.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
);

capipepo.ataque.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
);
capipepoEnemigo.ataque.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
);

ratigueya.ataque.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
);
ratigueyaEnemigo.ataque.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
);

mokepones.push(hipodoge,capipepo,ratigueya);

function iniciarJuego(){    
    sectionSeleccionarAtaque.style.display = 'none';
    sectionVerMapa.style.display='none';

    mokepones.forEach((mokepon) =>{
        opcionDeMokepones = `
        <input type="radio"name="mascota" id=${mokepon.nombre}>
        <label for=${mokepon.nombre} class="tarjeta-de-mokepon">
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>

        `
    contenedorTarjetas.innerHTML += opcionDeMokepones;
    

    })
    inputHipodoge = document.getElementById('Hipodoge');
    inputCapipepo = document.getElementById('Capipepo');
    inputRatigueya = document.getElementById('Ratigueya');


    sectionReiniciar.style.display = 'none';    
    botonMascotaJuegador.addEventListener('click', seleccionarMascotaJugador);   
      
    botonReiniciar.addEventListener('click', reiniciarJuego);

    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
        .then(function(res){          
            if (res.ok){
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
    })
}
function seleccionarMascotaJugador(){    
    sectionSeleccionarMascota.style.display = 'none';     

    if(inputHipodoge.checked){       
        spanMascotaJugador.innerText=inputHipodoge.id;
        mascotaJugador = inputHipodoge.id;
    }else if(inputCapipepo.checked){        
        spanMascotaJugador.innerHTML=inputCapipepo.id;
        mascotaJugador = inputCapipepo.id;
    }else if(inputRatigueya.checked){        
        spanMascotaJugador.innerHTML=inputRatigueya.id;
        mascotaJugador = inputRatigueya.id;
    }else{
        alert('No se selecionó mascota');
        reiniciarJuego();
    }

    seleccionarMokepon(mascotaJugador);

    extraerAtaues(mascotaJugador);
    sectionVerMapa.style.display ='flex';   
    iniciarMapa();
    
       
}

function seleccionarMokepon(mascotaJugador){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`,{
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })

    })
}

function extraerAtaues(mascotaJugador){
    let ataques;
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador ===mokepones[i].nombre) {
            ataques = mokepones[i].ataque;
            
        }
        
    }
    mostrarAtaque(ataques);
}

function mostrarAtaque(ataques){
    ataques.forEach((ataque) =>{
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque  BAtaque">${ataque.nombre}</button>
        
        

        `
    contenedorAtaque.innerHTML += ataquesMokepon;
    

    })

    botonFuego =document.getElementById('boton-fuego');
    botonAgua=document.getElementById('boton-agua');
    botonTierra=document.getElementById('boton-tierra');
    botones = document.querySelectorAll('.BAtaque');
}

function secuenciaAtaque(){
    botones.forEach((boton) =>{
        boton.addEventListener('click', (e) => {
            if (e.target.textContent=== '🔥') {

                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112F58'
                boton.disabled=true; 
            }else if (e.target.textContent=== '💧'){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112F58'
                boton.disabled=true;

            }else{
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112F58'
                boton.disabled=true;
            }
            ataqueAleatorioEnemigo();
        })
    })
    
}

function seleccionarMascotaEnemigo(enemigo){
    //let mascotaAtaqueAleatorio= aleatorio(0 ,mokepones.length -1);
    spanMascotaEnemigo.innerHTML =enemigo.nombre;
    ataquesMokeponEnemigo = enemigo.ataque;
    secuenciaAtaque();
}



function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1);    
    if(ataqueAleatorio==0||ataqueAleatorio==1){
        ataqueEnemigo.push('FUEGO');
    }else if(ataqueAleatorio==3||ataqueAleatorio==4){
        ataqueEnemigo.push('AGUA');        
    }else {
        ataqueEnemigo.push('TIERRA');
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){
    if (ataqueJugador.length === 5) {
        combate()        
    }

}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate(){   
    
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index]===ataqueEnemigo[index] ) {
            indexAmbosOponentes(index,index);
            crearMensaje("EMPATE");     
            
        } else if (ataqueJugador[index]==='FUEGO'&& ataqueEnemigo[index]==='TIERRA' ) {
            indexAmbosOponentes(index,index);
            crearMensaje("GANASTE");     
            victoriasJugador++              
            spanVidasJugador.innerHTML=victoriasJugador;;    
        } else if (ataqueJugador[index]==='AGUA'&& ataqueEnemigo[index]==='FUEGO' ) {
            indexAmbosOponentes(index,index);
            crearMensaje("GANASTE");     
            victoriasJugador++              
            spanVidasJugador.innerHTML=victoriasJugador;    
        } else{
            indexAmbosOponentes(index,index);
            crearMensaje("PERDISTE");                
            victoriasEnemigo++;
            spanVidasEnemigo.innerHTML=victoriasEnemigo; 

        }                  
    }    
    
    revisarVidas();
}

function revisarVidas(){
    if(victoriasJugador===victoriasEnemigo){
        crearMensajeFinal('Esto fue un empate')
    } else if (victoriasJugador > victoriasEnemigo){
        crearMensajeFinal('Felicidades, ganaste :)')
    } else{
        crearMensajeFinal('Lo siento, perdiste :(')
    }
}

function crearMensaje(resultado){    
    let nuevoAtaqueDelJugador  = document.createElement('p');
    let nuevoAtaqueDelEnemigo  = document.createElement('p');
    sectionMensaje.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML =indexAtaqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;       
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal){        
    insertar.innerHTML= resultadoFinal;    
      
    sectionReiniciar.style.display = 'block';
}

function reiniciarJuego(){
    location.reload();
}

function aleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);

}

function pintarCanvas(){
    mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX;
    mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY;
    lienzo.clearRect(0, 0, mapa.width, mapa.height );
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    );
    mascotaJugadorObjeto.pintarMokepon();

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);

    hipodogeEnemigo.pintarMokepon();
    capipepoEnemigo.pintarMokepon();
    ratigueyaEnemigo.pintarMokepon();
    if (mascotaJugadorObjeto.velocidadX !=0 || mascotaJugadorObjeto.velocidadY != 0){
        
        revisarColision(hipodogeEnemigo);
        revisarColision(capipepoEnemigo);
        revisarColision(ratigueyaEnemigo);
    }
}

function enviarPosicion(x, y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`,{
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
            
        })
    })
}

function moverCapipepoDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}
function moverCapipepoIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
}

function moverCapipepoAbajo(){
    mascotaJugadorObjeto.velocidadY  = 5;
}
function moverCapipepoArriba(){
    mascotaJugadorObjeto.velocidadY  = -5
}
function detenerMovimiento(){
    
    mascotaJugadorObjeto.velocidadX = 0;
    mascotaJugadorObjeto.velocidadY  =0;
}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverCapipepoArriba();            
            break;
        case 'ArrowDown':
            moverCapipepoAbajo();            
            break;
        case 'ArrowLeft':
            moverCapipepoIzquierda();            
            break;
        case 'ArrowRight':
            moverCapipepoDerecha();            
            break;    
        default:
            break;
    }
}

function iniciarMapa(){

    
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50);
    window.addEventListener('keydown', sePresionoUnaTecla);
    window.addEventListener('keyup', detenerMovimiento);
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador ===mokepones[i].nombre) {
            return mokepones[i];
            
        }
        
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + enemigo.alto;
    const derechaEnemigo = enemigo.x + enemigo.ancho;
    const izquierdaEnemigo = enemigo.x;

    const arribaMascota = mascotaJugadorObjeto.y;
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
    const izquierdaMascota = mascotaJugadorObjeto.x;
    if (
        abajoMascota< arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    } 
    detenerMovimiento();
    clearInterval(intervalo);
    sectionSeleccionarAtaque.style.display = 'flex'; 
    sectionVerMapa.style.display ='none';
    seleccionarMascotaEnemigo(enemigo);
    //alert('hay colision' + enemigo.nombre);
}
window.addEventListener('load',iniciarJuego)

