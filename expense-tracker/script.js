const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');




const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let dummyTransactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];



// console.log(dummyTransactions)



function addTransactionDom(transaction) {
  const li = document.createElement('li')
  li.classList.add(`${transaction.amount > 0 ? 'plus' : 'minus'}`)
  li.innerHTML = `
  ${transaction.text} <span>${transaction.amount}</span> <button class="delete-btn" onclick='removeElement(${transaction.id})'>x</button>
  `

  list.appendChild(li)
}

function init() {
  list.innerHTML = ''
  dummyTransactions.forEach(transaction => {
    addTransactionDom(transaction)
  })
}


function removeElement(id) {
  dummyTransactions = dummyTransactions.filter(item => item.id != id)
  localStorage.setItem('transactions', JSON.stringify(dummyTransactions))

  console.log(dummyTransactions)
  init()
}

function updateValues() {
  const amount = dummyTransactions.map(item => item.amount)
  const total = amount.reduce((acc, item) => acc += item, 0)
  const income = amount
    .filter(item => item > 0)
    .reduce((acc, item) => acc += item, 0)

  const outcome = amount
    .filter(item => item < 0)
    .reduce((acc, item) => acc += item, 0)

  balance.innerHTML = `${total}`
  money_plus.innerHTML = `${income}`
  money_minus.innerHTML = `${outcome}`

}
updateValues()


init()

function addTransaction(e) {
  e.preventDefault()
  if (text.value.trim() === "" || text.value.trim() === "") {
    alert('fill the blanks')
  }
  else {
    const transactionObject = {
      id: generateId(),
      text: text.value,
      amount: amount.value
    }

    dummyTransactions.push(transactionObject)
    localStorage.setItem('transactions', JSON.stringify(dummyTransactions))

    init()
    text.value = ''
    amount.value = ''
  }
}

function generateId() {
  return Math.floor(Math.random() * 10000)
}

form.addEventListener('submit', addTransaction)


// const localStorageTransactions = JSON.parse(
//   localStorage.getItem('transactions')
// );

// let transactions =
//   localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// // Add transaction
// function addTransaction(e) {
//   e.preventDefault();

//   if (text.value.trim() === '' || amount.value.trim() === '') {
//     alert('Please add a text and amount');
//   } else {
//     const transaction = {
//       id: generateID(),
//       text: text.value,
//       amount: +amount.value
//     };

//     transactions.push(transaction);

//     addTransactionDOM(transaction);

//     updateValues();

//     updateLocalStorage();

//     text.value = '';
//     amount.value = '';
//   }
// }

// // Generate random ID
// function generateID() {
//   return Math.floor(Math.random() * 100000000);
// }

// // Add transactions to DOM list
// function addTransactionDOM(transaction) {
//   // Get sign
//   const sign = transaction.amount < 0 ? '-' : '+';

//   const item = document.createElement('li');

//   // Add class based on value
//   item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

// item.innerHTML = `
//   ${transaction.text} <span>${sign}${Math.abs(
//   transaction.amount
// )}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id
//   })">x</button>
//   `;

//   list.appendChild(item);
// }

// // Update the balance, income and expense
// function updateValues() {
//   const amounts = transactions.map(transaction => transaction.amount);

//   const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

//   const income = amounts
//     .filter(item => item > 0)
//     .reduce((acc, item) => (acc += item), 0)
//     .toFixed(2);

//   const expense = (
//     amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
//     -1
//   ).toFixed(2);

//   balance.innerText = `$${total}`;
//   money_plus.innerText = `$${income}`;
//   money_minus.innerText = `$${expense}`;
// }

// // Remove transaction by ID
// function removeTransaction(id) {
//   transactions = transactions.filter(transaction => transaction.id !== id);

//   updateLocalStorage();

//   init();
// }

// // Update local storage transactions
// function updateLocalStorage() {
//   localStorage.setItem('transactions', JSON.stringify(transactions));
// }

// // Init app
// function init() {
//   list.innerHTML = '';

//   transactions.forEach(addTransactionDOM);
//   updateValues();
// }

// init();

// form.addEventListener('submit', addTransaction);
