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
const cartContainer = document.querySelector('.cart-container');
const clearCartBtn = document.querySelector('.clear-cart');
const cartEmpty = document.querySelector('#cart-empty');
const cartFooter = document.querySelector('.cart-footer');
var widths = [0, 800];
// cart 
let cart = [];
// buttons
let buttonsDOM = [];
let numDOM = [];

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
                 <!-- Swiper 2-->
            <div class="swiper mySwiper2 hidden">
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
                 <!-- Swiper 1-->
            <div thumbSlider="" class="swiper mySwiper">
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
        
                <div class="cart-functions">
                <div class="cart-increase">
                  
                  <i class="fa fa-minus decrement" aria-hidden="true" data-id=${product.id}></i>
                  
                  <span class="num-available" data-id=${product.id}>
                   ${product.itemAmount}
                  </span>
                  
                    <i class="fa fa-plus increment" aria-hidden="true" data-id=${product.id}></i>
                  
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

    cartButtonEvent() {

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
                  let cartItem = {...Storage.getProduct(id)};
                  cartItem.itemAmount = 1;
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
                });
            
        });
    }
    setCartValues(cart) {

      let tempTotal = 0;
      let itemsTotal = 0;
      cart.map(collection => {
        tempTotal += collection.promoPrice * collection.itemAmount;
        itemsTotal += collection.itemAmount;
      });
      cartTotal.innerText = parseFloat(tempTotal.toFixed(2))
      cartItems.innerText = itemsTotal;


    }

    addCartItem(collection) {
      collection.itemTempTotal = collection.itemAmount * collection.promoPrice; 
      const div = document.createElement('div');
      div.classList.add('content'); 
      div.innerHTML = `
      <img src="${collection.imgthumbnail}" alt="">
      <div class="content-info">
        ${collection.type}
        <span class="discount-amount">${collection.promoPrice}</span> x <span class="num-available" data-id=${collection.id}>${collection.itemAmount}</span> <span class="total-amount"> &nbsp;  ${collection.itemTempTotal}</span>
      </div>
      <span class="trash-btn" data-id=${collection.id}>
        <i class="fa fa-trash remove-item" aria-hidden="true" data-id=${collection.id}></i> 
      </span>
      `;
      cartContainer.appendChild(div);
      cartEmpty.innerHTML = '';
      cartEmpty.style.display = 'none';
    }

    showCartMessage(message) {
      const h3 = document.createElement('h3');
      h3.className = `cart-message`;
      h3.appendChild(document.createTextNode(message))
      const showcase = document.querySelector('.showcase');
      showcase.appendChild(h3);

      // Vanish in 4 seconds 
      setTimeout(() => {
        document.querySelector('.cart-message').remove()
      }, 2000);
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
      });
      // cart functionality 
      cartContainer.addEventListener('click', e => {
        if(e.target.classList.contains('remove-item')) {
          let removeItem = e.target;
          let id = removeItem.dataset.id;
          this.removeItems(id);
          cartContainer.removeChild(removeItem.parentElement.parentElement)  
        }
      }); 

    }

    DOMCartLogic() {
      productsDOM.addEventListener('click', e => {
        let id = e.target.dataset.id;
        let inCart = cart.find(collection => collection.id === id);
        let cartItem = {...Storage.getProduct(id)};
        const nums = [...document.querySelectorAll('.num-available')];
        const numid = nums.find(num => num.dataset.id === id);
        const products = JSON.parse(localStorage.getItem('products'));
         const productsIncart = products.find(product => product.id === id);
        // if (e.target.classList.contains('increment')) {
        //   if(inCart) {
        //     inCart.itemAmount++;
        //    productsIncart.itemAmount = inCart.itemAmount;
        //   numid.textContent = inCart.itemAmount;
        //   } 
        if (e.target.classList.contains('increment')) {
          if(inCart) {
           let addAmount = e.target;
           let id = addAmount.dataset.id;
           let tempItem = cart.find(item => item.id === id);
           tempItem.itemAmount = tempItem.itemAmount + 1;
           Storage.saveCart(cart);
           this.setCartValues(cart);
           addAmount.previousElementSibling.innerText = tempItem.itemAmount;
           let tempItem2 = products.find(collection => collection.id === id);
           tempItem2.itemAmount = tempItem2.itemAmount + 1;
          Storage.saveProducts(products);

          } else {
            this.showCartMessage('Item has not been added to cart')
          }
        } else if(e.target.classList.contains('decrement')) {
          if(inCart) {
            if(inCart.itemAmount === 1) {
              this.showCartMessage('Minimum Amount is 1')
              return false;
            } else {
          inCart.itemAmount--;
          productsIncart.itemAmount = inCart.itemAmount;
          numid.textContent = inCart.itemAmount;
            }
          } else {
            this.showCartMessage('Item has not been added to cart')
          }
        }
                
                  // Cart in local storage
                  Storage.saveCart(cart);
                  // Set cart values to local storage
                  this.setCartValues(cart);
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
        cartEmpty.innerHTML = 'Your cart is empty';
        cartEmpty.style.display = 'block';
      }

    }

    removeItems(id) {
      cart = cart.filter(collection => collection.id !== id)
      this.setCartValues(cart);
      Storage.saveCart(cart);
      let button = this.getSingleButton(id);
      button.disabled = false;
      button.innerHTML = ` <i class="fa fa-cart-plus" aria-hidden="true"></i> Add to cart`;
      this.showCartMessage('Item deleted succesfully')
      if(cart = []) {
        cartEmpty.innerHTML = 'Your cart is empty';
        cartEmpty.style.display = 'block';
      }
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

    smallScreenSize() {
      var swiper = new Swiper(".mySwiper", {
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
    }

    bigScreenSize() {
      var swiper = new Swiper(".mySwiper", {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
      });
      var swiper2 = new Swiper(".mySwiper2", {
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        thumbs: {
          swiper: swiper,
        },
      });
    }

    resizeFn() {
      if (window.innerWidth >= widths[0] && window.innerWidth <= widths[1]) {
        this.smallScreenSize();
      } else{
        this.bigScreenSize();
      }
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
        ui.DOMCartLogic();
        ui.resizeFn();
        window.onresize = ui.resizeFn();
    }) 
})