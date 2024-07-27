import React, {useState, useEffect} from 'react';
import {io} from 'socket.io-client';
import Confetti from 'react-confetti';
import Header from './components/Header';
import PaymentConfirmation from './components/PaymentConfirmation';
import ThankYouPage from './components/ThankYouPage';
import axios from 'axios';
import SelectionScreen from './components/SelectionScreen';
import WaitForEveryone from './components/WaitForEveryone';
import SharePopup from './components/SharePopup';

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
        shareToPay: {},
        status: {},
        totalAmount: 8953.96,
        people: [],
        payUntil: (new Date(Date.now() + 3600000)).getTime()
    });


    const [sharePopup, setSharePopup] = useState(false);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Join our payment split',
                text: 'Click here to join our payment split.',
                url: window.location.href
            }).then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing:', error));
        } else {
          setSharePopup(true);
        }
    };

    const [socket, setSocket] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    useEffect(() => {
        const currentUrl = window.location.href;
        // extract the relevant part of the url
        const urlParts = currentUrl.split('/');
        const baseUrl = urlParts.slice(0, urlParts.length - 1).join('/');
        const newSocket = io(baseUrl);
        setSocket(newSocket);
        axios.get('/api/state')
            .then(response => {
                setState(response.data);
            })
            .catch(error => console.error('Error fetching state:', error));
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
    const allJoined = Object.values(state.status).every(status => status === 'joined' || status === 'paid');

    return (
        <div className="min-h-screen bg-background font-sans flex flex-col">
            <Confetti run={showConfetti} numberOfPieces={500} recycle={false}/>
            <Header
                amount={state.totalAmount}
                status={state.status}
                payUntil={state.payUntil}
                people={state.people}
            />

            <div className="flex-grow flex flex-col items-center p-4">
                {step === Screens.Identify && <div
                    className="flex shadow-lg bg-white text-primary mb-4 flex-col items-center justify-center space-y-4 py-4  rounded-lg w-1/6">
                    <span className={"text-sm font-bold"}>Your share to pay</span>
                    <p className="text-2xl font-bold">${state.shareToPay[selectedPerson ?? "Matan Ellhayani"]} USD</p>
                </div>}


                {step === Screens.WaitForEveryone && !allJoined && <div
                    className=" flex shadow-sm bg-amber-100 text-amber-800 mb-4 flex-col items-center justify-center space-y-4 py-4  rounded-lg w-full max-w-7xl">
                    <span className={"text-xl font-bold"}>Not everyone joined yet</span>
                    <button
                        onClick={handleShare}
                        className="flex flex-row items-center  border-2 border-amber-800 text-amber-800 px-4 py-2 rounded-lg font-semibold hover:border-amber-950 hover:text-amber-950 transition-colors"
                    >
                        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"/>
                        </svg>
                        <span className={"text-xl font-bold"}>
                        Share

                        </span>

                    </button>
                </div>}


                <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-7xl">
                    {step === Screens.Identify && <SelectionScreen
                        shareToPay={state.shareToPay}
                        status={state.status}
                        onPersonSelected={(person) => {
                            setSelectedPerson(person);
                            nextStep();
                            socket.emit('updateStatus', {name: person, status: 'joined'});
                        }} people={state.people}/>}
                    {step === Screens.Payment && (
                        <PaymentConfirmation
                            socket={socket}
                            adjustedPayments={state.shareToPay}
                            onPaymentComplete={nextStep}
                            onBack={prevStep}
                            selectedPerson={selectedPerson}
                        />
                    )}
                    {step === Screens.WaitForEveryone && <WaitForEveryone

                        status={state.status}
                        people={state.people}
                    />}
                    {step === Screens.ThankYou && <ThankYouPage/>}
                </div>
            </div>
            <SharePopup isOpen={sharePopup} onClose={() => setSharePopup(false)} />
        </div>
    );
}

export default App;
