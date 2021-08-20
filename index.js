"use strict"

const menuBtn = document.querySelector('.fa-bars');
const flexContainer = document.querySelector('.flex-container');
const more = document.querySelector(".more");
const infoDelPellin = document.querySelectorAll(".LP__info");
let btn = false;

let contador = 0;

const mostrar = (id) => {
    const DivInfo = document.getElementById(`${id}`);
    console.log(DivInfo.classList.length)
    
   if(DivInfo.classList.length == 0){
       DivInfo.classList.add("mostrar");
   }else{
       DivInfo.classList.remove("mostrar");
   }

};

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
