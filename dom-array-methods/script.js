const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];



getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api')
  const data = await res.json()
  const user = data.results[0]


  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }
  addData(newUser)
}



function addData(obj) {
  data.push(obj)
  updateDOM()

}



function updateDOM(providedData = data) {
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'

  providedData.forEach(item => {
    const element = document.createElement('div')
    element.classList.add('person')
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
    main.appendChild(element)
  })
}



function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}




addUserBtn.addEventListener('click', getRandomUser)

doubleBtn.addEventListener('click', () => {
  data = data.map(item => {
    return { ...item, money: item.money * 2 }
  })
  updateDOM()
})



sortBtn.addEventListener('click', () => {
  data = data.sort((a, b) => b.money - a.money)
  updateDOM()
})


showMillionairesBtn.addEventListener('click', () => {
  data = data.filter(user => user.money > 1000000);

  updateDOM();
})



calculateWealthBtn.addEventListener('click', () => {
  const allWealth = data.reduce((all, current) => all += current.money, 0)
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    allWealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
})
