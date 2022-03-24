import { UI } from './index.js';

const singleStateDOM = document.getElementById('single-state');
let boardingStates = [];
const ui = new UI();

const getBorder = (borders) => {
  let states = JSON.parse(localStorage.getItem('states'));

  for (let i in borders) {
    let border = borders[i];
    let boadingState = states.find((state) => state.cca3 === border);
    boardingStates.push(boadingState);
  }
};

// const borderButtonsEvent = () => {
//     c
// }

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

  getBorder(borders);

  let borderButton = '';
  boardingStates.forEach((bord) => {
    borderButton += `<button id="borderButtons">${bord.name.common}</button>`;
  });

  for (let i in currencies) {
    currency = i;
  }

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

  //   currencies[0].name, currencies[1], currencies[2];
};

getStoredState();
