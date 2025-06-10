const { useState, useEffect } = React;


function App() {
    
    const currency = '₹';

    const [budget, setBudget] = useState(200000); 
    const [expenses, setExpenses] = useState([
        { id: 1, name: 'Groceries', cost: 4000 },
        { id: 2, name: 'Rent', cost: 15000 },
        { id: 3, name: 'Shopping', cost: 5000 }
    ]);
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');

    const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);
    const remaining = budget - totalExpenses;

    const onSubmit = (event) => {
        event.preventDefault();
        if (name && cost > 0) {
            const newExpense = {
                id: Date.now(),
                name: name,
                cost: parseInt(cost)
            };
            setExpenses([...expenses, newExpense]);
            setName('');
            setCost('');
        } else {
            alert('Please enter a valid item and cost.');
        }
    };

    const deleteExpense = (id) => {
        const remainingExpenses = expenses.filter((expense) => expense.id !== id);
        setExpenses(remainingExpenses);
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">My Budget Planner</h1>
            
            {}
            <div className="row">
                <div className="col-md">
                    <div className="alert alert-secondary">
                        <span>Budget: {currency}{budget}</span>
                    </div>
                </div>
                <div className="col-md">
                    <div className="alert alert-success">
                        <span>Remaining: {currency}{remaining}</span>
                    </div>
                </div>
                <div className="col-md">
                    <div className="alert alert-primary">
                        <span>Spent so far: {currency}{totalExpenses}</span>
                    </div>
                </div>
            </div>

            {}
            <h3 className="mt-3">Expenses</h3>
            <ul className="list-group">
                {expenses.map((expense) => (
                    <li key={expense.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {expense.name}
                        <div>
                            <span className="badge bg-primary rounded-pill me-3">{currency}{expense.cost}</span>
                            <button className="btn-close" onClick={() => deleteExpense(expense.id)}></button>
                        </div>
                    </li>
                ))}
            </ul>

            {}
            <h3 className="mt-4">Add Expense</h3>
            <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-sm">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-sm">
                        <label htmlFor="cost">Cost</label>
                        <input
                            type="number"
                            className="form-control"
                            id="cost"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="mt-3">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    );
}
