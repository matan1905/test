import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Confetti from 'react-confetti';
import ContactSelector from './components/ContactSelector';
import Header from './components/Header';
import PaymentAdjustment from './components/PaymentAdjustment';
import PaymentConfirmation from './components/PaymentConfirmation';
import ThankYouPage from './components/ThankYouPage';
import axios from 'axios';


function App() {
  const [step, setStep] = useState(1);
  const [paidStatus, setPaidStatus] = useState({});
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
    // Check if we're on the /pay route
    if (currentUrl.includes('/pay')) {
      // Fetch last adjustment and move to payment confirmation
      axios.get('/api/lastAdjustment')
        .then(response => {
          setAdjustedPayments(response.data);
          setStep(3);
        })
        .catch(error => console.error('Error fetching last adjustment:', error));
    }
    return () => newSocket.close();
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
          {step === 1 && <ContactSelector onContactsSelected={(contacts) => { setSelectedContacts(contacts); nextStep(); }} />}
          {step === 2 && (
            <PaymentAdjustment
              contacts={selectedContacts}
              totalAmount={totalAmount}
              onAdjustmentComplete={(adjustments) => { 
                setAdjustedPayments(adjustments); 
                axios.post('/api/lastAdjustment', adjustments)
                  .then(() => nextStep())
                  .catch(error => console.error('Error saving last adjustment:', error));
              }}
              onBack={prevStep}
              socket={socket}
            />
          )}
          {step === 3 && (
            <PaymentConfirmation
              adjustedPayments={adjustedPayments}
              paidStatus={paidStatus}
              onPaymentComplete={nextStep}
              onBack={prevStep}
              socket={socket}
            />
          )}
          {step === 4 && <ThankYouPage />}
        </div>
      </div>
    </div>
  );
}

export default App;
