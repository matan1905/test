import React from 'react';

function Header({ amount, context }) {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">Payment Split Demo</h1>
        <p className="text-lg">Amount: ${amount} USD</p>
        <p className="text-sm">{context}</p>
      </div>
    </header>
  );
}

export default Header;