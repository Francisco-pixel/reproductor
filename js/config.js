import {music} from "./data.js";
let c = console,
    d = document,
    $nav__list=d.querySelector(".nav__list"),
    $nav_icon=d.querySelector(".nav__icon"),
    $nav__icon_class=d.querySelector(".fa-bars"),
    $card__uno = d.querySelector(".card__uno"),
    $card__uno_img = d.querySelector(".card__uno-img"),
    $card__uno_gif = d.querySelector(".card__uno-gif"),
    $card__gif = d.querySelector(".card__gif"),
    $card__cantante = d.querySelector(".card__cantante"),
    $card__titulo = d.querySelector(".card__titulo"),
    $card__barra = d.querySelector(".card__barra"),
    $barra = d.querySelector(".barra"),
    $play = d.querySelector(".fa-play"),
    $card__tiempo = d.querySelector(".card__tiempo"),
    $audio = d.querySelector(".audio"),
    $card__dos = d.querySelector(".card__dos"),
    $card__dos_img = d.querySelector(".card__dos-img"),
    n = 0;
//$btn__prev.addEventListener("click", prev);
$audio.addEventListener("timeupdate", barra);
$card__barra.addEventListener("click",contenedor_barra);


/* Menu lista de canciones */
music.forEach(item=>{
    let {cantante,titulo,index}=item;
    $nav__list.innerHTML+=`<li class="nav__list-li" data-index="${index}">${cantante} (${titulo})</li>`;
})
/* Seleccionar canciones */
let $nav__list_li=d.querySelectorAll(".nav__list-li");
$nav__list_li.forEach((item,id)=>{
    item.addEventListener("click",()=>{
        load_song(id);
        reproducir();
    })
})

/* Botón para mostrar y ocultar listado de música */
let $botonesDelMenu=d.querySelectorAll(".nav__list-li");
$botonesDelMenu[0].classList.add("activo")
//Seleccionar el primer boton del menú
d.addEventListener("click",e=>{
    if(e.target.matches(".prev")){
        prev()
    }
    if(e.target.matches(".fa-pause")){
        play()
    }
    if(e.target.matches(".next")){
        next()
    }
    if(e.target.matches(".nav__list-li")){
        let {index}=e.target.dataset;
        $card__gif.src=music[index].gif;
        d.querySelector(".nav__list-li.activo").classList.remove("activo")
        e.target.classList.add("activo");
    }
})

$nav_icon.addEventListener("click",()=>{
   $nav__icon_class.classList.toggle("fa-times");
   $nav__list.classList.toggle("nav__list--right")
})
/* Cargar canción */
load_song(n);
function load_song(n) {
    let {cantante,titulo,track,img,gif}=music[n];
    $card__cantante.innerHTML = `${cantante}`;
    $card__titulo.innerHTML = `${titulo}`;
    $card__uno_img.src = `${img}`;
    /* $card__gif.src = `${gif}`; */
    $card__uno_img.alt = `${titulo}`;
    $card__dos_img.src = `${img}`;
    $card__dos_img.alt = `${titulo}`;
    $audio.src = `${track}`;
}
/* Botón prev */
function prev() {
    n--;
    if (n < 0) {
        n = music.length - 1;
    }
    cambiarColorDeBotonesDelMenu(n)
    load_song(n);
    reproducir()
}
/* Botón play */
function play() {
    if (d.querySelector(".fa-play")) {        
        reproducir()
    } else {
        detener()
    }
}
/* Botón next */
function next() {
    n++;
    if (n > music.length - 1) {
        n = 0;
    }
    cambiarColorDeBotonesDelMenu(n)
    load_song(n);
    reproducir();
}
/* Reproducir */
function reproducir() {
    $audio.play()
    $play.classList.remove("fa-play");
    $play.style.color = "#2583c5";
    $card__dos.classList.add("card--left")
    $card__dos.classList.add("card--rotar")
    $card__uno.classList.add("card--shadow")
    $card__gif.src = `${music[n].gif}`;
    $card__gif.style.opacity= `1`;
    $card__gif.style.visibility= `visible`;
}
/* Detener */
function detener() {
    $audio.pause()
    $card__uno.classList.remove("card--shadow")
    $card__dos.classList.add("card--left")
    $card__dos.classList.remove("card--rotar")
    $play.classList.add("fa-play");
    $play.style.color = "#757575";
    $card__dos.classList.remove("card--left")
    $card__gif.src = ``;
    $card__gif.style.opacity= `0`;
    $card__gif.style.visibility= `hidden`;
    $card__uno_gif.classList.remove(music[n].clase);
}
/* Barra de música */
function barra(e){
    let {duration,currentTime}=e.srcElement,
    porcentaje=(currentTime/duration)*100;
    $barra.style.width=`${porcentaje}%`;
    if($barra.style.width==`${porcentaje}%`){
        detener()
    }
    /* Minutos y segundos de la canción */
    let min=Math.floor((currentTime / 60) % 60),
    seg=Math.floor(currentTime % 60),
    duracionSeg=Math.floor(duration % 60),
    duracionMin=Math.floor((duration / 60) % 60);
    (min<10)?min=`0${min}`:min;
    (seg<10)?seg=`0${seg}`:seg;
    (duracionMin<10)?duracionMin=`0${duracionMin}`:duracionMin=`${duracionMin}`;
    (duracionSeg<10)?duracionSeg=`0${duracionSeg}`:duracionSeg=`${duracionSeg}`;
    let duracionMinSeg=`${isNaN(duracionMin)?`00`:`${duracionMin}`}:${isNaN(duracionSeg)?`00`:`${duracionSeg}`}`;
    /* Tiempo de la canción */    
    $card__tiempo.innerHTML=`<span>${min}:${seg}</span> <span>${duracionMinSeg}</span>`;
}
/* Contenedor de la barra de duración de las canciones */
function contenedor_barra(e){
let widthX=this.clientWidth,
clickX=e.offsetX,
duration=$audio.duration;
$audio.currentTime=(clickX/widthX)*duration;
}

function cambiarColorDeBotonesDelMenu(n){
    d.querySelector(".nav__list-li.activo").classList.remove("activo")
    d.querySelectorAll(".nav__list-li")[n].classList.add("activo")
}