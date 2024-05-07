
// Elements

// FORM
const inputForm = document.getElementById("inputForm");
// Get all radio buttons with the name "size"
var radios = document.getElementsByName('size');
// Toppings Div
const toppingsContainer = document.getElementById('toppingsContainer');
// Side orders and drinks
const onionRingsInput = document.getElementById('onionRingsAmount');
const frenchFriesInput = document.getElementById('friesAmount');
const waterInput = document.getElementById('waterAmount');
const pepsiInput = document.getElementById('pepsiAmount');
// Result Button
const resultBtn = document.getElementById('resultBtn');
// Output Result
const resultDiv = document.getElementById('resultDiv');

// COSTS
// Size Cost
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

// Size Names
const sizeNames = {
  "small": "Small Size",
  "medium": "Medium Size",
  "large": "Large Size"
}
// Toppings Names
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
  "mayo": "Mayonaise 🥪",
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

function getResult() {
  let size = null;
  // Loop through each radio button
  for (let i = 0; i < radios.length; i++) {
    // Check if the radio button is checked
    if (radios[i].checked) {
      // If checked, store its value
      size = radios[i].value;
      // Break the loop as we've found the selected radio button
      break;
    }
  }

  // List of toppings, currently empty
  let toppings = {};
  // Get all dropdowns using queryselector
  let toppingDropdowns = document.querySelectorAll('select');
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

  // Side orders and drinks
  let onionRingsAmount = parseInt(onionRingsInput.value);
  let frenchFriesAmount = parseInt(frenchFriesInput.value);
  let waterAmout = parseInt(waterInput.value);
  let pepsiAmount = parseInt(pepsiInput.value);



  let reciept = [];
  // Add size cost to reciept
  let sizeCost = sizeCosts[size];
  reciept.push(`+$${sizeCost.toFixed(2)} [${sizeNames[size]}]`)

  // Add toppings cost to reciept
  let summedToppingsCost = 0.00;
  for (let i = 0; i < Object.keys(toppings).length; i++) {
    console.log(i);
    let topping = Object.keys(toppings)[i];
    console.log(topping);
    let toppingCost = toppingCosts[topping];
    let toppingAmount = toppings[topping];
    let toppingCostTotal = toppingCost * toppingAmount;
    summedToppingsCost += toppingCostTotal;
    reciept.push(`+$${toppingCostTotal.toFixed(2)} [${toppingNames[topping]} x${toppingAmount}]`)
  }

  // Add Topping Premium to reciept
  let toppingPremium = summedToppingsCost * toppingsValue[size];
  reciept.push(`+$${toppingPremium.toFixed(2)} [${sizeNames[size]} toppings Increment]`)

  // Add side orders and drinks cost to reciept
  let summedSideOrderAndDrinksCost = 0.00;
  if (onionRingsAmount>0) {
    let cost = onionRingsAmount * onionRingsCost;
    summedSideOrderAndDrinksCost += cost;
    reciept.push(`+$${cost.toFixed(2)} [Onion Rings x${onionRingsAmount}]`);
  }
  if (frenchFriesAmount>0) {
    let cost = frenchFriesAmount * frenchFriesCost;
    summedSideOrderAndDrinksCost += cost;
    reciept.push(`+$${cost.toFixed(2)} [French Fries x${frenchFriesAmount}]`);
  }
  // for pepsi
  if (pepsiAmount>0) {
    let cost = pepsiAmount * pepsiCost;
    summedSideOrderAndDrinksCost += cost;
    reciept.push(
      `+$${cost.toFixed(2)} [500ml Pepsi x${pepsiAmount}]`);
  }
  // for water 
  if (waterAmout>0) {
    let cost = waterAmout * waterCost;
    summedSideOrderAndDrinksCost += cost;
    reciept.push(
      `+$${cost.toFixed(2)} [1000ml Water x${waterAmout}]`);
  }

  // Calculate subtotal, tax, and total
  let subtotal = sizeCost + summedToppingsCost + toppingPremium + summedSideOrderAndDrinksCost;
  let tax = subtotal * HST;
  let total = subtotal + tax;

  // Add subtotal, tax, and total to reciept
  reciept.push(`<b>Subtotal: $${subtotal.toFixed(2)}</b>`);
  reciept.push(`<b>HST: $${tax.toFixed(2)}</b>`);
  reciept.push(`<b>Total: $${total.toFixed(2)}</b>`);

  // Display
  resultDiv.innerHTML = reciept.join("<br>");
}


inputForm.onsubmit = () => {
  getResult();
  return false;
}