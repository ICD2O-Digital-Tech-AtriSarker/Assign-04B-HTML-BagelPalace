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
      addTopping('egg');
    }
  }
  else {
    for (let i=currentAmount; i > amount; i--) {
      toppingsContainer.lastChild.remove();
    }
  }
  
}


addTopping('sausage-patty');
addTopping('cheese');
addTopping('egg');