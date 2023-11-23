/*
  Author: CodingChar
  This code was made for reusability and readability purposes.
*/

// Functions

// Renders the data on the webpage
function render() {
  const {
    emission,
    consented,
    houses,
    recycled,
    plasticGRecycled,
    homelessSaved
  } = actualData;

  saved();

  emissionCounter.innerText = `${emission / 1000000} tons`; // Displays the emission value in tons
  consentedCounter.innerText = consented; // Displays the consented value
  housesCounter.innerText = `${houses} (${homelessSaved} people in total)`; // Displays the number of houses and the total number of people saved
  recycledBottlesCounter.innerText = `${recycled} (${plasticGRecycled}g) x ${consented}`; // Displays the number of recycled bottles, the total weight of recycled plastic, and the consented value

  return actualData;
}

// Checks if a certain number of people have been saved and displays an alert message if true
function saved() {
  let demo_limit = 10;
  if (actualData.homelessSaved >= demo_limit) {
    alert(`You gave a home to ${demo_limit} people`);
    alert("I think you should use this solution in more places, and with a different social method.");
    alert("Thanks for the help! - Char and everyone.");
    setDefault();
  }
}

// Calculates the number of houses that can be built based on the amount of recycled plastic
function calcHouses() {
  let bricks = Math.floor(actualData.recycledTotal / plasticPerBrick);
  let houses = Math.floor(bricks / bricksPerHouse);

  return houses;
}

// Updates the data when the recycle button is clicked
function recycle() {
  actualData.recycled += 1;
  actualData.recycledTotal = actualData.recycled * actualData.consented;
  actualData.plasticGRecycled = actualData.recycledTotal * gPerBottle;
  actualData.emission -= emissionPerBottle * actualData.recycledTotal;
  actualData.emission += emissionPerBottle * actualData.recycledTotal + 50;
  actualData.houses = calcHouses();
  actualData.homelessSaved = Math.floor(actualData.houses * peoplePerHouse);
}

// Simulates a social media post and updates the data accordingly
function doPost() {
  let follows = Math.floor(Math.random() * followersRandomLimit);
  follows = (follows == 0) ? 1 : follows;
  console.log(`+Follows ${follows}`);
  actualData.consented += follows;
}

// Retrieves data from the local storage
function getData() {
  return JSON.parse(localStorage.getItem('bottles'));
}

// Updates the data in the local storage
function updateData() {
  const stringifyedObject = JSON.stringify(actualData);
  localStorage.setItem('bottles', stringifyedObject);
}

// Sets the default values for the data
function setDefault() {
  actualData = defaultSchema;
  const stringifyedObject = JSON.stringify(defaultSchema);
  localStorage.setItem('bottles', stringifyedObject);
}

// Checks if the user has any stored data and updates the webpage accordingly
function checkData() {
  let data = getData();

  if (!data) {
    console.log("The user has no data stored");

    setDefault();
    render();

    return false;
  } else {
    console.log("The user has data stored");

    actualData = getData();
    render();

    return true;
  }
}

// Main document objects
const emissionCounter = document.getElementById("emission-counter");
const consentedCounter = document.getElementById("consented-counter");
const housesCounter = document.getElementById("built-counter");
const recycledBottlesCounter = document.getElementById("recycled-counter");
const recycleBtn = document.getElementById("recycle_btn");
const postBtn = document.getElementById("post_btn");

// Variables constantes
const plasticGPerYear = 88_000_000_000; // Grams

// Variables modificables
let homeless = 662_520; // Based on statistics from the Dominican Republic in 2021
let plasticPerBrick = 500; // Grams
let gPerBottle = 20; // Grams
let emissionPerBottle = 82; // Grams
let bricksPerHouse = 5_000; // Bricks
let peoplePerHouse = 5;
let housesNeeded = Math.floor(homeless / peoplePerHouse); // Houses
let bricksNeeded = housesNeeded * bricksPerHouse; // Plastic bricks
let plasticNeeded = bricksNeeded * plasticPerBrick; // Grams
let followersRandomLimit = 1500;

// Data used during execution
let defaultSchema = {
  emission: plasticGPerYear,
  consented: 1,
  recycled: 0,
  homeless: homeless,
  homelessSaved: 0,
  houses: 0,
  recycledTotal: 0,
  plasticGRecycled: 0
};

let actualData = {};

checkData(); // Checking if the user has data

// Button events
recycleBtn.addEventListener("click", e => {
  e.preventDefault();
  recycle();
  updateData();
  render();
});

postBtn.addEventListener('click', e => {
  e.preventDefault();
  doPost();
  updateData();
  render();
});
