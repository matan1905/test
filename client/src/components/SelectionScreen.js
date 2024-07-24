import React from 'react';

function SelectionScreen({ onRoleSelected }) {
  const roles = [
    { id: 'organizer', name: 'Organizer' },
    { id: 'participant', name: 'Participant' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Select Your Role</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => onRoleSelected(role.id)}
            className="bg-primary text-white p-4 rounded-lg hover:bg-secondary transition-colors text-lg font-semibold"
          >
            {role.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SelectionScreen;