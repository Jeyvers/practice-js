const countriesContainer = document.getElementById('countries-container');
let allStates = '';
class States {
  async getStates() {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      allStates = data;
      console.log(data);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

class UI {
  showStates = (data) => {
    console.log(data);
    let showState = '';
    data.forEach((state) => {
      const { name, region, population, capital, flags } = state;
      showState += `
          <article className="state" data-id={id}>
              <div class='state-flag'>
                <img src=${flags.svg} alt="">             
               </div>
               <div className="state-information">
               <h1 class="state-name"> ${name.official} </h1>
               <div className="state-data">
               <span className="">Population: ${population.toLocaleString(
                 'en-US'
               )}</span>
               <span className="">Region: ${region}</span>
               <span className="">Capital: ${capital}</span>
               </div>
               
               </div>
          </article>
  
      `;
    });
    countriesContainer.innerHTML = showState;
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const states = new States();
  const ui = new UI();
  states.getStates().then((states) => {
    allStates = states;
    ui.showStates(allStates);
  });
});
