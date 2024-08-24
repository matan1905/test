import React, {useState, useEffect} from 'react';
import {io} from 'socket.io-client';
import Confetti from 'react-confetti';
import PaymentConfirmation from './components/PaymentConfirmation';
import ThankYouPage from './components/ThankYouPage';
import axios from 'axios';
import SelectionScreen from './components/SelectionScreen';
import WaitForEveryone from './components/WaitForEveryone';
import SharePopup from './components/SharePopup';
import Header from "./newComponents/Header";
import Details from "./newComponents/Details";

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
        payUntil: (new Date(Date.now() + 3600000)).getTime(),
        type:'hotel'
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
    const allJoined = Object.values(state.people).every(person => state.status[person.name] === 'paid' || state.status[person.name] === 'joined');
    console.log(allJoined,'allJoined');

    return (
        <div className="min-h-screen font-sans flex flex-col">
            <Confetti run={showConfetti} numberOfPieces={500} recycle={false}/>
            <Header />
            <Details
              amount={state.totalAmount}
                status={state.status}
                payUntil={state.payUntil}
                people={state.people}
                 onShare={handleShare}
              type={state.type}
            />


            <div className="flex-grow flex flex-col items-center p-4">



                <div className="w-full max-w-4xl">
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
                {
                    <button
                        onClick={handleShare}
                        className="flex mt-4 flex-row items-center bg-amber-100 px-6 py-2 rounded-full   transition-colors "
                    >
                        <div className={"p-2 bg-amber-200 rounded-full mr-2"}>
                            <img src={"/ShareFat.svg"} alt={"share"} className={""}/>
                        </div>
                        <span className={"text-xl  geologica"}>
                        Share payment

                        </span>

                    </button>
                }
            </div>

            <SharePopup isOpen={sharePopup} onClose={() => setSharePopup(false)} />
        </div>
    );
}

export default App;
