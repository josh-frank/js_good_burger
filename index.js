// Implement Your Code Here

// { id, name, description, image }

const menu = [];
const order = [];

function fetchBurgers() {
  fetch( "http://localhost:3000/burgers" )
  .then( response => response.json() )
  .then( jsonData => jsonData.forEach( burger => renderBurger( burger ) ) );
}

function renderBurger( burger ) {
  let burgerCard = document.createElement( "div" );
  burgerCard.classList.add( "burger" );
  let burgerName = document.createElement( "h3" );
  burgerName.classList.add( "burger_title" );
  burgerName.textContent = burger.name;
  let burgerImage = document.createElement( "img" );
  burgerImage.src = burger.image;
  let burgerDescription = document.createElement( "p" );
  burgerDescription.classList.add( "burger_description" );
  burgerDescription.textContent = burger.description;
  let addButton = document.createElement( "button" );
  addButton.classList.add( "button" );
  addButton.textContent = "Add to Order";
  burgerCard.append( burgerName, burgerImage, burgerDescription, addButton );
  document.getElementById( "burger-menu" ).append( burgerCard );
  burgerCard.dataset.id = burger.id;
  menu.push( burger );
}

function renderOrder() {
  const orderList = document.getElementById( "order-list" );
  orderList.innerHTML = "";
  order.forEach( burger => {
    let thisBurger = document.createElement( "li" );
    thisBurger.innerHTML = burger.name
    orderList.append( thisBurger );
  } );
}

function addBurgerToMenu( burgerClick ) {
  if ( burgerClick.target.className === "button" ) {
    let burgerToOrder = menu.find( burger => burger.id === parseInt( burgerClick.target.closest("div").dataset.id ) );
    order.push( burgerToOrder );
    renderOrder();
  }
}

function createBurger( burgerSubmission ) {
  burgerSubmission.preventDefault();
  let newBurger = {
    name: burgerSubmission.target.querySelector( "input#burger-name" ).value,
    description: burgerSubmission.target.querySelector( "input#burger-description" ).value,
    image: burgerSubmission.target.querySelector( "input#burger-image" ).value
  };
  fetch( "http://localhost:3000/burgers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify( newBurger ) } )
  .then( response => response.json() )
  .then( jsonData => renderBurger( jsonData ) );
}

document.addEventListener( "DOMContentLoaded", function() {
  fetchBurgers();
  document.getElementById( "burger-menu" ).addEventListener( "click", addBurgerToMenu );
  document.getElementById( "custom-burger" ).addEventListener( "submit", createBurger );
} );
