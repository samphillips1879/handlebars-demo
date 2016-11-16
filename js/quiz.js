"use strict";

let carInventory = require('./carLot'),
    eventStuff = require('./events'),
    Handlebars = require('hbsfy/runtime'),//grabbing handlebars/compiling when page loads
    carTemplate = require('../templates/car-grid.hbs');//now a function because it is compiled in the background. when we call that function we will pass in the data we want to bind to our template.

function populatePage (inventory) {
  // Grab the div we want to apppend the cards to
  let cards = document.getElementById("inventory-cards");
  let cardDiv = document.createElement("div"); 
  cardDiv.innerHTML = (carTemplate(inventory));
  cards.appendChild(cardDiv);//appends our rendered html. carTemplate(inventory) returns rendered html
  

  // Now that the DOM is loaded, establish all the event listeners needed
  eventStuff();
}



// The Promises Way puts the callback responsibility on the caller
carInventory.loadInventory()
.then(
  function (inventoryFromLoadInventoryResolve) {
    populatePage(inventoryFromLoadInventoryResolve);
    console.log("carPromise", inventoryFromLoadInventoryResolve);
  },
  function (reason) {
    console.error('Something went wrong', reason);
  });
