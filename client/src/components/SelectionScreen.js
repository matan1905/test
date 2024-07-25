import React from 'react';
export const people = [
    { name: 'Matan Ellhayani', id: 'matan' },
    { name: 'itamar hay', id: 'itamar' },
    { name: 'Plony Almony', id: 'plony' }
];
function SelectionScreen({ onPersonSelected }) {
  const [selectedPerson, setSelectedPerson] = React.useState(null);

      const handlePersonClick = (person) => {
        setSelectedPerson(person);
      };
      const handleContinue = () => {
        if (selectedPerson) {
          onPersonSelected(selectedPerson.name);
        }
      };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Please identify yourself</h2>
      <ul className="space-y-2">
        {people.map((person) => (
          <li key={person.name}
              data-selected={selectedPerson?.name === person.name}
               onClick={() => handlePersonClick(person)}
              className={`cursor-pointer bg-gray-100 p-4 rounded-md  data-[selected=true]:border-2 data-[selected=true]:border-primary hover:text-primary data-[selected=true]:text-primary transition-colors`}>
            <div className="flex justify-between items-center">
              <span


              className={`w-full text-left text-lg  transition-colors`}
            >
              {person.name}
            </span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">${lastAdjustment[person.name]}</span>
                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                  joinedStatus[person.name] ? 'bg-green-100 text-green-800' : 
                  (selectedPerson?.name === person.name ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800')
                }`}>
                  {joinedStatus[person.name] ? 'Joined' : (selectedPerson?.name === person.name ? 'Joining' : 'Not Joined')}
                </span>
              </div>
            </div>
          </li>
        )}
        ))}
      </ul>
      {
        <button
          onClick={handleContinue}
          style={{visibility: selectedPerson ? 'visible' : 'hidden'}}
          className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-secondary transition-colors"
        >
          Continue as {selectedPerson?.name}
        </button>
      }
    </div>
  );
}

export default SelectionScreen;
