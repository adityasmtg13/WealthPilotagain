document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts
    initDashboardCharts();
    initIncomeTaxCharts();
    initExpenseCharts();
    initEMICharts();
    initStockCharts();
    initTripCharts();
    
    // Navigation functionality
    setupNavigation();
    
    // Form submissions
    setupForms();
    
    // Other interactive elements
    setupInteractiveElements();
    
    // Add RGB animation to logo
    const logo = document.getElementById('wealthPilotLogo');
    logo.classList.add('rgb-border');
});

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all sections
            const sections = document.querySelectorAll('.content-section');
            sections.forEach(section => section.classList.remove('active'));
            
            // Show the selected section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });
}

function setupForms() {
    // Income Tax Form
    const incomeForm = document.getElementById('incomeForm');
    if (incomeForm) {
        incomeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateTaxes();
        });
    }
    
    // Expense Form
    const expenseForm = document.getElementById('expenseForm');
    if (expenseForm) {
        expenseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateBudget();
        });
    }
    
    // EMI Form
    const emiForm = document.getElementById('emiForm');
    if (emiForm) {
        emiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateEMI();
        });
    }
    
    // Extra Payment Calculator
    const calculateExtraBtn = document.getElementById('calculateExtra');
    if (calculateExtraBtn) {
        calculateExtraBtn.addEventListener('click', calculateEMIExtra);
    }
    
    // Trip Form
    const tripForm = document.getElementById('tripForm');
    if (tripForm) {
        tripForm.addEventListener('submit', function(e) {
            e.preventDefault();
            createTrip();
        });
    }
    
    // Add Member Button
    const addMemberBtn = document.getElementById('addMember');
    if (addMemberBtn) {
        addMemberBtn.addEventListener('click', addTripMember);
    }
}

function setupInteractiveElements() {
    // Tabs functionality
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabContentId = this.getAttribute('data-tab');
            const tabContainer = this.closest('.tabs-header').nextElementSibling;
            
            // Remove active class from all tabs
            this.closest('.tabs-header').querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all tab contents
            tabContainer.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Show the selected tab content
            tabContainer.querySelector(`#${tabContentId}`).classList.add('active');
        });
    });
    
    // Remove member buttons
    document.querySelectorAll('.btn-remove-member').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.member-item').remove();
        });
    });
    
    // Refresh buttons
    document.querySelectorAll('.refresh-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.add('rotate');
            setTimeout(() => {
                this.classList.remove('rotate');
            }, 1000);
            // Here you would typically refresh data
        });
    });
}

