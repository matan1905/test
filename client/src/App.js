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
    totalAmount: 8953.96,
    people: []
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
    // Check if we're on the /pay route
    if (currentUrl.includes('/pay')) {
      // Fetch last adjustment and move to payment confirmation
      axios.get('/api/state')
        .then(response => {
          setState(response.data);
          setStep(3);
        })
        .catch(error => console.error('Error fetching state:', error));
    }
  return () => newSocket.close();

  }, []);

 useEffect(() => {
    if (socket) {
      socket.on('stateUpdate', (newState) => {
        setState(newState);
      });
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
      <Header amount={state.totalAmount} context="This is splitting payment for a flight to TLV->LAS and back" />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-7xl">
          {step === Screens.Identify && <SelectionScreen onPersonSelected={(person) => {
            setSelectedPerson(person);
            nextStep();
          }} people={state.people} />}
            {step === Screens.Payment && (
              <PaymentConfirmation
                  socket={socket}
                  adjustedPayments={state.lastAdjustment}
                  onPaymentComplete={nextStep}
                  onBack={prevStep}
                  selectedPerson={selectedPerson}
            />
          )}
            {step === Screens.WaitForEveryone && <WaitForEveryone

              paidStatus={state.paidStatus}
              people={state.people}
            />}
          {step === Screens.ThankYou && <ThankYouPage />}
        </div>
      </div>
    </div>
  );
}

export default App;
