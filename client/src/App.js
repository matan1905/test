import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Confetti from 'react-confetti';
import ContactSelector from './components/ContactSelector';
import Header from './components/Header';
import PaymentConfirmation from './components/PaymentConfirmation';
import ThankYouPage from './components/ThankYouPage';
import axios from 'axios';
import SelectionScreen from './components/SelectionScreen';


function App() {
  const [step, setStep] = useState(1);
  const [paidStatus, setPaidStatus] = useState({});
  const prevStep = () => setStep(step - 1);
  const totalAmount = 8953.96; // This value is now more prominent in the UI
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [payments, setPayments] = useState({});
  const [socket, setSocket] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => {
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('/');
    const baseUrl = urlParts.slice(0, urlParts.length - 1).join('/');
    console.log(baseUrl);
    const newSocket = io(baseUrl);
    setSocket(newSocket);
    
    if (currentUrl.includes('/pay')) {
      Promise.all([
        axios.get('/api/lastAdjustment'),
        axios.get('/api/paidStatus')
      ]).then(([adjustmentResponse, statusResponse]) => {
        setPayments(adjustmentResponse.data);
        setPaidStatus(statusResponse.data);
        setStep(3);
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    }
    
    return () => newSocket.close();
  }, []);

  }, []);
  useEffect(() => {
    if (socket) {
      socket.on('paymentStatusUpdated', (data) => {
        setPaidStatus(prevStatus => ({
          ...prevStatus,
          [data.name]: true
        }));
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
      <Header amount={totalAmount} context="This is splitting payment for a flight to TLV->LAS and back" />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-7xl">
          {step === 1 && <SelectionScreen onPersonSelected={(person) => {
            setSelectedPerson(person);
            nextStep();
          }} />}
{step === 2 && selectedPerson && payments[selectedPerson] !== undefined && (
  <PaymentConfirmation
              adjustedPayments={payments}
              paidStatus={paidStatus}
              onPaymentComplete={() => {
                socket.emit('updatePaymentStatus', { name: selectedPerson, amount: payments[selectedPerson] });
                nextStep();
              }}
              onBack={prevStep}
              socket={socket}
              selectedPerson={selectedPerson}
            />
          )}
          {step === 3 && <ThankYouPage />}
        </div>
      </div>
    </div>
  );
}

export default App;
