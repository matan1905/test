import React from 'react';

function PaymentConfirmation({ adjustedPayments, onPaymentComplete }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Confirm Your Payment</h2>
      <div className="mb-4">
        {Object.entries(adjustedPayments).slice(0, 1).map(([email, amount]) => (
          <p key={email} className="text-lg">
            {email}: ${amount.toFixed(2)}
          </p>
        ))}
      </div>
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
