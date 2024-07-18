import React from 'react';

function PaymentConfirmation({ adjustedPayments, onPaymentComplete }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Confirm Your Payment</h2>
      <ul className="mb-4">
        {Object.entries(adjustedPayments).map(([email, amount], index) => (
          <li key={index} className="mb-2">
            {email}: ${amount.toFixed(2)}
          </li>
        ))}
      </ul>
      <button
        onClick={onPaymentComplete}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
      >
        Pay
      </button>
    </div>
  );
}

export default PaymentConfirmation;