import React, { useState, useEffect } from 'react';

function PaymentConfirmation({ adjustedPayments, paidStatus, onPaymentComplete, onBack, socket }) {
    useEffect(() => {
        const values = Object.values(paidStatus);
        const allPaid =values.length>2 && values.every(status => status === true);
        if (allPaid) {
          socket.emit('allPaymentsMade');
          onPaymentComplete();
        }
    }, [paidStatus]);

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
              {paidStatus[name] ? (
                <span className="text-green-500 font-medium">Paid</span>
              ) : (
                <button
                  onClick={() => handlePay(name)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  disabled={paidStatus[name]}
                >
                  Pay
                </button>
              )}
      </div>
          </div>
        ))}
      </div>
      {Object.values(paidStatus).every(status => !status) && (
        <div className="flex justify-between mt-8">
          <button
            onClick={onBack}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}

export default PaymentConfirmation;
