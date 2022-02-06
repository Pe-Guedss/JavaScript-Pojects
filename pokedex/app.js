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

const pokeList = document.querySelectorAll(".list-item");
const prevButton = document.querySelector(".left-button");
const nextButton = document.querySelector(".right-button");


// Constants and Variables
const TYPES = [
    "normal", "fighting", "flying", "poison",
    "ground", "rock", "bug", "ghost",
    "steel", "fire", "water", "grass",
    "electric", "psychic", "ice", "dragon",
    "dark", "fairy"
];

var prevUrl = null;
var nextUrl = null;

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

const fetchPokeData = (id) => {
    fetch (`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(data => {
        resetScreen();

        const pokeTypes = data["types"];
        const firstType = pokeTypes[0];
        const secondType = pokeTypes[1];

        pokeTypeOne.textContent = capitalize(firstType["type"]["name"]);

        if (secondType) {
            pokeTypeTwo.style.display = "block";
            pokeTypeOne.style.margin = "0px 0px 10px 0px";
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
};

const fetchPokeList = (currentUrl) => {
    fetch (currentUrl)
    .then (res => res.json())
    .then (data => {
        const pokemons = data ["results"];
        prevUrl = data ["previous"];
        nextUrl = data ["next"];

        for (let index = 0; index < 20; index++) {
            const pokeListItem = pokeList[index];

            if (pokemons[index]) {
                const pokemon = pokemons[index];
                pokeUrlSplited = pokemon["url"].split("/");

                currentPokeId = pokeUrlSplited[pokeUrlSplited.length - 2];
                currentPokeName = capitalize(pokemon["name"]);

                pokeListItem.textContent = `#${currentPokeId.toString().padStart(3, "0")} ${currentPokeName}`;

            } else {
                pokeListItem.textContent = "";
            }
        }
    });
};

const handleNextButtonClick = () => {
    if (nextUrl) {
        fetchPokeList(nextUrl);
    }
};

const handlePrevButtonClick = () => {
    if (prevUrl) {
        fetchPokeList(prevUrl);
    }
};

const removeIdPadStart = (id) => {
    let count = 0;
    let idTreated = "";
    for (const char of id) {
        if ( count < 3 && (char == "#" || char == "0") ) {
            count++;
            continue;
        } else {
            count = 3;
        }
        idTreated += char;
    }

    return idTreated;
};

const handlePokeClick = (e) => {
    const pokemon = e.target;

    if (!e.target) {
        return;
    }
    if (!pokemon.textContent) {
        return;
    }

    let pokeId = removeIdPadStart(pokemon.textContent.split(" ")[0]);
    
    fetchPokeData(pokeId);
};


// Event Listeners
prevButton.addEventListener("click", handlePrevButtonClick);
nextButton.addEventListener("click", handleNextButtonClick);

for (const pokeListItem of pokeList) {
    pokeListItem.addEventListener("click", handlePokeClick);
}

// Initializing the App Variables
fetchPokeList ("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20")