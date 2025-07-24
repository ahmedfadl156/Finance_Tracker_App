// Selecting DOM Elements
const totalBalanceEl = document.querySelector('#total-balance-card .balance'); 
const totalIncomeEl = document.querySelector('#total-income-card .balance');   
const totalExpensesEl = document.querySelector('#total-expenses-card .balance'); 

const transactionForm = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');

const incomesListEl = document.getElementById('incomes-list'); 
const expensesListEl = document.getElementById('expenses-list'); 
const chartCanvas = document.getElementById('myBudgetChart'); 

const transactionButtonsContainer = document.querySelector('.transactions-header-btns');

let transactions = [];
let myChart;

function initChart() {
    if (!chartCanvas) {
        console.error('Chart canvas element not found');
        return;
    }
    
    const ctx = chartCanvas.getContext('2d'); 
    
    myChart = new Chart(ctx, {
        type: 'bar', 
        data: {
            labels: ['Income', 'Expenses'],
            datasets: [{
                label: 'Amount ($)',
                data: [0, 0],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)', 
                    'rgba(255, 99, 132, 0.6)' 
                ],
                borderColor: [ 
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, 
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Amount ($)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false 
                },
                title: {
                    display: true,
                    text: 'Income vs Expenses' 
                }
            }
        }
    });
}

function updateChart() {
    if (!myChart) {
        return;
    }
    
    const totalIncomeAmount = transactions.filter(transc => transc.type === 'income')
        .reduce((acc, transc) => acc + transc.amount, 0);
    const totalExpenseAmount = transactions.filter(transc => transc.type === 'expense')
        .reduce((acc, transc) => acc + transc.amount, 0);

    myChart.data.datasets[0].data = [totalIncomeAmount, totalExpenseAmount];
    myChart.update(); 
}

// Local Storage Functions
function loadTransactions() {
    const storedTransactions = localStorage.getItem('budgetPlannerTransactions'); 
    if (storedTransactions) {
        transactions = JSON.parse(storedTransactions); 
    } else {
        transactions = [];
    }
    updateSummary();
    displayTransactions();
    updateChart();
}

function saveTransactions() {
    localStorage.setItem('budgetPlannerTransactions', JSON.stringify(transactions));
}

// Function To Add Transactions
function addTransaction(description, amount, type) {
    const newTransaction = {
        id: Date.now().toString(), 
        description: description,  
        amount: amount,
        type: type,
        date: new Date().toLocaleDateString() 
    };
    transactions.push(newTransaction);
    saveTransactions();   
    updateSummary();       
    displayTransactions(); 
}

// Function To display transactions
function displayTransactions() {
    incomesListEl.innerHTML = '';
    expensesListEl.innerHTML = '';

    transactions.forEach(transc => {
        const displayAmount = transc.type === 'expense' ? `-$${Math.abs(transc.amount).toFixed(2)}` : `$${transc.amount.toFixed(2)}`;
        const amountClass = transc.type === 'expense' ? 'text-red-600' : 'text-green-600'; 

        const transactionHTML = `
            <li class="added-transc flex justify-between items-center bg-white shadow rounded-lg px-6 py-4 mb-3 transition-all duration-200 ease-in-out hover:shadow-lg" data-id="${transc.id}">
                <div class="tran-info flex flex-col gap-1">
                    <p class="transc-desc font-bold text-lg">${transc.description}</p>
                    <span class="transc-cash font-serif text-2xl ${amountClass}">${displayAmount}</span>
                </div>
                <i class="fa-solid fa-trash-can text-xl text-gray-400 hover:text-red-600 cursor-pointer transition-colors" data-id="${transc.id}"></i>
            </li>
        `;

        if (transc.type === 'income') {
            incomesListEl.insertAdjacentHTML('afterbegin', transactionHTML); 
        } else {
            expensesListEl.insertAdjacentHTML('afterbegin', transactionHTML); 
        }
    });
}

// Function To Update Summary
function updateSummary() {
    const totalIncomeAmount = transactions.filter(transc => transc.type === 'income')
        .reduce((acc, transc) => acc + transc.amount, 0);

    const totalExpenseAmount = transactions.filter(transc => transc.type === 'expense')
        .reduce((acc, transc) => acc + transc.amount, 0);

    const balance = totalIncomeAmount - totalExpenseAmount;

    // Update DOM elements
    totalBalanceEl.textContent = `$${balance.toFixed(2)}`;
    totalIncomeEl.textContent = `$${totalIncomeAmount.toFixed(2)}`;
    totalExpensesEl.textContent = `$${totalExpenseAmount.toFixed(2)}`;

    if (balance < 0) {
        totalBalanceEl.classList.remove('text-green-600');
        totalBalanceEl.classList.add('text-red-600');
    } else {
        totalBalanceEl.classList.remove('text-red-600');
        totalBalanceEl.classList.add('text-green-600');
    }
    if (balance === 0) {
        totalBalanceEl.classList.remove('text-green-600', 'text-red-600');
        totalBalanceEl.classList.add('text-gray-900'); 
    }
    
    updateChart();
}

function deleteTransaction(id) {
    transactions = transactions.filter(transc => transc.id !== id);
    saveTransactions();    
    updateSummary();      
    displayTransactions();
}

// Event Listeners
transactionButtonsContainer.addEventListener('click', e => {
    const clickedButton = e.target.closest('button');
    if (!clickedButton) return;

    transactionButtonsContainer.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('active', 'border-blue-500');
        btn.classList.add('text-gray-500');
    });

    clickedButton.classList.add('active', 'border-blue-500');
    clickedButton.classList.remove('text-gray-500');

    if (clickedButton.classList.contains('income-btn')) {
        incomesListEl.classList.remove('hidden');
        expensesListEl.classList.add('hidden');
    } else if (clickedButton.classList.contains('expenses-btn')) {
        incomesListEl.classList.add('hidden');
        expensesListEl.classList.remove('hidden');
    }
});

// Handle form submission
transactionForm.addEventListener('submit', e => {
    e.preventDefault(); 

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;

    if (!description || isNaN(amount) || amount <= 0 || type === 'select') {
        alert('Please enter a valid description, a positive amount, and select a type.'); 
        console.error('Validation failed: Missing description, invalid amount, or unselected type.');
        return; 
    }

    addTransaction(description, amount, type);

    descriptionInput.value = '';
    amountInput.value = '';
    typeSelect.value = 'select'; 
});

document.getElementById('transaction-history').addEventListener('click', e => {
    const trashIcon = e.target.closest('.fa-trash-can'); 
    if (trashIcon && trashIcon.dataset.id) { 
        const transactionId = trashIcon.dataset.id;
        deleteTransaction(transactionId); 
    }
});

window.addEventListener('DOMContentLoaded', () => {
    initChart();
    
    loadTransactions();
    
    setTimeout(() => {
        if (myChart && transactions.length > 0) {
            updateChart();
        }
    }, 200);
});
