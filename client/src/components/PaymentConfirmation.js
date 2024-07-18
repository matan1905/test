import React from 'react';

function PaymentConfirmation({ adjustedPayments, onPaymentComplete, onBack }) {
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
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
        >
          Back
        </button>
        <button
        onClick={onPaymentComplete}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
      >
        Pay
      </button>
    </div>
      </div>
  );
}

export default PaymentConfirmation;
