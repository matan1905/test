import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Confetti from 'react-confetti';
import ContactSelector from './components/ContactSelector';
import Header from './components/Header';
import PaymentConfirmation from './components/PaymentConfirmation';
import ThankYouPage from './components/ThankYouPage';
import axios from 'axios';


function App() {
  const [step, setStep] = useState(0);
  const [paidStatus, setPaidStatus] = useState({});
  const prevStep = () => setStep(step - 1);
  const totalAmount = 8953.96; // This value is now more prominent in the UI
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [payments, setPayments] = useState({});
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
          setPayments(response.data);
          setStep(3);
        })
        .catch(error => console.error('Error fetching last adjustment:', error));
    axios.get('/api/paidStatus')
    .then(response => {
      setPaidStatus(response.data);
    })
    .catch(error => console.error('Error fetching paid status:', error));
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
          {step === 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Select Your Role</h2>
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setSelectedRole('organizer');
                    setStep(1);
                  }}
                  className="w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-secondary transition-colors text-lg font-semibold"
                >
                  I'm the Organizer
                </button>
                <button
                  onClick={() => {
                    setSelectedRole('participant');
                    setStep(3);
                  }}
                  className="w-full bg-accent text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors text-lg font-semibold"
                >
                  I'm a Participant
                </button>
              </div>
            </div>
          )}
          {step === 1 && selectedRole === 'organizer' && (
            <ContactSelector onContactsSelected={(contacts) => { 
              setSelectedContacts(contacts);
              const equalShare = totalAmount / contacts.length;
              const newPayments = contacts.reduce((acc, contact) => {
                acc[contact.name] = equalShare;
                return acc;
              }, {});
              setPayments(newPayments);
              axios.post('/api/lastAdjustment', newPayments)
                .then(() => nextStep())
                .catch(error => console.error('Error saving last adjustment:', error));
            }} />
          )}
          {step === 2 && (
            <PaymentConfirmation
              adjustedPayments={payments}
              paidStatus={paidStatus}
              onPaymentComplete={nextStep}
              onBack={prevStep}
              socket={socket}
            />
          )}
          {step === 3 && (
            <div>
              <PaymentConfirmation
                adjustedPayments={payments}
                paidStatus={paidStatus}
                onPaymentComplete={nextStep}
                onBack={prevStep}
                socket={socket}
              />
              <button
                onClick={() => {
                  // Implement share functionality here
                  console.log("Share button clicked");
                }}
                className="mt-4 bg-primary text-white px-6 py-3 rounded-md hover:bg-secondary transition-colors text-lg font-semibold"
              >
                Share
              </button>
            </div>
          )}
          {step === 4 && <ThankYouPage />}
        </div>
      </div>
    </div>
  );
}

export default App;
