import { UI } from '../index.js';

const singleStateDOM = document.getElementById('single-state');
const moon = document.getElementById('moon');
let allStates;
let boardingStates = [];
let buttons = [];
const ui = new UI();

const getBorder = (borders) => {
  let states = JSON.parse(localStorage.getItem('states'));

  for (let i in borders) {
    let border = borders[i];
    let boadingState = states.find((state) => state.cca3 === border);
    boardingStates.push(boadingState);
  }
};

const borderButtonsEvent = () => {
  //   console.log(name);
  buttons = document.querySelectorAll('#borderButtons');
  buttons.forEach((button) => {
    button.addEventListener('click', (e) =>
      ui.getSingleState(e.target.textContent)
    );
  });
};

const getStoredState = () => {
  let state = JSON.parse(localStorage.getItem('state'));
  showSingleState(state);
  return state;
};

const showSingleState = (state) => {
  let currency;
  let language;
  let result = '';
  const {
    name,
    flags,
    region,
    population,
    subregion,
    capital,
    currencies,
    languages,
    tld,
    borders,
  } = state;
  const keys = Object.keys(currencies);
  const values = Object.values(currencies);
  // console.log(keys, values);

  for (let i = 0; i < keys.length; i++) {
    // // Grab the key
    // console.log(`Details for ${keys[i]} Currency`);
    // // Grab name value
    // console.log('name:', values[i].name);
    // // Grab symbol value
    // console.log('symbol:', values[i].symbol);
    currency = values[i].name;
  }
  getBorder(borders);
  console.log(window.history);
  let borderButton = '';
  boardingStates.forEach((bord) => {
    borderButton += `<button id="borderButtons" value=${bord.name.official}>${bord.name.common}</button>`;
  });

  language = Object.values(languages);

  result += `
    <article>
        <div class="single-state-flag">
            <img src="${flags.svg}" />
        </div>

        <div class="single-state-information">
        <h1> ${name.official} </h1>
         <div class="single-state-details">
        <div class="first-details">
          <p>
            Native Name:
            <span>${name.common}</span>
          </p>
          <p>
            Population:
            <span>${population.toLocaleString()}</span>
          </p>
          <p>
            Region:
            <span>${region}</span>
          </p>
          <p>
            Sub Region:
            <span>${subregion}</span>
          </p>
          <p>
            Capital:
            <span>${capital}</span>
          </p>
            </div>
          <div class="second-details">
          <p>
            Top Level Domain:
            <span>${tld}</span>
          </p>
          <p>
            Currencies:
            <span>
            ${currency}
            </span>
          </p>
          <p> Languages:    
            <span>  ${language.join(', ')}</span>
          </p>
          </div>
         </div> 
          
          <div class="single-state-borders"> 
         
            <div class="single-state-border-btns">
            <p> Border Countries: </p> ${borderButton}  </div>
          </div>
          </div>
    </article>
          `;

  singleStateDOM.innerHTML = result;
  borderButtonsEvent();
};

moon.addEventListener('click', () => {
  if (!document.body.classList.contains('light')) {
    moon.innerHTML = `  
         </ion-icon>
        <ion-icon name="moon-outline"></ion-icon>
        Dark Mode`;
    document.body.classList.add('light');
  } else {
    moon.innerHTML = `<ion-icon name="moon-sharp"></ion-icon>
        Dark Mode`;
    document.body.classList.remove('light');
  }
});

getStoredState();
