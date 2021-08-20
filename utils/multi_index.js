const anos = document.querySelectorAll(".year");

function asignarAno(e){
    console.log(e)
    localStorage.setItem("ano", `${e.slice(0,1)}`);
    localStorage.setItem("seccion", `${e.slice(1,2)}`);
}

function redireccionarInicio(u){
    window.location.replace(u)
};
