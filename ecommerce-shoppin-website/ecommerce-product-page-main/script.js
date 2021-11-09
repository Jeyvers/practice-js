// DOM Elements
const bars = document.querySelector('.fa-bars');
const listItemsOverlay = document.querySelector('.list-items-overlay');
const listItems = document.querySelector('.list-items');
const closeBtn = document.getElementById('close-btn');
const imgs = document.querySelectorAll('.showcase-img');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const auto = true;
const intervalTime = 5000;
let slideInterval;
const viewCart = document.querySelector('#view-cart');
const cartSection = document.querySelector('.cart-section');




// Classes and functions
function displayListItems()  {
    listItemsOverlay.classList.add('transparentBcg');
    listItems.classList.add('show-list-items');
}

function removeListItems(e) {
    if(e.target === listItemsOverlay || e.target === closeBtn) {
        listItemsOverlay.classList.remove('transparentBcg');
        listItems.classList.remove('show-list-items');
    }
}

function showCart() {
  cartSection.classList.add('transparentBcg');
} 

const nextImg = () => {
    // Get current class
    const current = document.querySelector('.current');
    // Remove current class
    current.classList.remove('current');
    // Check for next slide 
    if(current.nextElementSibling){
        // Add current to next sibling
        current.nextElementSibling.classList.add('current');
    } else {
        // Add current to start
        imgs[0].classList.add('current');
    }
    setTimeout(() => current.classList.remove('current'));
};

const prevImg = () => {
    // Get current class
    const current = document.querySelector('.current');
    // Remove current class
    current.classList.remove('current');
    // Check for next slide 
    if(current.previousElementSibling){
        // Add current to next sibling
        current.previousElementSibling.classList.add('current');
    } else {
        // Add current to last
        imgs[imgs.length - 1].classList.add('current');
    }
    setTimeout(() => current.classList.remove('current'));
};


// Event listeners
bars.addEventListener('click', displayListItems);
closeBtn.addEventListener('click', removeListItems);
document.addEventListener('click', removeListItems);


// Button events 
next.addEventListener('click', e => {
    nextImg();
    if(auto){
        clearInterval(imgInterval);
        imgInterval = setInterval(nextImg, intervalTime);
    }
});

prev.addEventListener('click', e => {
    prevImg();
    if(auto){
        clearInterval(imgInterval);
        imgInterval = setInterval(nextImg, intervalTime);
    }
});

// Auto Img
if(auto){
    // Run next Img at intervalTime tiem
    imgInterval = setInterval(nextImg, intervalTime);
}
viewCart.addEventListener('click', showCart);
document.addEventListener('click', e => {
    if(e.target === cartSection) {
        console.log('hello')
        cartSection.classList.remove('transparentBcg')
    }
})