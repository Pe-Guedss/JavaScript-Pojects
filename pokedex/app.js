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


fetch ("https://pokeapi.co/api/v2/pokemon/1")
    .then(res => res.json())
    .then(data => {
        console.log(data);
    });