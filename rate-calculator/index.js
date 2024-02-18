const currencyEl_one = document.getElementById('currency-one')
const amountEl_one = document.getElementById('amount-one')
const currencyEl_two = document.getElementById('currency-two')
const amountEl_two = document.getElementById('amount-two')


const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');


function calculate() {
    const currency_one_value = currencyEl_one.value
    const currency_two_value = currencyEl_two.value
    const amountEl_one_value = amountEl_one.value

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one_value}`)
        .then(res => res.json())
        .then(data => {
            const current = data.rates[currency_two_value]
            rateEl.innerText = `1 ${currency_one_value} = ${current} ${currency_two_value}`
            amountEl_two.value = (current * amountEl_one_value).toFixed(2)
        })
}

swap.addEventListener('click', ()=>{
    const data=currencyEl_one.value
    currencyEl_one.value=currencyEl_two.value
    currencyEl_two.value=data
    calculate()
})



currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

calculate()