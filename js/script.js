/*
* Created by: Atri Sarker
* Created on: May, 2024
* Description: This file contains the script.js for the Burger Palace website. This script is in charge of getting the user input/order and calculating+displaying the subtotal, tax, and total of the order.
*/
'use strict'; // Strict mode

// Elements

// INPUT FORM
const inputForm = document.getElementById("inputForm");

// List of the radio buttons for the size selection
var radios = document.getElementsByName('size');

//  Container for Topping Dropdowns, not used
// const toppingsContainer = document.getElementById('toppingsContainer');

// Side orders and drinks
const onionRingsInput = document.getElementById('onionRingsAmount');
const frenchFriesInput = document.getElementById('friesAmount');
const waterInput = document.getElementById('waterAmount');
const pepsiInput = document.getElementById('pepsiAmount');

// Result Button
const resultBtn = document.getElementById('resultBtn');
// Output Result Container
const resultDiv = document.getElementById('resultDiv');

// COSTS
// Size Costs
const sizeCosts = {
  "small": 3.00,
  "medium": 5.00,
  "large": 7.00
}

// toppings extra costs, regular price for small and medium
// 30% extra cost for large
const toppingsValue = {
  "small": 0,
  "medium": 0,
  "large": 0.30
}

// Toppings Cost List
const toppingCosts = {
  "sausage-patty": 0.50,
  "vegetable-patty": 0.50,
  "egg": 0.50,
  "tomato": 0.30,
  "red-onion": 0.30,
  "lettuce": 0.30,
  "cheese": 0.50,
  "onion-ring": 0.50,
  "hash-brown": 0.50,
  "coleslaw": 0.40,
  "ketchup": 0.10,
  "mayo": 0.10,
  "mustard": 0.10,
  "bbq": 0.10,
  "ranch": 0.10
}

// Size Names, for receipt charges
const sizeNames = {
  "small": "Small Size",
  "medium": "Medium Size",
  "large": "Large Size"
}

// Toppings Names, for receipt charges
const toppingNames = {
  "sausage-patty": "Sausage Patty 🍖",
  "vegetable-patty": "Vegetable Patty 🥦",
  "egg": "Egg 🍳",
  "tomato": "Tomato 🍅",
  "red-onion": "Red Onion 🧅",
  "lettuce": "Lettuce 🥬",
  "cheese": "Cheese 🧀",
  "onion-ring": "Onion Ring 🧅",
  "hash-brown": "Hash Brown 🥔",
  "coleslaw": "Coleslaw 🥗",
  "ketchup": "Ketchup 🍅",
  "mayo": "Mayonnaise 🥪",
  "mustard": "Mustard 🌭",
  "bbq": "Barbeque Sauce 🔥",
  "ranch": "Ranch 🥗"
}

// Side orders and drinks costs
const onionRingsCost = 5.00;
const frenchFriesCost = 3.00;
const waterCost = 1.00;
const pepsiCost = 4.00;

// TAX
const HST = 0.13;

