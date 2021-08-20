"use strict"
if(localStorage.getItem("ano") == undefined || localStorage.getItem("seccion") == undefined){
    window.location.replace("../../index.html")
}
document.getElementById("title").textContent = `Actividades de ${localStorage.getItem("ano")}° ${localStorage.getItem("seccion")}`;

const spinner = document.querySelector(".spinner");
const database = firebase.database()
const filtrarMateria = document.getElementById("select");
const section = document.getElementById("section");
const requerirMateriaFiltrada = document.getElementById("requerir-materias-filtradas");
let redireccionarATarea;
let divMateria;
let arrayMaterias = []
let contador = 0;

arrayMaterias["Biologia"] = `#c7ff00`;
arrayMaterias["Aeronautica"] = '#a5e';
arrayMaterias["Matematica"] = `red`;
arrayMaterias["Ingles"] = `#191`;
arrayMaterias["Química"] = `rgb(159, 200, 214)`;
arrayMaterias["Educacion Fisica"] = `#6ab5a6`;
arrayMaterias["Ciencias de la Tierra"] = `#c7ffe0`;
arrayMaterias["Castellano"] = `#ccc`;
arrayMaterias["Orientacion y convivencia"] = `#93e7d7`;
arrayMaterias["Formacion para la soberania"] = "#fc3";
//
const aggBorder = () => {
    for(let m of divMateria){
        m.setAttribute("style", `border-left: 15px solid ${arrayMaterias[m.firstElementChild.innerHTML]}; color: ${arrayMaterias[m.firstElementChild.innerHTML]};`);
    };

}
 const aggTareas = () => {

    let Ano_Seccion_Choosen = `${localStorage.getItem("ano")}_ano/${localStorage.getItem("seccion")}`

    const toStringUrl = `/Homeworks/${Ano_Seccion_Choosen}`
    database.ref(toStringUrl).get().then((snapshot) =>{
        let Answer = Object.values(snapshot.val())

        let fragment = document.createDocumentFragment()
        for(let m of Answer){  
            let fix = [];
            let htmlCode = document.createElement("DIV");
            htmlCode.classList.add("main_div");
           
               if(m.Materia.includes('_')){
                console.log(m.Materia)

                   for(let i = 0; i < m.Materia.length; i++){
                        let fixedMatter = m.Materia[i].replace('_', ' ')
                        fix.push(fixedMatter)
                        
                   }
                   m.Materia = fix.join('').toString();
               }
                
            
            htmlCode.innerHTML = `
            <div class="section__Materias"  onclick="url('${contador}')" title="Click para ir a la actividad" >
                <span id="Matter" class="Matter">${m.Materia}</span>
                <span>Contenido: <b>${m.Actividad}</b><i class="fas fa-stream"></i></span>
                <span>N° de Actividad: <b>Actividad ${m.n_actividad}</b><i class="fab fa-google-drive"></i></span>
                <span>Fecha Asignada: <b>${m.Fecha_init}</b><i class="far fa-calendar-alt"></i></span>
                <span>Fecha de entrega: <b>${m.Fecha_entrega}</b><i class="far fa-calendar-alt"></i></span>          
                <a class="url" id=${contador} href="${m.url_document}"></a>
            </div>`         
            fragment.appendChild(htmlCode);
            contador++;
            fix = [];
        };

        let wrapper = document.querySelector(".wrapper");
        wrapper.removeChild(spinner)
        wrapper.appendChild(fragment);
        redireccionarATarea = document.querySelectorAll(".main_div");
        divMateria = document.querySelectorAll(".section__Materias");
        aggBorder();
        // Materia: Materia_Choosen,
        // n_actividad: n_actividad.value,
        // Actividad: Name_Actividad.value,
        // Fecha_init: Fecha_init,
        // Fecha_entrega: Fecha_entrega.value
    })   
    .catch(err => {
        console.log(err);
        aggTareas()
    }) 
    
}
aggTareas()
//Filtrado de materias:

filtrarMateria.addEventListener("change", (e) => {  
    console.log("hola")
    let arrayMainDiv = [];
    for(let m of redireccionarATarea){
        arrayMainDiv.push(m)
    }
    for(let i = 0; i < arrayMainDiv.length; i++){
        if(arrayMainDiv[i].firstElementChild.firstElementChild.innerHTML != filtrarMateria.value){
            
            arrayMainDiv[i].setAttribute("style", "transform:scale(0); position:absolute;")
        }else{
            arrayMainDiv[i].removeAttribute("style");
          }
       
        if(filtrarMateria.value == "Filtrar Materias"){

            arrayMainDiv[i].removeAttribute("style")
        }     
    }
    arrayMainDiv = [];
});


//-------------------------------------------------------------------------------------------//

function url(id){
    let url = document.getElementById(id).href;
    window.location.replace(url);
}



//Añadir boton responsive:
//------------------------------------------------------------------------------------

const menuBtn = document.querySelector('.fa-bars');
let btn = false;
const flexContainer = document.querySelector('.flex-container');

const mq = matchMedia("(max-width: 600px)");

if(mq.matches == false){
    document.querySelector('.btn').style.display = 'none'
}

mq.addEventListener("change", ()=>{
    if(mq.matches){
        document.querySelector('.btn').style.display = 'block'
    }else{
        document.querySelector('.btn').style.display = 'none'
    }
})

menuBtn.addEventListener('click', () => {

    if(btn){
        menuBtn.style.transform = 'rotate(0deg)'
        menuBtn.removeAttribute('style')
        flexContainer.style.right = '100%';

        btn = false;
    }else{
        btn = true;
        flexContainer.style.right = '0%';
        menuBtn.style.animation = 'circle .2s forwards'
        menuBtn.style.transform = 'rotate(90deg)'

    };
});


