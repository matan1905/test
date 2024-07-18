import React, { useState } from 'react';
import { io } from 'socket.io-client';
import ContactSelector from './components/ContactSelector';
import Header from './components/Header';
import PaymentAdjustment from './components/PaymentAdjustment';
import PaymentConfirmation from './components/PaymentConfirmation';
import ThankYouPage from './components/ThankYouPage';
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on('paymentStatusUpdated', (data) => {
        setAdjustedPayments(prevPayments => ({
          ...prevPayments,
          [data.username]: data.amount
        }));
      });
    }
  }, [socket]);

function App() {
  const [step, setStep] = useState(1);
  const prevStep = () => setStep(step - 1);
  const totalAmount = 8953.96; // This value is now more prominent in the UI
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [adjustedPayments, setAdjustedPayments] = useState({});

  const nextStep = () => setStep(step + 1);

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <Header amount={totalAmount} context="This is splitting payment for a flight to TLV->LAS and back" />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-7xl">
          {step === 1 && <ContactSelector onContactsSelected={(contacts) => { setSelectedContacts(contacts); nextStep(); }} />}
          {step === 2 && (
            <PaymentAdjustment
              contacts={selectedContacts}
              totalAmount={totalAmount}
              onAdjustmentComplete={(adjustments) => { setAdjustedPayments(adjustments); nextStep(); }}
              onBack={prevStep}
              socket={socket}
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
