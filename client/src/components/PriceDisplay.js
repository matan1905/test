import React from 'react';

function PriceDisplay({ amount, onSplitPayment }) {
  return (
    <div className="text-center">
      <p className="text-3xl font-bold mb-4">${amount}</p>
      <button
        onClick={onSplitPayment}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Split Payment
      </button>
    </div>
  );
}

export default PriceDisplay;