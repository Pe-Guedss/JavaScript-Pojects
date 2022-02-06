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

// Constants and Variables
const TYPES = [
    "normal", "fighting", "flying", "poison",
    "ground", "rock", "bug", "ghost",
    "steel", "fire", "water", "grass",
    "electric", "psychic", "ice", "dragon",
    "dark", "fairy"
];

// Functions
const capitalize = (str) => {
    return str[0].toUpperCase() + str.substr(1);
};

const resetScreen = () => {
    mainScreen.classList.remove("hide");
    for (const type of TYPES) {
        mainScreen.classList.remove(type);
    }
};


fetch ("https://pokeapi.co/api/v2/pokemon/3")
    .then(res => res.json())
    .then(data => {
        resetScreen();

        const pokeTypes = data["types"];
        const firstType = pokeTypes[0];
        const secondType = pokeTypes[1];

        pokeTypeOne.textContent = capitalize(firstType["type"]["name"]);

        if (secondType) {
            pokeTypeTwo.style.display = "block";
            pokeTypeTwo.textContent = capitalize(secondType["type"]["name"]);
        } else {
            pokeTypeOne.style.margin = "25px 0px 0px 0px";
            pokeTypeTwo.style.display = "none";
        }

        mainScreen.classList.add(firstType["type"]["name"]);

        pokeName.textContent = capitalize(data["name"]);
        pokeId.textContent = "#" + data["id"].toString().padStart(3, "0");
        pokeWeight.textContent = data["weight"]/10 + " kg";
        pokeHeight.textContent = data["height"]/10 + " m";

        pokeFrontImage.src = data["sprites"]["front_default"] || "";
        pokeBackImage.src = data["sprites"]["back_default"] || "";
    });