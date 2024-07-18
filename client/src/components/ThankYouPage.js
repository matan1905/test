import React from 'react';

function ThankYouPage() {
  return (
    <div className="text-center">
      <svg className="w-24 h-24 mx-auto mb-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Thank You!</h2>
      <p className="text-xl text-gray-600 mb-8">Your payment has been processed successfully.</p>
      <div className="space-y-4">
        <p className="text-lg text-gray-700">What would you like to do next?</p>
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
            View Receipt
          </button>
          <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors">
            New Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThankYouPage;