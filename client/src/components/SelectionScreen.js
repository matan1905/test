import React from 'react';
import {default as Tag} from './Tag';
export const people = [
    { name: 'Matan Ellhayani', id: 'matan' },
    { name: 'itamar hay', id: 'itamar' },
    { name: 'Plony Almony', id: 'plony' }
];
function SelectionScreen({ onPersonSelected, status,shareToPay }) {
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
        {people.map((person) =>
          <li key={person.name}
              data-selected={selectedPerson?.name === person.name}
               onClick={() => handlePersonClick(person)}
              className={`cursor-pointer bg-gray-100 p-4 rounded-md  data-[selected=true]:border-2 data-[selected=true]:border-primary hover:text-primary data-[selected=true]:text-primary transition-colors`}>
            <div


              className={`w-full text-left text-lg  flex flex-row items-center transition-colors justify-between`}
            >
                <div className={`flex flex-col`}>
                    <span className={`text-lg font-semibold`}>{person.name}</span>
                    <span className={`text-xs`}>${shareToPay[person.name]} USD</span>
                  
                </div>
                <Tag text={status[person.name] ?? 'Not joined'} color={status[person.name]==='paid' ? 'Success' : status[person.name] === 'joined' ? 'Warning' : 'Danger'}/>
            </div>
          </li>
        )}
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