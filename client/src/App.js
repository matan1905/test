import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [amount, setAmount] = useState('');
  const [people, setPeople] = useState('');
  const [splitAmount, setSplitAmount] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL || ''}/api/split?amount=${amount}&people=${people}`);
      setSplitAmount(response.data.splitAmount);
    } catch (error) {
      console.error('Error calculating split:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Payment Split Demo</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Total Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="people" className="block text-sm font-medium text-gray-700">
              Number of People
            </label>
            <input
              type="number"
              id="people"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Calculate Split
          </button>
        </form>
        {splitAmount && (
          <div className="mt-6 text-center">
            <p className="text-lg font-semibold">Each person pays:</p>
            <p className="text-2xl font-bold text-green-600">${splitAmount}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
