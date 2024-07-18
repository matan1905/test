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
              {paymentStatus[username] === 'Paid' ? (
                <span className="text-green-500 font-medium">Paid</span>
              ) : (
                <button
                  onClick={() => handlePay(username)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Pay
                </button>
              )}
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
