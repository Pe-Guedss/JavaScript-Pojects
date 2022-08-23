function calculate(ev) {
    ev.preventDefault();
    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;
    let result = document.getElementById("result");

    let imc = (weight/(height^2)).toFixed(2);

    result.innerHTML = `Seu IMC é: ${imc}. Observe a seção das categorias acima!`;

    let category;
    if (imc < 17) {
        category = document.getElementById("very-below");
    } else if (imc >= 17 && imc < 18.5) {
        category = document.getElementById("below");
    }
    else if (imc >= 18.5 && imc < 25) {
        category = document.getElementById("ideal");
    }
    else if (imc >= 25 && imc < 30) {
        category = document.getElementById("above");
    }
    else {
        category = document.getElementById("very-above");
    }

    category.style.color = "red";
}