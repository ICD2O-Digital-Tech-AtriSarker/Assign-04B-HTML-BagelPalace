'use strict';
const toppingsDiv = document.getElementById('toppingsContainer');
const amountOfToppingsInput = document.getElementById('amountOfToppings');

let toppingDivOriginal = document.getElementById('toppingTemplate');
const toppingDivTemplate = toppingDivOriginal.cloneNode(true);
toppingDivOriginal.remove();

function getChild(parent, elementType) {
  let children = parent.childNodes;
  for (let i = 0; i < children.length; i++) {
    if (children[i].nodeName.toLowerCase() === elementType) {
      return children[i];
    }
  }
  return null;
}

function newTopping() {
  return toppingDivTemplate.cloneNode(true);
}

function addTopping(toppingName, pos = "default") {

  if (pos === "default") {
    pos = toppingsContainer.childNodes.length;
  }
  let topping = newTopping();
  // let topping = newTopping();
  let dropdownList = getChild(topping, "select");

  toppingsContainer.appendChild(topping);

  dropdownList.value = toppingName;
  dropdownList.id = `topping${pos}`

  dropdownList.addEventListener('change', drawSandwich);
}

amountOfToppingsInput.oninput = () => {
  let amount = Number(amountOfToppingsInput.value);
  let maxAmount = Number(amountOfToppingsInput.getAttribute("max"))
  if (amount > maxAmount) {
    amount = maxAmount;
    amountOfToppingsInput.value = amount;
  }
  else if (amount < 0) {
    amount = 0;
    amountOfToppingsInput.value = amount;
  }
  else if ( amount % 1 != 0 ) {
    amount = Math.floor(amount);
    amountOfToppingsInput.value = amount;
  }

  
  let current = toppingsContainer.childNodes;
  let currentAmount = current.length - 2;
  if (currentAmount == amount) {
    return
  }

  if (currentAmount < amount) {
    for (let i=currentAmount; i < amount; i++) {
      addTopping('sausage-patty');
    }
  }
  else {
    for (let i=currentAmount; i > amount; i--) {
      toppingsContainer.lastChild.remove();
    }
  }

  drawSandwich();
}


addTopping('sausage-patty');
addTopping('cheese');
addTopping('egg');


// DISPLAY SANDWICH CODE

// Get the canvas element for displaying the sandwich
const sandwichDisplay = document.getElementById('sandwichDisplay');

// Get the render/draw element for the canvas
const render = sandwichDisplay.getContext('2d');

// FILEPATH FOR TOPPING IMAGES
const imagePath = './.././images/toppings/';

// function that gets image
function image(toppingName) {
  let img = new Image();
  img.src = imagePath + toppingName + '.png';
  return img
}

let version = 0;
// function that draws the sandwich()
function drawSandwich() {

  version += 1;
  let currentVersion = version;

  // Clear canvas
  render.clearRect(0, 0, sandwichDisplay.width, sandwichDisplay.height);

  
  let toppingList = []

  toppingList.push("top-bagel")
  // Get all dropdowns using queryselector
  let toppingDropdowns = document.querySelectorAll('select');
  for (let i = 0; i < toppingDropdowns.length; i++) {
    let topping = toppingDropdowns[i].value;
    toppingList.push(topping);
  }
  toppingList.push("bottom-bagel")

  // reverse the list, as drawing will be done bottom to top
  toppingList.reverse();
  console.log(toppingList)

  

  // Resize canvas to fit sandwich (27px per topping)
  sandwichDisplay.height = 27 * (toppingList.length+1)
  
  // Get canvas width and height
  let canvasWidth = sandwichDisplay.width;
  let canvasHeight = sandwichDisplay.height;

  // Dimensions for the topping Images
  let toppingHeight = (canvasHeight) / (1+ toppingList.length*0.25);
  let toppingWidth = Math.min(canvasWidth,toppingHeight * 1.8);
  let drawX = canvasWidth / 2 - toppingWidth / 2;

  // Recursion function to draw the toppings
  let drawTopping = (zIndex) => {
    if (zIndex >= toppingList.length ) {
      return
    }
    if (currentVersion != version) {
      return
    }
    let toppingName = toppingList[zIndex];
    let img = image(toppingName);
    img.onload = () => {
      let drawY = canvasHeight - toppingHeight * (zIndex/4 + 1)
      render.drawImage(img, drawX, drawY, toppingWidth, toppingHeight);
      drawTopping(zIndex + 1);
    }
  }

  drawTopping(0);
  

  console.log(1)
  
}

drawSandwich();

// Connect dropdown selection change to drawSandwich