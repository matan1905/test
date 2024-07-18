import React, { useState, useEffect } from 'react';

function PaymentConfirmation({ adjustedPayments, onPaymentComplete, onBack, socket }) {
    useEffect(() => {
        const allPaid = Object.values(adjustedPayments).every(amount => amount === 0);
        console.log(allPaid);
        if (allPaid) {
          socket.emit('allPaymentsMade');
          onPaymentComplete();
        }
    }, [adjustedPayments]);

  const handlePay = (name) => {
    socket.emit('updatePaymentStatus', { name, amount: adjustedPayments[name] });

  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Confirm Your Payment</h2>
      <div className="space-y-4">
        {Object.entries(adjustedPayments).map(([name, amount]) => (
          <div key={name} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
            <p className="text-lg font-medium">{name}</p>
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold">${amount.toFixed(2)}</span>
              {adjustedPayments[name] === 0? (
                <span className="text-green-500 font-medium">Paid</span>
              ) : (
                <button
                  onClick={() => handlePay(name)}
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
