import React from 'react';
import { getInitials, getRandomColor } from '../utils/helpers';
import {default as Tag} from './Tag';
export const people = [
    { name: 'Matan Ellhayani', id: 'matan' },
    { name: 'itamar hay', id: 'itamar' },
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
    <>
        <div className={"flex flex-row items-center geologica p-4"}>
            <hr className={"flex-grow border-1 border-gray-300"}/>
            <span className={"mx-4"}>Please identify yourself</span>
            <hr className={"flex-grow border-1 border-gray-300"}/>
        </div>

      <ul className="space-y-2 geologica">
        {people.map((person) =>
          <li key={person.name}
              data-selected={selectedPerson?.name === person.name}
               onClick={() => status[person.name] !== 'paid' && handlePersonClick(person)}
              className={`cursor-pointer bg-light p-4 rounded-md  data-[selected=true]:border-2 data-[selected=true]:border-primary hover:text-primary  transition-colors`}>
            <div
              className={`w-full text-lg  flex flex-row items-center transition-colors justify-between`}
            >
                <div className={`flex flex-row`}>
                     <span className={`text-lg font-semibold flex items-center`}>
                         <span className="inline-flex items-center justify-center h-5 w-5 p-5 rounded-full mr-2" style={{backgroundColor: getRandomColor(person.name)}}>
                             <span className="text-white font-light">{getInitials(person.name)}</span>
                         </span>
                     </span>
                    <div className={"flex flex-col"}>
                        <span>  {person.name}</span>
                        <span className={`text-sm font-light text-gray-400`}>123{shareToPay[person.name]}$</span>

                    </div>

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
          className="mt-4 w-full  bg-primary text-white py-2 rounded-full hover:bg-secondary transition-colors geologica"
        >
          Continue as {selectedPerson?.name}
        </button>
      }
    </>
  );
}

export default SelectionScreen;
