import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { people } from './SelectionScreen';

function WaitForEveryone() {
    const [paidStatus, setPaidStatus] = useState({});
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io();
        setSocket(newSocket);

        axios.get('/api/paidStatus')
            .then(response => {
                setPaidStatus(response.data);
            })
            .catch(error => console.error('Error fetching paid status:', error));

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
        }
    }, [socket]);

    const allPaid = people.every(person => !!paidStatus[person.id]);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Join our payment split',
                text: 'Click here to join our payment split.',
                url: window.location.href
            }).then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing:', error));
        } else {
            console.log('Web Share API not supported');
            // Fallback behavior here (e.g., copy link to clipboard)
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center space-x-4 mb-4">
                <h2 className="text-2xl font-semibold mb-4">Waiting for everyone</h2>

                {!allPaid && (
                    <button
                        onClick={handleShare}
                        className=" text-primary hover:text-secondary transition-colors"
                    >
                        Share
                    </button>
                )}
            </div>

            <ul className="space-y-2">
                {people.map((person) => (
                    <li key={person.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                        <span>{person.name}</span>
                        <span data-paid={!!paidStatus[person.id]} className={`font-semibold data-[paid=true]:text-green-500 data-[paid=false]:text-yellow-500`}>
                            {paidStatus[person.id] ? 'Paid' : 'Waiting'}
                        </span>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default WaitForEveryone;