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
          {step === 2 && (
            <PaymentAdjustment
              contacts={selectedContacts}
              totalAmount={totalAmount}
              onAdjustmentComplete={(adjustments) => { setAdjustedPayments(adjustments); nextStep(); }}
              onBack={prevStep}
            />
          )}
          {step === 3 && (
            <PaymentConfirmation
              adjustedPayments={adjustedPayments}
              onPaymentComplete={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 4 && <ThankYouPage />}
        </div>
      </div>
    </div>
  );
}

export default App;
