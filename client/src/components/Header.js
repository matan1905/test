import React from 'react';

function Header({ amount, context, paidStatus, people }) {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold mb-4 text-center">Payment Split Demo</h1>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-4xl font-bold">Amount: ${amount} USD</p>
            <p className="text-lg mt-2">{context}</p>
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
