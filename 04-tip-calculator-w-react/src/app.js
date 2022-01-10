import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  // const [tip, setTip] = useState(0);
  const [tipAmount, setTipAmount] = useState('0.00');
  const [total, setTotal] = useState('0.00');
  const [bill, setBill] = useState(0);
  const [noOfPeople, setNoOfPeople] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(0.05);

  const calculate = () => {
    if (bill && noOfPeople && tipPercentage) {
      const billPerPerson = +(bill / noOfPeople);
      const tip = +(tipPercentage * billPerPerson);
      const total = +(tip + billPerPerson);
      setTipAmount(parseFloat(tip.toFixed(2)));
      setTotal(parseFloat(total.toFixed(2)));

      console.log(billPerPerson, tip, total);
    } else {
      return;
    }
  };

  useEffect(() => {
    calculate();
    return () => {
      console.log('cleanup');
    };
  }, [bill, noOfPeople, tipPercentage]);
  return (
    <div>
      <h2 className='title'>
        SPLI <br /> TTER{' '}
      </h2>
      <section className='wrapper'>
        <div className='container'>
          <div className='card'>
            <div className='column'>
              <h3>Bill</h3>
              <input
                type='text'
                placeholder='0'
                id='bill-input'
                onChange={(e) => setBill(e.target.value)}
              />
              <i className='fas fa-dollar-sign'></i>
            </div>
            <div
              className='column'
              id='tipContainer'
              onClick={(e) => {
                setTipPercentage(e.target.value / 100);
              }}
            >
              <h3>Select Tip %</h3>
              <button className='btn btn-dark' value={5}>
                5%
              </button>
              <button className='btn btn-dark' value={10}>
                10%
              </button>
              <button className='btn btn-dark' value={15}>
                15%
              </button>
              <button className='btn btn-dark' value={25}>
                25%
              </button>
              <button className='btn btn-dark' value={50}>
                50%
              </button>
              <button className='btn btn-light custom'>Custom</button>
            </div>
            <div className='column'>
              <h3>Number of People</h3>
              <input
                type='text'
                placeholder='0'
                id='people-input'
                onChange={(e) => setNoOfPeople(e.target.value)}
              />
              <i className='fas fa-user'></i>
            </div>
          </div>
          <div className='card card-dark'>
            <div className='card-columns'>
              <div className='card-column'>
                <span className='card-column-span'>
                  <h3>Tip Amount</h3>
                  <p>/ person</p>
                </span>
                <p className='card-column-text'>
                  $<span id='tip-amount'>{tipAmount}</span>
                </p>
              </div>
              <div className='card-column'>
                <span className='card-column-span'>
                  <h3>Total</h3>
                  <p>/ person</p>
                </span>
                <p className='card-column-text'>
                  $<span id='total-per-person'>{total}</span>
                </p>
              </div>
            </div>

            <button className='btn-reset'>Reset</button>
          </div>
        </div>
      </section>

      <script src='./script.js'></script>
    </div>
  );
};

export default App;
