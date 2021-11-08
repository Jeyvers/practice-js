// DOM Elements
const bars = document.querySelector('.fa-bars');
const listItemsOverlay = document.querySelector('.list-items-overlay');
const listItems = document.querySelector('.list-items');


// Classes and functions
function displayListItems ()  {
    listItemsOverlay.classList.add('transparentBcg');
    listItems.classList.add('show-list-items');
    
}


// Event listeners
bars.addEventListener('click', displayListItems);