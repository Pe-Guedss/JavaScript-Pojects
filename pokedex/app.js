const mainScreen = document.querySelector(".main-screen");

// EXTRACT REQUIRED DOM ELEMENTS
const pokeName = document.querySelector(".poke-name");
const pokeId = document.querySelector(".poke-id");
const pokeFrontImage = document.querySelector(".poke-front-image");
const pokeBackImage = document.querySelector(".poke-back-image");
const pokeTypeOne = document.querySelector(".poke-type-one");
const pokeTypeTwo = document.querySelector(".poke-type-two")
const pokeWeight = document.querySelector(".poke-weight");
const pokeHeight = document.querySelector(".poke-height");

console.log(pokeName);


fetch ("https://pokeapi.co/api/v2/pokemon/4")
    .then(res => res.json())
    .then(data => {
        console.log(data);

        mainScreen.classList.remove("hide");
        pokeName.textContent = data["name"];
        pokeId.textContent = data["id"];
        pokeWeight.textContent = data["weight"];
        pokeHeight.textContent = data["height"];

        const pokeTypes = data["types"];
        const firstType = pokeTypes[0];
        const secondType = pokeTypes[1];

        pokeTypeOne.textContent = firstType["type"]["name"];

        if (secondType) {
            pokeTypeTwo.style.display = "block";
            pokeTypeTwo.textContent = secondType["type"]["name"];
        } else {
            pokeTypeOne.style.margin = "25px 0px 0px 0px";
            pokeTypeTwo.style.display = "none";
        }

        pokeFrontImage.src = data["sprites"]["front_default"] || "";
        pokeBackImage.src = data["sprites"]["back_default"] || "";
    });