// DOM Elements
const bars = document.querySelector('.fa-bars');
const listItemsOverlay = document.querySelector('.list-items-overlay');
const listItems = document.querySelector('.list-items');
const closeBtn = document.querySelector('.close-btn');


// Classes and functions
function displayListItems()  {
    listItemsOverlay.classList.add('transparentBcg');
    listItems.classList.add('show-list-items');
}

function removeListItems() {
    listItemsOverlay.classList.remove('transparentBcg');
    listItems.classList.remove('show-list-items');
}


// Event listeners
bars.addEventListener('click', displayListItems);
closeBtn.addEventListener('click', removeListItems);
listItemsOverlay.addEventListener('click', removeListItems)