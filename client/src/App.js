import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Confetti from 'react-confetti';
import Header from './components/Header';
import PaymentConfirmation from './components/PaymentConfirmation';
import ThankYouPage from './components/ThankYouPage';
import axios from 'axios';
import SelectionScreen from './components/SelectionScreen';
import WaitForEveryone from './components/WaitForEveryone';

const Screens = {
    Identify: 1,
    Payment: 2,
    WaitForEveryone: 3,
    ThankYou: 4
}

function App() {
  const [step, setStep] = useState(1);
  const prevStep = () => setStep(step - 1);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [state, setState] = useState({
    lastAdjustment: {},
    paidStatus: {},
    totalAmount: 0,
    context: "",
    payments: {}
  });
  const [socket, setSocket] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => {
    const currentUrl = window.location.href;
    // extract the relevant part of the url
    const urlParts = currentUrl.split('/');
    const baseUrl = urlParts.slice(0, urlParts.length - 1).join('/');
    const newSocket = io(baseUrl);
    setSocket(newSocket);
  
  newSocket.on('initialState', (initialState) => {
    setState(initialState);
    if (currentUrl.includes('/pay')) {
      setStep(3);
    }
  });
  newSocket.on('stateUpdate', (updatedState) => {
    setState(updatedState);
  });
  return () => newSocket.close();

  }, []);

 useEffect(() => {
    if (socket) {
      socket.on('showConfetti', () => {
        setShowConfetti(true);
        setStep(4); // Move to ThankYouPage
      });
    }
  }, [socket]);
  const nextStep = () => setStep(step + 1);

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
       <Confetti  run={showConfetti} numberOfPieces={500} recycle={false} />
    <Header amount={state.totalAmount} context={state.context} />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-7xl">
          {step === Screens.Identify && <SelectionScreen onPersonSelected={(person) => {
            setSelectedPerson(person);
            nextStep();
          }} />}
            {step === Screens.Payment && (
              <PaymentConfirmation
                adjustedPayments={state.payments}
                  onPaymentComplete={nextStep}
                  onBack={prevStep}
                  selectedPerson={selectedPerson}
            />
          )}
          {step === Screens.WaitForEveryone && <WaitForEveryone paidStatus={state.paidStatus} socket={socket} />}
          {step === Screens.ThankYou && <ThankYouPage />}
        </div>
      </div>
    </div>
  );
}

export default App;
