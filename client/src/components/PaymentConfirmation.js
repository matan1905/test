import React, { useState, useEffect } from 'react';
import PaymentModal from './PaymentModal';

export default function PaymentConfirmation({ adjustedPayments, onPaymentComplete, onBack, selectedPerson,socket }){
    const [showModal, setShowModal] = useState(false);
    const handlePay = () => {
        // Update the payment status in the socket
        socket.emit('paymentStatusUpdated', { name: selectedPerson, status: 'paid' });
        onPaymentComplete();
    }
  return (
      <>
    <div className="flex flex-col items-center justify-center space-y-8">
      <h2 className="text-3xl font-semibold">Confirm Your Payment</h2>
      <div className="text-center">
        <p className="text-lg font-medium mb-2">{selectedPerson}</p>
        <p className="text-5xl font-bold text-primary">${adjustedPayments[selectedPerson]}</p>
      </div>
      <button
        onClick={() => setShowModal(true)}
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
          <PaymentModal
              isOpen={showModal}
              onPay={handlePay}
              onClose={() => setShowModal(false)}
              amount={adjustedPayments[selectedPerson]}
          />
          </>
  );
}