import React from 'react';

function ThankYouPage() {
  return (
    <div className="text-center">
      <svg className="w-24 h-24 mx-auto mb-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Thank You!</h2>
      <p className="text-xl text-gray-600 mb-8">Your payment has been processed successfully.</p>
    </div>
  );
}

export default ThankYouPage;
