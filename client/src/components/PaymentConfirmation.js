import React, { useState, useEffect } from 'react';

function PaymentConfirmation({ adjustedPayments, onPaymentComplete, onBack }) {
  const [paymentStatuses, setPaymentStatuses] = useState({});

  useEffect(() => {
    // Initialize payment statuses
    const initialStatuses = {};
    Object.keys(adjustedPayments).forEach(username => {
      initialStatuses[username] = adjustedPayments[username] === 0 ? 'Paid' : 'Waiting for payment';
    });
    setPaymentStatuses(initialStatuses);
  }, [adjustedPayments]);

  const handlePay = (username) => {
    setPaymentStatuses(prevStatuses => ({
      ...prevStatuses,
      [username]: 'Paid'
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Confirm Your Payment</h2>
      <div className="space-y-4">
        {Object.entries(adjustedPayments).map(([username, amount]) => (
          <div key={username} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
            <p className="text-lg font-medium">{username}</p>
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold">${amount.toFixed(2)}</span>
              {paymentStatuses[username] === 'Paid' ? (
                <span className="text-green-500 font-medium">Paid</span>
              ) : (
                <button
                  onClick={() => handlePay(username)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  disabled={amount === 0}
                >
                  Pay
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default PaymentConfirmation;