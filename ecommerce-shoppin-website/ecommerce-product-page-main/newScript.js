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
            <!-- Single collection -->
           
            <div class="img-icons">
            <span class="img-icon" id="next">
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </span>
            <span class="img-icon" id="prev">
              <i class="fa fa-angle-left" aria-hidden="true"></i>
            </span>
            </div
            <div class="image-area">
            <div class="imgs">
                <img src="${product.imgsrc}" class="current showcase-img">
                <img src="${product.imgalt1}" class="showcase-img">
                <img src="${product.imgalt2}" class="showcase-img">
                <img src="${product.imgalt3}" class="showcase-img">
              
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
                    <span class="amount">${product.price} + '$'</span>
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
        // const nexts = [...document.querySelectorAll('#next')];
        // const prevs = [...document.querySelectorAll('#prev')];
        // console.log(nexts, prevs)
        // // Event listeners
        bars.addEventListener('click', this.displayListItems);
        closeBtn.addEventListener('click', this.removeListItems);
        document.addEventListener('click', this.removeListItems);


        // Button events 
        // nexts.forEach(next => {
        //     next.addEventListener('click', e => {
        //         this.nextImg();
        //         if(auto){
        //             clearInterval(imgInterval);
        //             imgInterval = setInterval(this.nextImg, intervalTime);
        //         }
        //     });
        // });

        // prevs.forEach(prev => {
        //     prev.addEventListener('click', e => {
        //         this.prevImg();
        //         if(auto){
        //             clearInterval(imgInterval);
        //             imgInterval = setInterval(this.nextImg, intervalTime);
        //         }
        //     });
        // })

        // // Auto Img
        // if(auto){
        //     // Run next Img at intervalTime tiem
        //     imgInterval = setInterval(this.nextImg, intervalTime);
        // }

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

    //  nextImg (){
    //     const imgs = document.querySelectorAll('.showcase-img');
      
    //     // Get current class
    //     const current = document.querySelector('.current');
    //     // Remove current class
    //     current.classList.remove('current');
    //     // Check for next slide 
    //     if(current.nextElementSibling){
    //         // Add current to next sibling
    //         current.nextElementSibling.classList.add('current');
    //     } else {
    //         // Add current to start
    //         imgs[0].classList.add('current');
    //     }
    //     setTimeout(() => current.classList.remove('current'));
    // };

    // prevImg ()  {
    //     const imgs = document.querySelectorAll('.showcase-img');
    //     // Get current class
    //     const current = document.querySelector('.current');
    //     // Remove current class
    //     current.classList.remove('current');
    //     // Check for next slide 
    //     if(current.previousElementSibling){
    //         // Add current to next sibling
    //         current.previousElementSibling.classList.add('current');
    //     } else {
    //         // Add current to last
    //         imgs[imgs.length - 1].classList.add('current');
    //     }
    //     setTimeout(() => current.classList.remove('current'));
    // };

}

class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products))
    } 
}


document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    const products = new Products();
    // ui.listenersDOM();

    // get all products 
    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProducts(products);
    }).then(() => {
        ui.getCartButtons();
        ui.listenersDOM();
    }) 
})