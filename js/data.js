export {music};
let music = [],
cantantes=[
    "Tekno",
    "Ilkan Gunuc",
    "Allena",
    "Kings Of Leon",
    "Dadju, Anitta",
    "Nas",
    "Nas",
    "Bruno Mars, Anderson .Paak, Silk Sonic",
    "Raw Alejandro, Selena Gómez",
    "Belanova"
],
titulo=[
    "Skeletun",
    "I Feel Fire",
    "Appelle Moi",
    "Beach Side",
    "Mon soleil",
    "I can",
    "One mic",
    "Leave the Door Open",
    "Baila conmigo",
    "Rosa Pastel"
],
track=[
    "track0.mpeg",
    "track1.mpeg",
    "track2.mpeg",
    "track3.mp3",
    "track4.mp3",
    "track5.mp3",
    "track6.mp3",
    "track7.mp3",
    "track8.mp3",
    "track9.mp3"
],
img=[
    "track0",
    "track1",
    "track2",
    "track3",
    "track4",
    "track5",
    "track6",
    "track7",
    "track8",
    "track9"
],
gif=[
    "gif0",
    "gif1",
    "",
    "gif3",
    "gif4",
    "",
    "",
    "",
    "gif8",
    ""
];
cantantes.forEach((cantante,i)=>{
    let template={
        "index":i,
        "cantante":cantante||"Sin cantante",
        "titulo":titulo[i]||"Sin título",
        "track":`./song/${track[i]||"Sin track"}`,
        "img":`./img/${img[i]||"fondo1"}.jpg`,
        "gif":`./img/${gif[i]||"gifDefault"}.gif`
    }
    music[i]=template;
})