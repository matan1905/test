import React, { useState } from 'react';

export function SharePhone({ onClose }) {
    const [countryCode, setCountryCode] = useState('+1');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleShare = () => {
        // Implement phone sharing logic here
        console.log(`Sharing to ${countryCode}${phoneNumber}`);
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            onClose();
        }, 1200);
    };

    return (
        <div className="space-y-4">
            <div className="flex space-x-2">
                <input
                    type="text"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-20 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="+1"
                />
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Phone number"
                />
            </div>
            <button
                disabled={isLoading}
                onClick={handleShare}
                className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors disabled:bg-gray-300"
            >
                {isLoading ? 'Sharing...' : 'Share via SMS'}
            </button>
        </div>
    );
}

export function ShareEmail({ onClose }) {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleShare = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            onClose();
        }, 1200);
    };

    return (
        <div className="space-y-4">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Email address"
            />
            <button
                onClick={handleShare}
                disabled={isLoading}
                className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors disabled:bg-gray-300"
            >
                {isLoading ? 'Sharing...' : 'Share via Email'}
            </button>
        </div>
    );
}

export function ShareCopyLink({ onClose }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
                onClose();
            }, 2000);
        });
    };

    return (
        <div className="space-y-4">
            <div className="flex">
                <input
                    type="text"
                    value={window.location.href}
                    readOnly
                    className="flex-1 border border-gray-300 rounded-l-md shadow-sm py-2 px-3 bg-gray-100"
                />
                <button
                    onClick={handleCopy}
                    className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-secondary transition-colors"
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
        </div>
    );
}