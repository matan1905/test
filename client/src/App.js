import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Confetti from 'react-confetti';
import ContactSelector from './components/ContactSelector';
import Header from './components/Header';
import PaymentAdjustment from './components/PaymentAdjustment';
import PaymentConfirmation from './components/PaymentConfirmation';
import ThankYouPage from './components/ThankYouPage';


function App() {
  const [step, setStep] = useState(1);
  const prevStep = () => setStep(step - 1);
  const totalAmount = 8953.96; // This value is now more prominent in the UI
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [adjustedPayments, setAdjustedPayments] = useState({});
  const [socket, setSocket] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => {
    const currentUrl = window.location.href;
    // extract the relevant part of the url
    const urlParts = currentUrl.split('/');
    const baseUrl = urlParts.slice(0, urlParts.length - 1).join('/');
    console.log(baseUrl);
    const newSocket = io(baseUrl);
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
      socket.on('showConfetti', () => {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
        setStep(4); // Move to ThankYouPage
      });
    }
  }, [socket]);
  const nextStep = () => setStep(step + 1);

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      {showConfetti && <Confetti />}
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
