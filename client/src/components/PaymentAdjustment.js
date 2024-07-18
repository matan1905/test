import React, { useState, useEffect } from 'react';

function PaymentAdjustment({ contacts, totalAmount, onAdjustmentComplete, onBack }) {
  const [adjustments, setAdjustments] = useState([]);

  useEffect(() => {
    const equalShare = totalAmount / contacts.length;
    setAdjustments(contacts.map(contact => ({ name: contact.name, amount: equalShare })));
  }, [contacts, totalAmount]);

  const handleAdjustment = (index, value) => {
    const newAdjustments = adjustments.map((adj, i) => {
      if (i === index) {
        return { ...adj, amount: value };
      }
      return adj;
    });
    
    const totalAdjusted = newAdjustments.reduce((sum, adj) => sum + adj.amount, 0);
    const diff = totalAmount - totalAdjusted;
    
    if (diff !== 0) {
      const otherAdjustments = newAdjustments.filter((_, i) => i !== index);
      const otherTotal = otherAdjustments.reduce((sum, adj) => sum + adj.amount, 0);
      
      if (otherTotal > 0) {
        const factor = (otherTotal + diff) / otherTotal;
        newAdjustments.forEach((adj, i) => {
          if (i !== index) {
            adj.amount = Math.max(0, adj.amount * factor);
          }
        });
      }
    }
    
    setAdjustments(newAdjustments);
  };

  const handleSubmit = () => {
    const adjustmentObject = adjustments.reduce((acc, adj) => {
      acc[adj.name] = adj.amount;
      return acc;
    }, {});
    onAdjustmentComplete(adjustmentObject);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Adjust Payments</h2>
      {adjustments.map((adjustment, index) => (
        <div key={index} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {contacts[index].name} - ${adjustment.amount.toFixed(2)}
            </label>
          <div className="relative">
            <input
              type="range"
              min="0"
              max={totalAmount}
              step="0.01"
              value={adjustment.amount}
              onChange={(e) => handleAdjustment(index, parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                WebkitAppearance: 'none',
                background: `linear-gradient(to right, #4F46E5 0%, #4F46E5 ${(adjustment.amount / totalAmount) * 100}%, #E5E7EB ${(adjustment.amount / totalAmount) * 100}%, #E5E7EB 100%)`
              }}
            />

          </div>
      </div>))}

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
        >
          Back
        </button>
        <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Next
      </button>
    </div>
    </div>
  );
}

export default PaymentAdjustment;
