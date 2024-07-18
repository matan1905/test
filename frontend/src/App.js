import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Payment Split Demo</h1>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}

export default App;