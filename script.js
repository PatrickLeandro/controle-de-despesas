const transactionsUl = document.querySelector('#transactions');
const balanceDisplay = document.querySelector('#balance');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');




const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))

let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : []


const removeTransaction = ID => {
    transactions = transactions
    .filter(transaction => transaction.id !== ID)
    updateLocalStorage();
    init();
}

const addTransactionIntoDOM = transaction => {
    const operador = transaction.amount < 0 ? '-' : '+'
    const cssClass = transaction.amount < 0 ? 'minus': 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')

    li.classList.add(cssClass)
    li.innerHTML = `
        ${transaction.name} <span>${operador} R$ ${amountWithoutOperator}</span>
        <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
        x
        </button>
    `
    transactionsUl.append(li)
   
}


const updateBalanceValues = () => {
    const transactionsAmounts = transactions
        .map(transaction => transaction.amount);

        let entregasRealizadas = transactions.length;
            document.querySelector('#qtdEntregas').innerHTML = `${entregasRealizadas} Entregas realizadas: `;

    const total = transactionsAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
        .toFixed(2);

    const income = transactionsAmounts
        .filter(total => total > 0)
        .reduce((accumulator, total) => accumulator + total, 0)
        .toFixed(2);

    const expense = Math.abs( transactionsAmounts
        .filter(total => total < 0)
        .reduce((accumulator, total) => accumulator + total, 0)
        .toFixed(2));

    balanceDisplay.textContent = `R$ ${total}`;
    expenseDisplay.textContent = `R$ ${expense}`;
    incomeDisplay.textContent = `R$ ${income}`;
}

const init = () => {
    transactionsUl.innerHTML = ''
    transactions
        .forEach(addTransactionIntoDOM)
    
    updateBalanceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

const generateID = () => Math.round(Math.random() * 5000)

form.addEventListener('submit', event => {
    event.preventDefault();

    const transactionName = inputTransactionName.value.trim() ;
    const transactionAmount = inputTransactionAmount.value.trim() ;

    if (inputTransactionName.value.trim() === '' || inputTransactionAmount.value.trim() === '') {
        alert("Por favor preencha todos os campos corretamente")
        return
    }

    const transaction = { 
        id: generateID(),
        name: transactionName,
        amount: Number(transactionAmount) 
    }
    transactions.push(transaction);

    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
    
    init();
    updateLocalStorage();
});