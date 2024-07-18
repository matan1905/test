import React, { useState } from 'react';

function ContactSelector({ onContactsSelected }) {
  const [contacts, setContacts] = useState([]);

  const addContact = async () => {
    if ("contacts" in navigator && "ContactsManager" in window) {
      try {
        const selectedContacts = await navigator.contacts.select(['name', 'email'], { multiple: true });
        setContacts([...contacts, ...selectedContacts]);
      } catch (error) {
        console.error('Error selecting contacts:', error);
      }
    } else {
      alert('Contact picker is not supported in this browser.');
    }
  };

  return (
    <div>
      <button
        onClick={addContact}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors mb-4"
      >
        Add Contacts
      </button>
      <ul className="space-y-2">
        {contacts.map((contact, index) => (
          <li key={index} className="bg-gray-100 p-2 rounded-md">
            {contact.name[0]} - {contact.email[0]}
          </li>
        ))}
      </ul>
      <button
        onClick={() => onContactsSelected(contacts)}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
      >
        Next
      </button>
    </div>
  );
}

export default ContactSelector;
