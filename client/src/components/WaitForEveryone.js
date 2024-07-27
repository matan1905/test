import React, { useEffect, useState } from 'react';

function WaitForEveryone({ status, people }) {

    const allPaid = people.every(person => status[person.name] === 'paid');

    return (
        <div className="flex flex-col">
            <div className="flex flex-row mb-4">
                <h2 className="text-2xl font-semibold mb-4">Waiting for everyone</h2>
            </div>

            <ul className="space-y-2">
                {people.map((person) => (
                    <li key={person.name} className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                        <span>{person.name}</span>
                        <span data-paid={status[person.name]} className={`font-semibold data-[paid=paid]:text-green-500 data-[paid=joined]:text-yellow-500 text-red-500`}>
                            {status[person.name] ?? 'Not joined'}
                        </span>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default WaitForEveryone;
