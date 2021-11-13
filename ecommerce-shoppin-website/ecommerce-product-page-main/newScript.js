// DOM Elements
const bars = document.querySelector('.fa-bars');
const listItemsOverlay = document.querySelector('.list-items-overlay');
const listItems = document.querySelector('.list-items');
const closeBtn = document.getElementById('close-btn');
const productsDOM = document.querySelector('.products-center');
const viewCart = document.querySelector('#view-cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartContent = document.querySelector('.cart-products');
const cartTotal = document.querySelector('.cart-total');
const cartItems = document.querySelector('.cart-items');
const cartContainer = document.querySelector('.container');
const clearCartBtn = document.querySelector('.clear-cart');
const cartEmpty = document.querySelector('#cart-empty');

// cart 
let cart = [];
// buttons
let buttonsDOM = [];

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
          product.promoPrice = parseInt(product.price * product.discount / 100);

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
                  $${product.promoPrice}
                  <span class="discount-percentage">${product.discount}%</span>
                  <span class="amount">$${product.price}</span>
                </h1>
        
                <div>
                <div class="cart-increase">
                  <span class="decrement">
                  <i class="fa fa-minus" aria-hidden="true" data-id=${product.id}></i>
                  </span>
                  <span class="num-available">
                   ${product.amount}
                  </span>
                  <span class="increment">
                    <i class="fa fa-plus" aria-hidden="true" data-id=${product.id}></i>
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
        const buttons = [...document.querySelectorAll(".add-cart-btn")];
        buttonsDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(collection => collection.id === id);
            if(inCart) {
                button.innerText = 'In Cart';
                button.disabled = true; 
            } 
                button.addEventListener('click', (e) => {
                  e.target.innerText = 'In Cart';
                  e.target.disabled = true; 
                  // Get products from products
                  let cartItem = {...Storage.getProduct(id), amount: 1};
                  // Add product to the cart
                  cart = [...cart, cartItem];
                  // Cart in local storage
                  Storage.saveCart(cart);
                  // Set cart values to local storage
                  this.setCartValues(cart);
                  // Add cart item 
                  // Display cart item 
                  this.addCartItem(cartItem);
                  // Show cart item 
                  this.showCartMessage();
                });
            
        });
    }
    setCartValues(cart) {

      let tempTotal = 0;
      let itemsTotal = 0;
      cart.map(collection => {
        tempTotal += collection.promoPrice * collection.amount;
        itemsTotal += collection.amount;
      });
      cartTotal.innerText = parseFloat(tempTotal.toFixed(2))
      cartItems.innerText = itemsTotal;


    }

    addCartItem(collection) {
      collection.itemTempTotal = collection.amount * collection.promoPrice; 
      const div = document.createElement('div');
      div.classList.add('content'); 
      div.innerHTML = `
      <img src="${collection.imgthumbnail}" alt="">
      <div class="content-info">
        ${collection.type}
        <span class="discount-amount">${collection.promoPrice}</span> x <span class="num-available">${collection.amount}</span> <span class="total-amount"> &nbsp;  ${collection.itemTempTotal}</span>
      </div>
      <span class="trash-btn" data-id=${collection.id}>
        <i class="fa fa-trash" aria-hidden="true"></i> 
      </span>
      `;
      
      cartContainer.appendChild(div);
      cartEmpty.style.display = 'none';
      setTimeout(this.showCartMessage(), 2000);
    }

    showCartMessage() {
      const p = document.createElement('p');
      p.classList.add("cart-message");
      p.textContent = 'Item added to cart';
    }

    setupApp() {
      cart = Storage.getCart();
      this.setCartValues(cart);
      this.populateCart(cart);
    }

    populateCart() {
      cart.forEach(collection => this.addCartItem(collection))
    }
    
    cartLogic() {
      // Clear cart button
      clearCartBtn.addEventListener('click',() => {
        this.clearCart();
      }) 
    }

    clearCart() {
      let cartItems = cart.map(collection => collection.id);
      if( cartItems === []) {
        return 
      } else {
        cartItems.forEach(id => this.removeItems(id));
        while(cartContainer.children.length > 0) {
          cartContainer.removeChild(cartContainer.children[0]);
        }
        cartEmpty.innerHTML = 'Your cart is empty'
        cartEmpty.style.display = 'block';
      }

    }

    removeItems(id) {
      cart = cart.filter(collection => collection.id !== id)
      this.setCartValues(cart);
      Storage.saveCart(cart);
      let button = this.getSingleButton(id);
      button.disabled = false;
      button.innerHTML = ` <i class="fa fa-cart-plus" aria-hidden="true"></i> Add to cart`
    };

    getSingleButton(id) {
      return buttonsDOM.find(button => button.dataset.id === id ) 
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

  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem('products'));
    return products.find(product => product.id === id);
  }

  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart))
  } 

  static getCart() {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  }
 

}


document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    const products = new Products();
    ui.setupApp();
    // get all products 
    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProducts(products);
    }).then(() => {
        ui.getCartButtons();
        ui.listenersDOM();
        ui.cartLogic();
        var swiper = new Swiper(".mySwiper", {
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
    }) 
})