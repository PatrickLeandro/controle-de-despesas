const transactionsUl = document.querySelector('#transactions')

const dummyTransactions = [
    { id: 1, name: 'Bolo de Brigadeiro', amount: -20 },
    { id: 2, name: 'Sálario', amount: 300 },
    { id: 3, name: 'Torta de frango', amount: -10 },
    { id: 4, name: 'Violão', amount: -150 },
    { id: 5, name: 'fg', amount: 150 },
    { id: 6, name: 'fsduiog', amount: 150 },
]

const addTransactionIntoDOM = transaction => {
    const operador = transaction.amount < 0 ? '-' : '+'
    const cssClass = transaction.amount < 0 ? 'minus': 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')

    li.classList.add(cssClass)
    li.innerHTML = `
        ${transaction.name} <span>${operador} R$ ${amountWithoutOperator}</span><button class="delete-btn">x</button>
    `
    transactionsUl.append(li)
   
}

const updateBalanceValues = () => {
    const transactionsAmounts = dummyTransactions.map(transaction => transaction.amount);
    const total = transactionsAmounts.reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2);
    console.log(total)
}

const init = () => {
    dummyTransactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init()