const ratingContainer = document.querySelector(".rating");
const promedioContainer = document.querySelector(".promedio");
let currentValue = 0;
const limit = 5;

let lastValue = 0; //ultimo valor de estrellas
let promedio = 0; // valorTotal / totalVotos
let totalVotos = 0; //cantidad de votos
let valorTotal = 0; //suma de todas las votaciones
let votos5estrellas = 0;
let votos4estrellas = 0;
let votos3estrellas = 0;
let votos2estrellas = 0;
let votos1estrellas = 0;

//creo un nuevo arreglo basado en otro arreglo de el num de elementos en limit
//crea un arreglo de 5 elementos por el valor de limit
// el guion bajo es cuando no necesitamos el item
const html = Array.from(Array(limit)).map((_, i) => {
    return `<div class="item item-${i}" data-pos="${i}"></div>`
});

ratingContainer.innerHTML = html.join("");
renderPromedio();

document.querySelectorAll(".item"). forEach(item => {
    item.addEventListener("mouseover", e => {
        const pos = item.getAttribute("data-pos");

        if (currentValue == parseInt(pos) + 1) {
            return;
        }


        document.querySelectorAll(".item"). forEach(it =>{
            if(it.classList.contains("item-full")){
                it.classList.remove("item-full");
            }
        })

        for (let i = 0; i <= pos; i++) {
            const square = document.querySelector(`.item-${i}`);
            
            if (!square.classList.contains("item-full")) {
                square.classList.add("item-full");
            }
        }
        currentValue = parseInt(pos)+1;
    });

    item.addEventListener("click",e =>{
        const pos = item.getAttribute("data-pos");
        
        if (lastValue == 0) {
           lastValue = parseInt(pos)+1;
        }else{
            lastValue = currentValue;
        }
        currentValue = parseInt(pos)+1;

        switch (currentValue) {
            case 5:
                votos5estrellas+=1;
                break;
            case 4:
                votos4estrellas+=1;
                break;
            case 3:
                votos3estrellas+=1;
                break;
            case 2:
                votos2estrellas+=1;
                break;
            case 1:
                votos1estrellas+=1;
                break;
            default:
                break;
        }

        totalVotos+=1;
        valorTotal+=currentValue;
        renderPromedio();
        console.log(currentValue);//basicamente me manda por consola la estrella actual
    });
})

function renderPromedio(){
    const html = sacarPromedio();
    promedioContainer.innerHTML = html;
}

function sacarPromedio(){
    return `
    <div class="prom-left">
        <div class="prom">${valorTotal!=0 ? (valorTotal/totalVotos).toFixed(1) : valorTotal.toFixed(1)}</div>
        <div class="votos">${totalVotos}</div>
    </div>

    <div class="prom-right">
        <span>5</span>
        <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: ${totalVotos != 0 ? (votos5estrellas*100/totalVotos).toFixed(0): 0}%" aria-valuenow="${totalVotos != 0 ? (votos5estrellas*100/totalVotos).toFixed(0): 0}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <span>4</span>
        <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: ${totalVotos != 0 ? (votos4estrellas*100/totalVotos).toFixed(0): 0}%" aria-valuenow="${totalVotos != 0 ? (votos4estrellas*100/totalVotos).toFixed(0): 0}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <span>3</span>
        <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: ${totalVotos != 0 ? (votos3estrellas*100/totalVotos).toFixed(0): 0}%" aria-valuenow="${totalVotos != 0 ? (votos3estrellas*100/totalVotos).toFixed(0): 0}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <span>2</span>
        <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: ${totalVotos != 0 ? (votos2estrellas*100/totalVotos).toFixed(0): 0}%" aria-valuenow="${totalVotos != 0 ? (votos2estrellas*100/totalVotos).toFixed(0): 0}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <span>1</span>
        <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: ${totalVotos != 0 ? (votos1estrellas*100/totalVotos).toFixed(0): 0}%" aria-valuenow="${totalVotos != 0 ? (votos1estrellas*100/totalVotos).toFixed(0): 0}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    </div>`;
}
//puedo agregar que una vez que haga click me diga cuantras estrellas le di, y que quede fijo
//y que se pueda hace media estrella o cero