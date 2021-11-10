// DOM Elements
const bars = document.querySelector('.fa-bars');
const listItemsOverlay = document.querySelector('.list-items-overlay');
const listItems = document.querySelector('.list-items');
const closeBtn = document.getElementById('close-btn');
const imgs = document.querySelectorAll('.showcase-img');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const intervalTime = 5000;
const viewCart = document.querySelector('#view-cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartContent = document.querySelector('.cart-products');

const auto = true;
let imgInterval;
// cart 
let cart = [];

// Classes and functions
// products class 
class Products {

}

class UI {
    listenersDOM() {      
        // Event listeners
        bars.addEventListener('click', this.displayListItems);
        closeBtn.addEventListener('click', this.removeListItems);
        document.addEventListener('click', this.removeListItems);


        // Button events 
        next.addEventListener('click', e => {
            this.nextImg();
            if(auto){
                clearInterval(imgInterval);
                imgInterval = setInterval(this.nextImg, intervalTime);
            }
        });

        prev.addEventListener('click', e => {
            this.prevImg();
            if(auto){
                clearInterval(imgInterval);
                imgInterval = setInterval(this.nextImg, intervalTime);
            }
        });

        // Auto Img
        if(auto){
            // Run next Img at intervalTime tiem
            imgInterval = setInterval(this.nextImg, intervalTime);
        }

        viewCart.addEventListener('click',this.showCart);
        document.addEventListener('click', e => {
            if(e.target === cartOverlay) {
                console.log('hello')
                cartOverlay.classList.remove('transparentBcg')
            }
        })

    }

    displayListItems()  {
        listItemsOverlay.classList.add('transparentBcg');
        listItems.classList.add('show-list-items');
    }
    
    removeListItems(e) {
        if(e.target === listItemsOverlay || e.target === closeBtn) {
            listItemsOverlay.classList.remove('transparentBcg');
            listItems.classList.remove('show-list-items');
        }
    }

    showCart() {
        cartOverlay.classList.add('transparentBcg');
      } 

      
     nextImg (){
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

    prevImg ()  {
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

}


document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    const products = new Products();
    ui.listenersDOM();

})