import React, { useState } from 'react';
import PriceDisplay from './components/PriceDisplay';
import ContactSelector from './components/ContactSelector';
import PaymentAdjustment from './components/PaymentAdjustment';
import PaymentConfirmation from './components/PaymentConfirmation';
import ThankYouPage from './components/ThankYouPage';

function App() {
  const [step, setStep] = useState(1);
  const [totalAmount] = useState(3000);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [adjustedPayments, setAdjustedPayments] = useState({});

  const nextStep = () => setStep(step + 1);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Payment Split Demo</h1>
        {step === 1 && <PriceDisplay amount={totalAmount} onSplitPayment={nextStep} />}
        {step === 2 && <ContactSelector onContactsSelected={(contacts) => { setSelectedContacts(contacts); nextStep(); }} />}
        {step === 3 && <PaymentAdjustment contacts={selectedContacts} totalAmount={totalAmount} onAdjustmentComplete={(adjustments) => { setAdjustedPayments(adjustments); nextStep(); }} />}
        {step === 4 && <PaymentConfirmation adjustedPayments={adjustedPayments} onPaymentComplete={nextStep} />}
        {step === 5 && <ThankYouPage />}
      </div>
    </div>
  );
}

export default App;