const statesList = document.getElementById('states-list');
const searchInput = document.getElementById('search-input');
const selectMenu = document.getElementById('select-menu');
const menuOptionsBtn = document.querySelector('.menu-options-btn');
const options = document.querySelector('.options');
const showError = document.querySelector('.show-error');
const showLoading = document.getElementById('show-loading');
const moon = document.getElementById('moon');
let loading = true;
let allStates;
let statesDOM = [];

class States {
  // Fetch states from api
  async getStates() {
    try {
      if (loading) {
        showLoading.classList.add('show-loading');
      }
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      allStates = data;
      return data;
    } catch (error) {
      showError.innerHTML = error;
      showLoading.classList.remove('show-loading');
      loading = false;
      throw new Error(error);
    }
  }
}

export class UI {
  // Map through regions in fhd api and create a button for each one
  addMenuButtons = (data) => {
    let li;
    let regionList = data.map((state) => state.region);
    regionList = new Set(regionList);

    regionList.forEach((region) => {
      const li = document.createElement('li');
      li.textContent = region;
      selectMenu.appendChild(li);

      li.addEventListener('click', () => this.filterStates(li.textContent));
    });
  };

  showStates = (data) => {
    let showState = '';
    data.forEach((state) => {
      const { name, region, population, capital, flags } = state;
      showState += `
          <article class="state" data-name="${name.official}">
              <div class='state-flag'>
                <img src=${flags.svg} alt="">             
               </div>
               <div class="state-information">
               <h1 class="state-name"> ${name.official} </h1>
               <div class="state-data">
               <p> Population:
               <span> ${population.toLocaleString('en-US')}</span>
              
                 <p> Region: 
               <span >${region}</span>  </p>
               <p> Capital:
               <span > ${capital}</span>
                </p>
               </div>
               
               </div>
          </article>
  
      `;
    });
    statesList.innerHTML = showState;
  };

  runSearchStates = () => {
    searchInput.addEventListener('input', () =>
      this.searchStates(searchInput.value)
    );

    menuOptionsBtn.addEventListener('click', () => {
      options.classList.toggle('show');
    });

    document.addEventListener('submit', (e) => e.preventDefault());

    document.addEventListener('click', (e) => {
      if (e.target !== menuOptionsBtn && options.classList.contains('show')) {
        options.classList.remove('show');
      }

      if (e.target === moon) {
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
      }

      this.getStatesDOM();
    });
  };

  searchStates = (searchText) => {
    let foundStates = allStates.filter((state) => {
      const { name, capital } = state;
      const regex = new RegExp(`^${searchText}`, 'gi');
      return name.official.match(regex) || name.common.match(regex);
    });
    if (foundStates < 1) {
      statesList.innerHTML = 'No States match your search result';
    }
    this.showStates(foundStates);
  };

  filterStates = (filterValue) => {
    if (filterValue == 'Filter by Region') {
      return;
    }
    let filteredStates = allStates.filter(
      (state) => state.region === filterValue
    );
    this.showStates(filteredStates);
  };

  // Get all state elements in the dom
  getStatesDOM = () => {
    statesDOM = document.querySelectorAll('.state');
    statesDOM.forEach((state) => {
      state.addEventListener('click', () => {
        let stateName = state.getAttribute('data-name');
        this.getSingleState(stateName);
      });
    });
  };

  getSingleState = (stateName) => {
    let states = JSON.parse(localStorage.getItem('states'));
    let singleState = [
      ...states.filter(
        (state) =>
          state.name.official === stateName || state.name.common === stateName
      ),
    ];
    console.log(singleState);
    Storage.getState(singleState);
  };
}

class Storage {
  static saveStates(states) {
    localStorage.setItem('states', JSON.stringify(states));
  }

  static getState(stateObj) {
    console.log(stateObj);
    let states = JSON.parse(localStorage.getItem('states'));
    let singleState = states.find(
      (state) => state.name.official === stateObj[0].name.official
    );
    this.setState(singleState);
  }

  static setState(state) {
    localStorage.setItem('state', JSON.stringify(state));
    window.location.pathname = './CountryDetail/details.html';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const states = new States();
  const ui = new UI();
  states
    .getStates()
    .then((states) => {
      loading = false;
      showLoading.classList.remove('show-loading');
      allStates = states;
      ui.showStates(allStates);
      ui.addMenuButtons(allStates);
      Storage.saveStates(allStates);
    })
    .then(() => {
      ui.runSearchStates();
      ui.getStatesDOM();
    });
});
