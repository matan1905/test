import React from 'react';
  const handlePersonClick = (person) => {
    setSelectedPerson(person);
  };
  const handleContinue = () => {
    if (selectedPerson) {
      onPersonSelected(selectedPerson.name);
    }
  };

function SelectionScreen({ onPersonSelected }) {
  const [selectedPerson, setSelectedPerson] = React.useState(null);
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
          <li key={person.id} className={`bg-gray-100 p-4 rounded-md ${selectedPerson === person ? 'border-2 border-primary' : ''}`}>
            <button
              onClick={() => handlePersonClick(person)}
              className="w-full text-left text-lg hover:text-primary transition-colors"
            >
              {person.name}
            </button>
          </li>
        ))}
      </ul>
      {selectedPerson && (
        <button
          onClick={handleContinue}
          className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-secondary transition-colors"
        >
          Continue as {selectedPerson.name}
        </button>
      )}
    </div>
  );
}

export default SelectionScreen;
