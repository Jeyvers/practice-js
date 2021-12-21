const billInput = document.getElementById('bill-input');
const peopleInput = document.getElementById('people-input');
const tipButtons = document.querySelectorAll('.btn-dark');
const tipAmount = document.getElementById('tip-amount');
const totalPerPerson = document.getElementById('total-per-person');
const resetBtn = document.querySelector('.btn-reset');
const custom = document.querySelector('.custom');
let tipPercentage;
// if(peopleInput.value = '' || peopleInput.value < 1) {
//     peopleInput.classList.add('empty');
// }


function getTip(tipButton) {
    tipText = +(tipButton.children[0].textContent);
    tipPercentage = tipText / 100;
    
}


function peopleValue() {
    peopleInputValue = peopleInput.value;
    bill = getBill();
    if(bill > 0 && tipPercentage > 0) {

        generateTip();
    }
}

function getBill() {
    billInputValue = billInput.value;
    return billInputValue;
}

function generateTip() {
    const billPerPerson = +(billInputValue / peopleInputValue);
    console.log(billInputValue, peopleInputValue)
    const tip = +(tipPercentage * billPerPerson);
    const total = +(tip + billPerPerson);
        console.log(billPerPerson.toFixed(2), tip.toFixed(2), total.toFixed(2))
        tipAmount.innerHTML = tip.toFixed(2);
        totalPerPerson.innerHTML = total.toFixed(2);
}

// document.addEventListener('keydown', generateTip);
billInput.addEventListener('input', getBill);
peopleInput.addEventListener('input', peopleValue);
tipButtons.forEach(tipButton => {
    tipButton.addEventListener('click', () => getTip(tipButton));
});
// custom.addEventListener('click')
resetBtn.addEventListener('click', () => {
    billInput.value = '';
    peopleInput.value = '';
     tipPercentage = 0;
    peopleInputValue = 0;
    billInputValue = 0;
})
