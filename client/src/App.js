import React, { useState } from 'react';
import ContactSelector from './components/ContactSelector';
import Header from './components/Header';
import PaymentAdjustment from './components/PaymentAdjustment';
import PaymentConfirmation from './components/PaymentConfirmation';
import ThankYouPage from './components/ThankYouPage';
 const prevStep = () => setStep(step - 1);

function App() {
  const [step, setStep] = useState(1);
  const totalAmount = 8953.96;
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [adjustedPayments, setAdjustedPayments] = useState({});

  const nextStep = () => setStep(step + 1);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header amount={totalAmount} context="This is splitting payment for a flight to TLV->LAS and back" />
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          {step === 1 && <ContactSelector onContactsSelected={(contacts) => { setSelectedContacts(contacts); nextStep(); }} />}
          {step === 2 && <PaymentAdjustment contacts={selectedContacts} totalAmount={totalAmount} onAdjustmentComplete={(adjustments) => { setAdjustedPayments(adjustments); nextStep(); }} />}
          {step === 3 && <PaymentConfirmation adjustedPayments={adjustedPayments} onPaymentComplete={nextStep} />}
          {step === 4 && <ThankYouPage />}
          {step > 1 && step < 4 && (
            <button
              onClick={prevStep}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
