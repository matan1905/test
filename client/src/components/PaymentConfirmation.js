import React, { useState, useEffect } from 'react';

function PaymentConfirmation({ adjustedPayments, paidStatus, onPaymentComplete, onBack, socket, selectedPerson }) {
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
        {selectedPerson && adjustedPayments && adjustedPayments[selectedPerson] !== undefined ? (
          <div key={selectedPerson} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
            <p className="text-lg font-medium">{selectedPerson}</p>
            <div className="flex items-center space-x-4">
<span className="text-lg font-semibold">${adjustedPayments[selectedPerson] ? adjustedPayments[selectedPerson].toFixed(2) : '0.00'}</span>
              {paidStatus[selectedPerson] ? (
                <span className="text-green-500 font-medium">Paid</span>
              ) : (
                <button
                  onClick={() => handlePay(selectedPerson)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  disabled={paidStatus[selectedPerson]}
                >
                  Pay
                </button>
              )}
              <button
                onClick={() => handlePay(selectedPerson)}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Share
              </button>
            </div>
          </div>
        ) : (
          <p>No payment information available.</p>
        )}
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
