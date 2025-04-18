from flask import Flask, render_template, request, jsonify
import json
from datetime import datetime, timedelta

app = Flask(__name__)

# Sample data storage (in a real app, use a database)
user_data = {
    "net_worth": 245876.90,
    "assets": {
        "stocks": 45,
        "bonds": 20,
        "real_estate": 25,
        "cash": 10
    },
    "transactions": [
        {"name": "Amazon Purchase", "date": "Today, 3:45 PM", "amount": -89.99, "type": "shopping"},
        {"name": "Salary Deposit", "date": "Jun 1, 9:00 AM", "amount": 8750.00, "type": "income"},
        {"name": "Mortgage Payment", "date": "May 30, 12:00 PM", "amount": -2350.00, "type": "housing"},
        {"name": "Dinner Out", "date": "May 28, 8:30 PM", "amount": -65.40, "type": "food"}
    ],
    "portfolio": {
        "value": 112456.78,
        "change": 2345.67,
        "change_percent": 2.13,
        "allocation": {
            "tech": 45,
            "healthcare": 15,
            "finance": 12,
            "consumer": 10,
            "energy": 8,
            "other": 10
        }
    },
    "watchlist": [
        {"symbol": "AAPL", "price": 175.43, "change": 2.34, "change_percent": 1.35, "volume": "45.6M"},
        {"symbol": "MSFT", "price": 328.39, "change": 1.87, "change_percent": 0.57, "volume": "23.1M"},
        {"symbol": "GOOGL", "price": 123.45, "change": -0.67, "change_percent": -0.54, "volume": "18.9M"},
        {"symbol": "AMZN", "price": 125.67, "change": 3.21, "change_percent": 2.62, "volume": "32.4M"},
        {"symbol": "TSLA", "price": 256.78, "change": -5.43, "change_percent": -2.07, "volume": "78.3M"}
    ],
    "trips": [
        {
            "name": "Summer Europe Vacation",
            "start_date": "2023-06-15",
            "end_date": "2023-07-05",
            "budget": 5000,
            "spent": 3250,
            "members": 4
        },
        {
            "name": "Weekend Ski Trip",
            "start_date": "2023-01-20",
            "end_date": "2023-01-22",
            "budget": 1200,
            "spent": 1200,
            "members": 6
        }
    ]
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/net-worth', methods=['GET'])
def get_net_worth():
    # In a real app, calculate this from actual data
    return jsonify({
        "current": user_data["net_worth"],
        "history": [
            {"month": "Jan", "value": 200000},
            {"month": "Feb", "value": 210000},
            {"month": "Mar", "value": 215000},
            {"month": "Apr", "value": 225000},
            {"month": "May", "value": 230000},
            {"month": "Jun", "value": 245876.90}
        ]
    })

@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    return jsonify(user_data["transactions"])

@app.route('/api/portfolio', methods=['GET'])
def get_portfolio():
    return jsonify(user_data["portfolio"])

@app.route('/api/watchlist', methods=['GET'])
def get_watchlist():
    return jsonify(user_data["watchlist"])

@app.route('/api/stock/<symbol>', methods=['GET'])
def get_stock(symbol):
    # In a real app, fetch this from a financial API
    sample_data = {
        "AAPL": {
            "name": "Apple Inc.",
            "price": 175.43,
            "change": 2.34,
            "change_percent": 1.35,
            "market_cap": "2.75T",
            "pe_ratio": 28.76,
            "dividend_yield": 0.55,
            "week52_high": 198.23,
            "week52_low": 124.17,
            "beta": 1.28,
            "eps": 6.10,
            "revenue": "394.33B",
            "description": "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
            "chart_data": {
                "labels": ["9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00"],
                "prices": [172.50, 173.20, 173.80, 174.50, 174.20, 174.80, 175.20, 175.50, 175.30, 175.60, 175.40, 175.30, 175.45, 175.43]
            }
        }
    }
    
    if symbol in sample_data:
        return jsonify(sample_data[symbol])
    else:
        return jsonify({"error": "Stock not found"}), 404

@app.route('/api/trips', methods=['GET', 'POST'])
def handle_trips():
    if request.method == 'POST':
        data = request.json
        new_trip = {
            "name": data.get("name"),
            "start_date": data.get("start_date"),
            "end_date": data.get("end_date"),
            "budget": data.get("budget"),
            "spent": 0,
            "members": data.get("members", [])
        }
        user_data["trips"].append(new_trip)
        return jsonify({"success": True, "trip": new_trip})
    else:
        return jsonify(user_data["trips"])

@app.route('/api/calculate/taxes', methods=['POST'])
def calculate_taxes():
    data = request.json
    gross_salary = float(data.get("gross_salary", 0))
    state = data.get("state", "CA")
    filing_status = data.get("filing_status", "single")
    
    # Simplified tax calculation
    federal_tax = gross_salary * 0.22  # Approximate average
    state_tax = gross_salary * 0.06    # Approximate average
    social_security = gross_salary * 0.062
    medicare = gross_salary * 0.0145
    
    total_taxes = federal_tax + state_tax + social_security + medicare
    net_income = gross_salary - total_taxes
    
    return jsonify({
        "federal_tax": federal_tax,
        "state_tax": state_tax,
        "social_security": social_security,
        "medicare": medicare,
        "total_taxes": total_taxes,
        "net_income": net_income,
        "monthly_income": net_income / 12
    })

@app.route('/api/calculate/emi', methods=['POST'])
def calculate_emi():
    data = request.json
    loan_amount = float(data.get("loan_amount", 0))
    interest_rate = float(data.get("interest_rate", 0))
    loan_term = int(data.get("loan_term", 0))
    
    monthly_rate = interest_rate / 100 / 12
    num_payments = loan_term * 12
    
    # EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
    emi = loan_amount * monthly_rate * (1 + monthly_rate)**num_payments / ((1 + monthly_rate)**num_payments - 1)
    total_interest = (emi * num_payments) - loan_amount
    
    return jsonify({
        "emi": emi,
        "total_interest": total_interest,
        "total_payment": emi * num_payments,
        "principal": loan_amount
    })

if __name__ == '__main__':
    app.run(debug=True)