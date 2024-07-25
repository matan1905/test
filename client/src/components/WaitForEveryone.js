import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

function WaitForEveryone({ paidStatus, socket }) {
    const allPaid = Object.values(paidStatus).every(status => status === true);
    useEffect(() => {
        if (allPaid) {
            socket.emit('allPaymentsMade');
        }
    }, [allPaid, socket]);
                }));
            });
        }
    }, [socket]);

    const allPaid = Object.values(paidStatus).every(status => status === true);

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
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Waiting for everyone</h2>
            <ul className="space-y-2">
                {Object.entries(paidStatus).map(([name, status]) => (
                    <li key={name} className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                        <span>{name}</span>
                        <span className={`font-semibold ${status ? 'text-green-500' : 'text-yellow-500'}`}>
                            {status ? 'Paid' : 'Waiting'}
                        </span>
                    </li>
                ))}
            </ul>
            {!allPaid && (
                <button
                    onClick={handleShare}
                    className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition-colors"
                >
                    Share
                </button>
            )}
        </div>
    );
}

export default WaitForEveryone;