// main function, called upon button click [form submission]
function getResult() {

  // Get size
  let size = null;
  // Loop through each radio button
  for (let i = 0; i < radios.length; i++) {
    // Check if the radio button is checked
    if (radios[i].checked) {
      // If checked, set size to the value
      size = radios[i].value;
      // Break the loop because the selected radio button has been found
      break;
    }
  }

  // List of toppings, initialized as empty
  let toppings = {};
  
  // Get all topping dropdowns using queryselector
  let toppingDropdowns = document.querySelectorAll('select');
  
  // For each dropdown
  for (let i = 0; i < toppingDropdowns.length; i++) {
    let topping = toppingDropdowns[i].value;

    // If toppings {} does not have the topping as a key, add it
    if (!toppings[topping]) {
      toppings[topping] = 1;
    }
    // Else, increment the value of the topping by 1
    else {
      toppings[topping] += 1;
    }
  }
  // Toppings are now contained within toppings{}
  // toppings{key (topping name): value (number of toppings)}

  // Side orders and drinks
  let onionRingsAmount = parseInt(onionRingsInput.value);
  let frenchFriesAmount = parseInt(frenchFriesInput.value);
  let waterAmout = parseInt(waterInput.value);
  let pepsiAmount = parseInt(pepsiInput.value);


  // Initialize receipt, list that contains/logs all charges
  let receipt = [];
  
  // Get size cost
  let sizeCost = sizeCosts[size];
  // Add size cost to receipt
  receipt.push(`+$${sizeCost.toFixed(2)} [${sizeNames[size]}]`)

  // Get toppings cost
  let summedToppingsCost = 0.00;
  // Uses a for in loop to sum the cost of each topping
  for (let i = 0; i < Object.keys(toppings).length; i++) {
    // Get topping Name
    let topping = Object.keys(toppings)[i];
    // Get cost of topping
    let toppingCost = toppingCosts[topping];
    // Get amount of topping
    let toppingAmount = toppings[topping];
    // multiply cost with amount to get total cost for topping
    let toppingCostTotal = toppingCost * toppingAmount;
    // Add it to the total topping cost sum
    summedToppingsCost += toppingCostTotal;

    // Add charge to receipt
    receipt.push(`+$${toppingCostTotal.toFixed(2)} [${toppingNames[topping]} x${toppingAmount}]`);
  }

  // Get Topping Premium [30% extra cost for large]
  let toppingPremium = summedToppingsCost * toppingsValue[size];
  // Add the charge to the receipt
  receipt.push(`+$${toppingPremium.toFixed(2)} [${sizeNames[size]} Toppings additional cost]`);

  // Initialize variable to store summed cost for side-orders and drinks
  let summedSideOrderAndDrinksCost = 0.00;

  // Go through each side-order and drink
  // If ordered, add the total cost (amount*cost) to the summed cost
  // also, add the charge to the receipt

  // Onion Rings
  if (onionRingsAmount>0) {
    let cost = onionRingsAmount * onionRingsCost;
    summedSideOrderAndDrinksCost += cost;
    receipt.push(`+$${cost.toFixed(2)} [Onion Rings x${onionRingsAmount}]`);
  }
  // French Fries
  if (frenchFriesAmount>0) {
    let cost = frenchFriesAmount * frenchFriesCost;
    summedSideOrderAndDrinksCost += cost;
    receipt.push(`+$${cost.toFixed(2)} [French Fries x${frenchFriesAmount}]`);
  }
  // Pepsi
  if (pepsiAmount>0) {
    let cost = pepsiAmount * pepsiCost;
    summedSideOrderAndDrinksCost += cost;
    receipt.push(
      `+$${cost.toFixed(2)} [500ml Pepsi x${pepsiAmount}]`);
  }
  // Water
  if (waterAmout>0) {
    let cost = waterAmout * waterCost;
    summedSideOrderAndDrinksCost += cost;
    receipt.push(
      `+$${cost.toFixed(2)} [1000ml Water x${waterAmout}]`);
  }

  // Calculate subtotal, tax, and total
  let subtotal = sizeCost + summedToppingsCost + toppingPremium + summedSideOrderAndDrinksCost;

  // calculate tax whilst rounding to 2 decimal places
  let tax = Math.round(100*subtotal*HST)/100;
  let total = subtotal + tax;

  // Add subtotal, tax, and total to receipt [bolded]
  receipt.push(`<b>Subtotal: $${subtotal.toFixed(2)}</b>`);
  receipt.push(`<b>HST: $${tax.toFixed(2)}</b>`);
  receipt.push(`<b>Total: $${total.toFixed(2)}</b>`);

  // Display the receipt, all charges separed by a line break
  resultDiv.innerHTML = receipt.join("<br>");
}

// Connect form submission to getResult()
// returns false to prevent page from reloading
inputForm.onsubmit = () => {
  getResult();
  return false;
}