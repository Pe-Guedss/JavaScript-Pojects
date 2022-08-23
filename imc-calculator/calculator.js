function calculate(ev) {
    ev.preventDefault();
    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;
    let result = document.getElementById("result");

    let imc = weight/height^2;

    result.innerHTML = `Seu IMC é: ${imc}. Observe a seção das categorias acima!`
}