function initDashboardCharts() {
    // Net Worth Chart
    const netWorthCtx = document.getElementById('netWorthChart').getContext('2d');
    const netWorthChart = new Chart(netWorthCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Net Worth',
                data: [200000, 210000, 215000, 225000, 230000, 245000],
                borderColor: '#00ffaa',
                backgroundColor: 'rgba(0, 255, 170, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
    
    // Asset Allocation Chart
    const assetAllocationCtx = document.getElementById('assetAllocationChart').getContext('2d');
    const assetAllocationChart = new Chart(assetAllocationCtx, {
        type: 'doughnut',
        data: {
            labels: ['Stocks', 'Bonds', 'Real Estate', 'Cash'],
            datasets: [{
                data: [45, 20, 25, 10],
                backgroundColor: [
                    '#4e79a7',
                    '#f28e2b',
                    '#e15759',
                    '#76b7b2'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function initIncomeTaxCharts() {
    // Tax Breakdown Chart
    const taxBreakdownCtx = document.getElementById('taxBreakdownChart').getContext('2d');
    const taxBreakdownChart = new Chart(taxBreakdownCtx, {
        type: 'bar',
        data: {
            labels: ['Federal', 'State', 'Social Security', 'Medicare'],
            datasets: [{
                label: 'Tax Amount',
                data: [18000, 7200, 7440, 1740],
                backgroundColor: [
                    'rgba(0, 255, 170, 0.7)',
                    'rgba(255, 0, 170, 0.7)',
                    'rgba(0, 170, 255, 0.7)',
                    'rgba(170, 0, 255, 0.7)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function initExpenseCharts() {
    // Budget Chart
    const budgetCtx = document.getElementById('budgetChart').getContext('2d');
    const budgetChart = new Chart(budgetCtx, {
        type: 'doughnut',
        data: {
            labels: ['Housing', 'Utilities', 'Groceries', 'Transportation', 'Entertainment', 'Other', 'Savings'],
            datasets: [{
                data: [2350, 350, 600, 450, 300, 200, 1427],
                backgroundColor: [
                    '#4e79a7',
                    '#f28e2b',
                    '#59a14f',
                    '#e15759',
                    '#edc948',
                    '#76b7b2',
                    '#b07aa1'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function initEMICharts() {
    // EMI Breakdown Chart
    const emiBreakdownCtx = document.getElementById('emiBreakdownChart').getContext('2d');
    const emiBreakdownChart = new Chart(emiBreakdownCtx, {
        type: 'pie',
        data: {
            labels: ['Principal', 'Interest'],
            datasets: [{
                data: [250000, 154140],
                backgroundColor: [
                    'rgba(0, 255, 170, 0.7)',
                    'rgba(255, 0, 170, 0.7)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    
    // Loan Comparison Chart
    const loanComparisonCtx = document.getElementById('loanComparisonChart').getContext('2d');
    const loanComparisonChart = new Chart(loanComparisonCtx, {
        type: 'bar',
        data: {
            labels: ['15 years', '20 years', '30 years'],
            datasets: [
                {
                    label: 'Monthly Payment',
                    data: [1758.47, 1419.47, 1122.61],
                    backgroundColor: 'rgba(0, 255, 170, 0.7)',
                    borderWidth: 0
                },
                {
                    label: 'Total Interest',
                    data: [66524.60, 90672.80, 154140.60],
                    backgroundColor: 'rgba(255, 0, 170, 0.7)',
                    borderWidth: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function initStockCharts() {
    // Portfolio Allocation Chart
    const portfolioAllocationCtx = document.getElementById('portfolioAllocationChart').getContext('2d');
    const portfolioAllocationChart = new Chart(portfolioAllocationCtx, {
        type: 'doughnut',
        data: {
            labels: ['Tech', 'Healthcare', 'Finance', 'Consumer', 'Energy', 'Other'],
            datasets: [{
                data: [45, 15, 12, 10, 8, 10],
                backgroundColor: [
                    '#4e79a7',
                    '#59a14f',
                    '#f28e2b',
                    '#e15759',
                    '#edc948',
                    '#76b7b2'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    
    // Performance Chart
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    const performanceChart = new Chart(performanceCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Your Portfolio',
                    data: [100, 105, 102, 108, 110, 112],
                    borderColor: '#00ffaa',
                    backgroundColor: 'rgba(0, 255, 170, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'S&P 500',
                    data: [100, 103, 101, 104, 106, 107],
                    borderColor: '#ff00aa',
                    backgroundColor: 'rgba(255, 0, 170, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
    
    // Stock Detail Chart
    const stockDetailCtx = document.getElementById('stockDetailChart').getContext('2d');
    const stockDetailChart = new Chart(stockDetailCtx, {
        type: 'line',
        data: {
            labels: ['9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00'],
            datasets: [{
                label: 'AAPL',
                data: [172.50, 173.20, 173.80, 174.50, 174.20, 174.80, 175.20, 175.50, 175.30, 175.60, 175.40, 175.30, 175.45, 175.43],
                borderColor: '#00ffaa',
                backgroundColor: 'rgba(0, 255, 170, 0.1)',
                borderWidth: 2,
                tension: 0.1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toFixed(2);
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function initTripCharts() {
    // Trip Expenses Chart
    const tripExpensesCtx = document.getElementById('tripExpensesChart').getContext('2d');
    const tripExpensesChart = new Chart(tripExpensesCtx, {
        type: 'doughnut',
        data: {
            labels: ['Flights', 'Accommodation', 'Food', 'Transport', 'Activities', 'Shopping'],
            datasets: [{
                data: [1200, 800, 600, 300, 200, 150],
                backgroundColor: [
                    '#4e79a7',
                    '#f28e2b',
                    '#59a14f',
                    '#e15759',
                    '#edc948',
                    '#76b7b2'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function calculateTaxes() {
    // Get form values
    const grossSalary = parseFloat(document.getElementById('grossSalary').value) || 0;
    const state = document.getElementById('state').value;
    const filingStatus = document.getElementById('filingStatus').value;
    const payFrequency = document.getElementById('payFrequency').value;
    
    // Simple tax calculation (simplified for demo)
    let federalTax = 0;
    let stateTax = 0;
    
    if (grossSalary <= 9950) {
        federalTax = grossSalary * 0.10;
    } else if (grossSalary <= 40525) {
        federalTax = 995 + (grossSalary - 9950) * 0.12;
    } else if (grossSalary <= 86375) {
        federalTax = 4664 + (grossSalary - 40525) * 0.22;
    } else if (grossSalary <= 164925) {
        federalTax = 14751 + (grossSalary - 86375) * 0.24;
    } else if (grossSalary <= 209425) {
        federalTax = 33603 + (grossSalary - 164925) * 0.32;
    } else if (grossSalary <= 523600) {
        federalTax = 47843 + (grossSalary - 209425) * 0.35;
    } else {
        federalTax = 157804 + (grossSalary - 523600) * 0.37;
    }
    
    // State tax (simplified)
    switch(state) {
        case 'CA':
            stateTax = grossSalary * 0.06;
            break;
        case 'NY':
            stateTax = grossSalary * 0.065;
            break;
        case 'TX':
            stateTax = 0; // Texas has no state income tax
            break;
        case 'FL':
            stateTax = 0; // Florida has no state income tax
            break;
        default:
            stateTax = grossSalary * 0.05;
    }
    
    // Social Security and Medicare
    const socialSecurity = grossSalary * 0.062;
    const medicare = grossSalary * 0.0145;
    
    // Total taxes
    const totalTaxes = federalTax + stateTax + socialSecurity + medicare;
    const netAnnualIncome = grossSalary - totalTaxes;
    
    // Calculate monthly take-home
    let monthlyTakeHome = netAnnualIncome / 12;
    if (payFrequency === 'biweekly') {
        monthlyTakeHome = netAnnualIncome / 26 * 2;
    } else if (payFrequency === 'weekly') {
        monthlyTakeHome = netAnnualIncome / 52 * 4;
    }
    
    // Update the UI
    document.querySelector('.tax-summary-item:nth-child(1) .tax-value').textContent = '$' + grossSalary.toLocaleString('en-US', {maximumFractionDigits: 2});
    document.querySelector('.tax-summary-item:nth-child(2) .tax-value').textContent = '-$' + federalTax.toLocaleString('en-US', {maximumFractionDigits: 2});
    document.querySelector('.tax-summary-item:nth-child(3) .tax-value').textContent = '-$' + stateTax.toLocaleString('en-US', {maximumFractionDigits: 2});
    document.querySelector('.tax-summary-item:nth-child(4) .tax-value').textContent = '-$' + socialSecurity.toLocaleString('en-US', {maximumFractionDigits: 2});
    document.querySelector('.tax-summary-item:nth-child(5) .tax-value').textContent = '-$' + medicare.toLocaleString('en-US', {maximumFractionDigits: 2});
    document.querySelector('.tax-summary-item.total .tax-value').textContent = '$' + netAnnualIncome.toLocaleString('en-US', {maximumFractionDigits: 2});
    document.querySelector('.tax-summary-item.monthly .tax-value').textContent = '$' + monthlyTakeHome.toLocaleString('en-US', {maximumFractionDigits: 2});
    
    // Update the chart
    updateTaxBreakdownChart(federalTax, stateTax, socialSecurity, medicare);
}

function updateTaxBreakdownChart(federal, state, socialSecurity, medicare) {
    const taxBreakdownCtx = document.getElementById('taxBreakdownChart').getContext('2d');
    
    // Destroy the old chart if it exists
    if (window.taxBreakdownChart) {
        window.taxBreakdownChart.destroy();
    }
    
    // Create new chart
    window.taxBreakdownChart = new Chart(taxBreakdownCtx, {
        type: 'bar',
        data: {
            labels: ['Federal', 'State', 'Social Security', 'Medicare'],
            datasets: [{
                label: 'Tax Amount',
                data: [federal, state, socialSecurity, medicare],
                backgroundColor: [
                    'rgba(0, 255, 170, 0.7)',
                    'rgba(255, 0, 170, 0.7)',
                    'rgba(0, 170, 255, 0.7)',
                    'rgba(170, 0, 255, 0.7)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function calculateBudget() {
    // Get form values
    const monthlyIncome = parseFloat(document.getElementById('monthlyIncome').value) || 0;
    const savingsGoal = parseFloat(document.getElementById('savingsGoal').value) || 0;
    const rent = parseFloat(document.getElementById('rent').value) || 0;
    const utilities = parseFloat(document.getElementById('utilities').value) || 0;
    const groceries = parseFloat(document.getElementById('groceries').value) || 0;
    const transportation = parseFloat(document.getElementById('transportation').value) || 0;
    const entertainment = parseFloat(document.getElementById('entertainment').value) || 0;
    const other = parseFloat(document.getElementById('other').value) || 0;
    
    // Calculate savings amount
    const savingsAmount = monthlyIncome * (savingsGoal / 100);
    
    // Calculate total expenses
    const totalExpenses = rent + utilities + groceries + transportation + entertainment + other;
    
    // Calculate remaining balance
    const remainingBalance = monthlyIncome - totalExpenses - savingsAmount;
    
    // Update the UI
    document.querySelector('.budget-summary-item:nth-child(1) .budget-value').textContent = '$' + monthlyIncome.toLocaleString('en-US', {maximumFractionDigits: 2});
    document.querySelector('.budget-summary-item:nth-child(2) .budget-value').textContent = '-$' + totalExpenses.toLocaleString('en-US', {maximumFractionDigits: 2});
    document.querySelector('.budget-summary-item:nth-child(3) .budget-value').textContent = '$' + savingsAmount.toLocaleString('en-US', {maximumFractionDigits: 2});
    document.querySelector('.budget-summary-item.total .budget-value').textContent = '$' + remainingBalance.toLocaleString('en-US', {maximumFractionDigits: 2});
    
    // Update the chart
    updateBudgetChart(rent, utilities, groceries, transportation, entertainment, other, savingsAmount);
    
    // Generate recommendations
    generateBudgetRecommendations(monthlyIncome, rent, savingsAmount, remainingBalance);
}

function updateBudgetChart(rent, utilities, groceries, transportation, entertainment, other, savings) {
    const budgetCtx = document.getElementById('budgetChart').getContext('2d');
    
    // Destroy the old chart if it exists
    if (window.budgetChart) {
        window.budgetChart.destroy();
    }
    
    // Create new chart
    window.budgetChart = new Chart(budgetCtx, {
        type: 'doughnut',
        data: {
            labels: ['Housing', 'Utilities', 'Groceries', 'Transportation', 'Entertainment', 'Other', 'Savings'],
            datasets: [{
                data: [rent, utilities, groceries, transportation, entertainment, other, savings],
                backgroundColor: [
                    '#4e79a7',
                    '#f28e2b',
                    '#59a14f',
                    '#e15759',
                    '#edc948',
                    '#76b7b2',
                    '#b07aa1'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function generateBudgetRecommendations(income, rent, savings, remaining) {
    const recommendations = [];
    
    // Check housing cost
    const housingPercentage = (rent / income) * 100;
    if (housingPercentage > 30) {
        recommendations.push(`Your housing costs are ${housingPercentage.toFixed(1)}% of income (recommended: ≤30%).`);
    }
    
    // Check savings rate
    const savingsRate = (savings / income) * 100;
    if (savingsRate < 20) {
        recommendations.push(`Your savings rate is ${savingsRate.toFixed(1)}% (recommended: ≥20%).`);
    } else {
        recommendations.push(`You're meeting your savings goal! Consider increasing to ${(savingsRate + 5).toFixed(1)}%.`);
    }
    
    // Check remaining balance
    if (remaining > 0) {
        const investPercentage = Math.min(50, (remaining / income) * 100);
        recommendations.push(`You have $${remaining.toFixed(2)} remaining - consider investing ${investPercentage.toFixed(1)}% of this.`);
    } else if (remaining < 0) {
        recommendations.push(`You're overspending by $${Math.abs(remaining).toFixed(2)}. Look for areas to cut back.`);
    }
    
    // Update the recommendations list
    const recommendationsList = document.querySelector('.budget-recommendations ul');
    recommendationsList.innerHTML = '';
    
    recommendations.forEach(rec => {
        const li = document.createElement('li');
        li.textContent = rec;
        recommendationsList.appendChild(li);
    });
}

function calculateEMI() {
    // Get form values
    const loanAmount = parseFloat(document.getElementById('loanAmount').value) || 0;
    const interestRate = parseFloat(document.getElementById('interestRate').value) || 0;
    const loanTerm = parseFloat(document.getElementById('loanTerm').value) || 0;
    const startDate = document.getElementById('startDate').value;
    
    // Calculate monthly interest rate
    const monthlyRate = interestRate / 100 / 12;
    
    // Calculate number of payments
    const numPayments = loanTerm * 12;
    
    // Calculate EMI
    const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    // Calculate total interest
    const totalInterest = (emi * numPayments) - loanAmount;
    
    // Calculate total payment
    const totalPayment = emi * numPayments;
    
    // Calculate payoff date
    const startDateObj = new Date(startDate);
    startDateObj.setMonth(startDateObj.getMonth() + numPayments);
    const payoffDate = startDateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    // Update the UI
    document.querySelector('.emi-summary-item:nth-child(1) .emi-value').textContent = '$' + emi.toLocaleString('en-US', {maximumFractionDigits: 2});
    document.querySelector('.emi-summary-item:nth-child(2) .emi-value').textContent = '$' + totalInterest.toLocaleString('en-US', {maximumFractionDigits: 2});
    document.querySelector('.emi-summary-item:nth-child(3) .emi-value').textContent = '$' + totalPayment.toLocaleString('en-US', {maximumFractionDigits: 2});
    document.querySelector('.emi-summary-item:nth-child(4) .emi-value').textContent = payoffDate;
    
    // Update the chart
    updateEMIBreakdownChart(loanAmount, totalInterest);
}

function calculateEMIExtra() {
    const extraPayment = parseFloat(document.getElementById('extraPayment').value) || 0;
    const emi = parseFloat(document.querySelector('.emi-summary-item:nth-child(1) .emi-value').textContent.replace(/[^0-9.-]+/g,"")) || 0;
    const loanAmount = parseFloat(document.getElementById('loanAmount').value) || 0;
    const interestRate = parseFloat(document.getElementById('interestRate').value) || 0;
    const loanTerm = parseFloat(document.getElementById('loanTerm').value) || 0;
    
    // Calculate monthly interest rate
    const monthlyRate = interestRate / 100 / 12;
    
    // Calculate new EMI with extra payment
    const newEmi = emi + extraPayment;
    
    // Calculate new payoff period
    let balance = loanAmount;
    let months = 0;
    let totalInterest = 0;
    
    while (balance > 0) {
        const interest = balance * monthlyRate;
        totalInterest += interest;
        const principal = newEmi - interest;
        balance -= principal;
        months++;
        
        if (months > 1000) break; // Safety net
    }
    
    const originalMonths = loanTerm * 12;
    const monthsSaved = originalMonths - months;
    const interestSaved = (emi * originalMonths - loanAmount) - totalInterest;
    
    // Update the results
    const resultsElement = document.querySelector('.extra-payment-results p');
    resultsElement.textContent = `Paying an extra $${extraPayment.toFixed(2)}/month would save you $${interestSaved.toFixed(2)} in interest and pay off your loan ${Math.floor(monthsSaved/12)} years and ${monthsSaved%12} months earlier.`;
}

function updateEMIBreakdownChart(principal, interest) {
    const emiBreakdownCtx = document.getElementById('emiBreakdownChart').getContext('2d');
    
    // Destroy the old chart if it exists
    if (window.emiBreakdownChart) {
        window.emiBreakdownChart.destroy();
    }
    
    // Create new chart
    window.emiBreakdownChart = new Chart(emiBreakdownCtx, {
        type: 'pie',
        data: {
            labels: ['Principal', 'Interest'],
            datasets: [{
                data: [principal, interest],
                backgroundColor: [
                    'rgba(0, 255, 170, 0.7)',
                    'rgba(255, 0, 170, 0.7)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function createTrip() {
    const tripName = document.getElementById('tripName').value;
    const startDate = document.getElementById('tripStartDate').value;
    const endDate = document.getElementById('tripEndDate').value;
    const budget = parseFloat(document.getElementById('tripBudget').value) || 0;
    
    // Validate inputs
    if (!tripName || !startDate || !endDate || budget <= 0) {
        alert('Please fill in all trip details and provide a valid budget.');
        return;
    }
    
    // Format dates
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const dateFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedStartDate = startDateObj.toLocaleDateString('en-US', dateFormatOptions);
    const formattedEndDate = endDateObj.toLocaleDateString('en-US', dateFormatOptions);
    
    // Calculate trip duration
    const durationMs = endDateObj - startDateObj;
    const durationDays = Math.ceil(durationMs / (1000 * 60 * 60 * 24));
    
    // Create trip card
    const tripItem = document.createElement('div');
    tripItem.className = 'trip-item';
    tripItem.innerHTML = `
        <div class="trip-header">
            <h4>${tripName}</h4>
            <div class="trip-dates">${formattedStartDate} - ${formattedEndDate}</div>
        </div>
        <div class="trip-progress">
            <div class="progress-bar">
                <div class="progress-fill" style="width: 0%"></div>
            </div>
            <div class="progress-labels">
                <span>$0 spent</span>
                <span>$${budget.toLocaleString('en-US', {maximumFractionDigits: 2})} budget</span>
            </div>
        </div>
        <div class="trip-members">
            <div class="members-count">
                <i class="fas fa-users"></i> ${document.querySelectorAll('.member-item').length} members
            </div>
            <div class="members-avatars">
                ${Array.from(document.querySelectorAll('.member-item')).map((item, index) => 
                    `<div class="member-avatar">${item.querySelector('.member-name').textContent.split(' ').map(n => n[0]).join('')}</div>`
                ).join('')}
            </div>
        </div>
    `;
    
    // Add to active trips
    document.querySelector('.trip-active-card .card-body').insertBefore(tripItem, document.querySelector('.trip-active-card .card-body').firstChild);
    
    // Reset form
    document.getElementById('tripForm').reset();
    document.querySelector('.trip-members-list').innerHTML = '';
    
    // Show success message
    alert(`Trip "${tripName}" created successfully for ${durationDays} days with a budget of $${budget.toLocaleString('en-US', {maximumFractionDigits: 2})}!`);
}

function addTripMember() {
    const name = document.getElementById('memberName').value;
    const email = document.getElementById('memberEmail').value;
    const phone = document.getElementById('memberPhone').value;
    
    // Validate inputs
    if (!name || !email || !phone) {
        alert('Please fill in all member details.');
        return;
    }
    
    // Create member item
    const memberItem = document.createElement('div');
    memberItem.className = 'member-item';
    memberItem.innerHTML = `
        <div class="member-info">
            <span class="member-name">${name}</span>
            <span class="member-email">${email}</span>
            <span class="member-phone">${phone}</span>
        </div>
        <button class="btn-remove-member"><i class="fas fa-times"></i></button>
    `;
    
    // Add to members list
    document.querySelector('.trip-members-list').appendChild(memberItem);
    
    // Reset inputs
    document.getElementById('memberName').value = '';
    document.getElementById('memberEmail').value = '';
    document.getElementById('memberPhone').value = '';
    
    // Add event listener to remove button
    memberItem.querySelector('.btn-remove-member').addEventListener('click', function() {
        this.closest('.member-item').remove();
    });
}

// Initialize calculations on page load
window.addEventListener('load', function() {
    calculateTaxes();
    calculateBudget();
    calculateEMI();
});
