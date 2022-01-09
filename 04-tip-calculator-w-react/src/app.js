import React, { useState, useEffect } from 'react';

const App = () => {
  return (
    <body>
      <h2 class='title'>
        SPLI <br /> TTER{' '}
      </h2>
      <section class='wrapper'>
        <div class='container'>
          <div class='card'>
            <div class='column'>
              <h3>Bill</h3>
              <input type='text' placeholder='0' id='bill-input' />
              <i class='fas fa-dollar-sign'></i>
            </div>
            <div class='column'>
              <h3>Select Tip %</h3>
              <button class='btn btn-dark'>
                <span id='tip'>5</span>%
              </button>
              <button class='btn btn-dark'>
                <span id='tip'>10</span>%
              </button>
              <button class='btn btn-dark'>
                <span id='tip'>15</span>%
              </button>
              <button class='btn btn-dark'>
                <span id='tip'>25</span>%
              </button>
              <button class='btn btn-dark'>
                <span id='tip'>50</span>%
              </button>
              <button class='btn btn-light custom'>Custom</button>
            </div>
            <div class='column'>
              <h3>Number of People</h3>
              <input type='text' placeholder='0' id='people-input' />
              <i class='fas fa-user'></i>
            </div>
          </div>
          <div class='card card-dark'>
            <div class='card-columns'>
              <div class='card-column'>
                <span class='card-column-span'>
                  <h3>Tip Amount</h3>
                  <p>/ person</p>
                </span>
                <p class='card-column-text'>
                  $<span id='tip-amount'>0.00</span>
                </p>
              </div>
              <div class='card-column'>
                <span class='card-column-span'>
                  <h3>Total</h3>
                  <p>/ person</p>
                </span>
                <p class='card-column-text'>
                  $<span id='total-per-person'>0.00</span>
                </p>
              </div>
            </div>

            <button class='btn-reset'>Reset</button>
          </div>
        </div>
      </section>

      <script src='./script.js'></script>
    </body>
  );
};

export default App;
