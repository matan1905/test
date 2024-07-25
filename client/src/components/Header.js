import React from 'react';

function Header({ amount, context, paidStatus, people }) {
  const totalPeople = people.length;
  const paidPeople = Object.values(paidStatus).filter(Boolean).length;
  const progress = (paidPeople / totalPeople) * 100;
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold mb-4 text-center">Payment Split Demo</h1>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-4xl font-bold">Amount: ${amount} USD</p>
            <p className="text-lg mt-2">{context}</p>
        <div className="mt-4">
          <div className="w-full bg-white rounded-full h-4 dark:bg-gray-700">
            <div 
              className="bg-green-600 h-4 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm mt-2 text-center">{paidPeople} out of {totalPeople} people have paid</p>
        </div>
      </div>
          <div className="text-right">
            <p className="text-lg">Split your payment</p>
            <p className="text-sm">with friends and family</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
