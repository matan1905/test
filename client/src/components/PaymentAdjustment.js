import React, { useState, useEffect } from 'react';

function PaymentAdjustment({ contacts, totalAmount, onAdjustmentComplete }) {
  const [adjustments, setAdjustments] = useState({});

  useEffect(() => {
    const initialAdjustments = contacts.reduce((acc, contact) => {
      acc[contact.email[0]] = totalAmount / contacts.length;
      return acc;
    }, {});
    setAdjustments(initialAdjustments);
  }, [contacts, totalAmount]);

  const handleAdjustment = (email, value) => {
    setAdjustments({ ...adjustments, [email]: parseFloat(value) });
  };

  const handleSubmit = () => {
    onAdjustmentComplete(adjustments);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Adjust Payments</h2>
      {contacts.map((contact, index) => (
        <div key={index} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {contact.name[0]}
          </label>
          <input
            type="number"
            value={adjustments[contact.email[0]] || ''}
            onChange={(e) => handleAdjustment(contact.email[0], e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Next
      </button>
    </div>
  );
}

export default PaymentAdjustment;