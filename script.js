// =====================
// Expense Tracker App
// =====================

// Initialize expenses array from localStorage or start with empty array
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Get DOM elements
const expenseForm = document.getElementById('expenseForm');
const expenseNameInput = document.getElementById('expenseName');
const expenseAmountInput = document.getElementById('expenseAmount');
const expensesList = document.getElementById('expensesList');
const totalAmount = document.getElementById('totalAmount');

// =====================
// Event Listeners
// =====================

// Listen for form submission
expenseForm.addEventListener('submit', function(e) {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get the input values
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);

    // Validate inputs
    if (name === '' || amount <= 0) {
        alert('Please enter a valid expense name and amount');
        return;
    }

    // Add the new expense
    addExpense(name, amount);

    // Clear the form inputs
    expenseNameInput.value = '';
    expenseAmountInput.value = '';

    // Focus back on the name input for better UX
    expenseNameInput.focus();
});

// =====================
// Core Functions
// =====================

/**
 * Add a new expense to the list
 * @param {string} name - The name/description of the expense
 * @param {number} amount - The amount of the expense
 */
function addExpense(name, amount) {
    // Create a unique ID using timestamp
    const id = Date.now();

    // Create expense object
    const expense = {
        id: id,
        name: name,
        amount: amount
    };

    // Add to expenses array
    expenses.push(expense);

    // Save to localStorage
    saveToLocalStorage();

    // Update the display
    displayExpenses();
    updateTotal();
}

/**
 * Delete an expense by its ID
 * @param {number} id - The ID of the expense to delete
 */
function deleteExpense(id) {
    // Filter out the expense with the matching ID
    expenses = expenses.filter(expense => expense.id !== id);

    // Save to localStorage
    saveToLocalStorage();

    // Update the display
    displayExpenses();
    updateTotal();
}

/**
 * Display all expenses in the list
 */
function displayExpenses() {
    // Clear the current list
    expensesList.innerHTML = '';

    // Check if there are any expenses
    if (expenses.length === 0) {
        expensesList.innerHTML = '<p class="empty-message">No expenses yet. Add one to get started!</p>';
        return;
    }

    // Loop through each expense and create HTML elements
    expenses.forEach(function(expense) {
        // Create the expense item element
        const expenseItem = document.createElement('div');
        expenseItem.className = 'expense-item';

        // Create the info section (name and amount)
        const expenseInfo = document.createElement('div');
        expenseInfo.className = 'expense-info';

        // Create the name element
        const expenseName = document.createElement('div');
        expenseName.className = 'expense-name';
        expenseName.textContent = expense.name;

        // Create the amount element
        const expenseAmountElement = document.createElement('div');
        expenseAmountElement.className = 'expense-amount';
        expenseAmountElement.textContent = '$' + expense.amount.toFixed(2);

        // Append name and amount to info section
        expenseInfo.appendChild(expenseName);
        expenseInfo.appendChild(expenseAmountElement);

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.textContent = 'Delete';

        // Add click event to delete button
        deleteBtn.addEventListener('click', function() {
            // Call deleteExpense with the expense ID
            deleteExpense(expense.id);
        });

        // Append info and button to the item
        expenseItem.appendChild(expenseInfo);
        expenseItem.appendChild(deleteBtn);

        // Append the item to the list
        expensesList.appendChild(expenseItem);
    });
}

/**
 * Update and display the total expense amount
 */
function updateTotal() {
    // Calculate the sum of all expenses
    const total = expenses.reduce(function(sum, expense) {
        return sum + expense.amount;
    }, 0);

    // Update the total amount element
    totalAmount.textContent = '$' + total.toFixed(2);
}

/**
 * Save expenses to localStorage for persistence
 */
function saveToLocalStorage() {
    // Convert expenses array to JSON and save
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// =====================
// Initialize App
// =====================

// Display any existing expenses when page loads
displayExpenses();
updateTotal();
