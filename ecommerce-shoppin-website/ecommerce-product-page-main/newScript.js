// DOM Elements
const bars = document.querySelector('.fa-bars');
const listItemsOverlay = document.querySelector('.list-items-overlay');
const listItems = document.querySelector('.list-items');
const closeBtn = document.getElementById('close-btn');
const productsDOM = document.querySelector('.products-center');
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
    async getProducts() {
        try { 
            let result = await fetch('products.json')
            let data = await result.json();
            let products = data.collections;
            // products = products.map(collection => {
            //     const {id, imgsrc, imgalt1, imgalt3, imgthubnail, gender, brand, title, description, price, discount} = collection;
            //     return {id, imgsrc, imgalt1, imgalt3, imgthubnail, gender, brand, title, description, price, discount} 
            // })
            return products
        } catch (error) {
            console.log(error)
        }
    }
}

class UI {
    
    displayProducts(products) {
        let result = '';
        products.forEach(product => {
            result += `
            <article>
            <div id="img-container">
            <div class="image-area">
          <div class="imgs">
                 <!-- Swiper -->
            <div class="swiper mySwiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide"> 
                 <img src="${product.imgsrc}" class="showcase-img">
                </div>
                <div class="swiper-slide">
                 <img src="${product.imgalt1}" class="showcase-img">
                </div>
                <div class="swiper-slide">
                 <img src="${product.imgalt2}" class="showcase-img">
                </div>
                <div class="swiper-slide">  
                 <img src="${product.imgalt3}" class="showcase-img">
                </div>
              </div>
              
              <div class="swiper-button-next"></div> 
              <div class="swiper-button-prev"></div>
            </div>
            
          </div>
            </div>
        
            <div class="image-information-area">
              <h4>${product.brand}</h4>
              <h1>${product.title}</h1>
              <p>
                ${product.description}</p>
        
                <h1 class="discount-amount">
                  $125.00
                  <span class="discount-percentage">${product.discount}</span>
                  <span class="amount">${product.price}</span>
                </h1>
        
                <div>
                <div class="cart-increase">
                  <span class="decrement">
                  <i class="fa fa-minus" aria-hidden="true"></i>
                  </span>
                  <span class="num-available">
                    0
                  </span>
                  <span class="increment">
                    <i class="fa fa-plus" aria-hidden="true"></i>
                  </span>
                  </div>
                  <button class="add-cart-btn" data-id="${product.id}">
                    <i class="fa fa-cart-plus" aria-hidden="true"></i> Add to cart
                  </button>
                </div>
        
            </div>
          </div>
            </article>
            `;
        });
        productsDOM.innerHTML = result;
    }

    listenersDOM() {      
        // // Event listeners
        bars.addEventListener('click', this.displayListItems);
        closeBtn.addEventListener('click', this.removeListItems);
        document.addEventListener('click', this.removeListItems);

        viewCart.addEventListener('click',this.showCart);
        document.addEventListener('click', e => {
            if(e.target === cartOverlay) {
                cartOverlay.classList.remove('transparentBcg')
            }
        })

    }

    getCartButtons() {
        const buttons = [...document.querySelectorAll(".add-cart-btn")]
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(collection => collection.id);
            if(inCart) {
                button.innerText = 'In Cart';
                button.disabled = true; 
            } else {
                button.addEventListener
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

}

class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products))
    } 
}


document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    const products = new Products();

    // get all products 
    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProducts(products);
    }).then(() => {
        ui.getCartButtons();
        ui.listenersDOM();
        var swiper = new Swiper(".mySwiper", {
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
    }) 
})