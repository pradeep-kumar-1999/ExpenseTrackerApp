const balance = document.getElementById("balance")
const money_plus = document.getElementById("balance-add")
const money_minus = document.getElementById("balance-minus")
const type = document.getElementById("new-transaction-type")
const amount = document.getElementById("new-transaction-amount")
const form = document.getElementById("form")
const list = document.getElementById("list")


const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
);

let transactions =
    localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
    e.preventDefault();

    if (type.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a type and amount');
    } else {
        const transaction = {
            id: generateID(),
            type: type.value,
            amount: +amount.value
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        type.value = '';
        amount.value = '';
    }
}

//Generate random ID

function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? '-Rs.' : '+Rs.';

    const item = document.createElement('li');

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
      ${transaction.type} <span>${sign}${Math.abs(
      transaction.amount
    )}</span> <button class="delete-btn" onclick="removeTransaction(${
      transaction.id
    })">x</button>
    `;

    list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (amounts
            .filter(item => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1)
        .toFixed(2);

    balance.innerText = `Rs.${total}`;
    money_plus.innerText = `Rs.${income}`;
    money_minus.innerText = `Rs.${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    init();
}

// Update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener('submit', addTransaction);




// let user = document.cookie = "username= pradeep"
// console.log(user)
// let x = document.cookie
// console.log(x)

// function getCookie(cname) {
//     let name = cname + "=";
//     let decodedCookie = decodeURIComponent(document.cookie);
//     let ca = decodedCookie.split(';');
//     for (let i = 0; i < ca.length; i++) {
//         let c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// }
// let g = getCookie("username")
// console.log(g)