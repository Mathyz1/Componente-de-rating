const ratingContainer = document.querySelector(".rating");
let currentValue = 0;
const limit = 5;

//creo un nuevo arreglo basado en otro arreglo de el num de elementos en limit
//crea un arreglo de 5 elementos por el valor de limit
// el guion bajo es cuando no necesitamos el item
const html = Array.from(Array(limit)).map((_, i) => {
    return `<div class="item item-${i}" data-pos="${i}"></div>`
});

ratingContainer.innerHTML = html.join("");

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
        currentValue = parseInt(pos)+1;
        console.log(currentValue);//basicamente me manda por consola la estrella actual
    });
})

//puedo agregar que una vez que haga click me diga cuantras estrellas le di, y que quede fijo
//y que se pueda hace media estrella o cero