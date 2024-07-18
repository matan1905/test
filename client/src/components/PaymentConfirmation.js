import React from 'react';

function PaymentConfirmation({ adjustedPayments, onPaymentComplete, onBack }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Confirm Your Payment</h2>
      <div className="mb-4">
        {Object.entries(adjustedPayments).map(([username, amount]) => (
          <div key={username} className="flex justify-between items-center mb-2">
            <p className="text-lg">{username}</p>
            <div>
              <span className="text-lg font-semibold">${amount.toFixed(2)}</span>
              <span className="ml-2 text-sm text-gray-500">Waiting for payment</span>
              <button className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-sm">Pay</button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
        >
          Back
        </button>
    </div>
      </div>
  );
}

export default PaymentConfirmation;
