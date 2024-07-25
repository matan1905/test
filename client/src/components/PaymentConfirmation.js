import React, { useState, useEffect } from 'react';

export default function PaymentConfirmation({ adjustedPayments, onPaymentComplete, onBack, selectedPerson }){
    const handlePay = (name) => {
        onPaymentComplete();
    };
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h2 className="text-3xl font-semibold">Confirm Your Payment</h2>
      <div className="text-center">
        <p className="text-lg font-medium mb-2">{selectedPerson}</p>
        <p className="text-5xl font-bold text-primary">${adjustedPayments[selectedPerson]}</p>
      </div>
      <button
        onClick={() => handlePay(selectedPerson)}
        className="bg-primary text-white px-8 py-3 rounded-lg text-xl font-semibold hover:bg-secondary transition-colors"
      >
        Pay Now
      </button>
      <button
        onClick={onBack}
        className="text-gray-600 hover:text-gray-800 transition-colors"
      >
        Back
      </button>
    </div>
  );
}