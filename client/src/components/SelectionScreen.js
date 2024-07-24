import React from 'react';

function SelectionScreen({ onPersonSelected }) {
  const people = [
    { name: 'Matan Ellhayani', id: 'matan' },
    { name: 'itamar hay', id: 'itamar' },
    { name: 'Plony Almony', id: 'plony' }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Your Name</h2>
      <ul className="space-y-2">
        {people.map((person) => (
          <li key={person.id} className="bg-gray-100 p-4 rounded-md">
            <button
              onClick={() => onPersonSelected(person.name)}
              className="w-full text-left text-lg hover:text-primary transition-colors"
            >
              {person.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectionScreen;