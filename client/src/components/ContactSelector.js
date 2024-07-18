import React, { useState } from 'react';
import Modal from './Modal';

function ContactSelector({ onContactsSelected }) {
  const [contacts, setContacts] = useState([
    { name: ['Matan Ellhayani'], email: ['matan@example.com'] },
    { name: ['itamar hay'], email: ['itamar@example.com'] },
    { name: ['Plony Almony'], email: ['plony@example.com'] }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const inviteContact = (contact) => {
    setInviteEmail(contact.email[0]);
    setShowModal(true);
  };

  const handleInvite = () => {
    // Here you would typically send an invitation to the email address
    console.log(`Invitation sent to ${inviteEmail}`);
    setShowModal(false);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Contacts</h2>
      <ul className="space-y-2">
        {contacts.map((contact, index) => (
          <li key={index} className="bg-gray-100 p-2 rounded-md flex justify-between items-center">
            <span>{contact.name[0]} - {contact.email[0]}</span>
            <button
              onClick={() => inviteContact(contact)}
              className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Invite
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => onContactsSelected(contacts)}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
      >
        Next
      </button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h3 className="text-lg font-semibold mb-2">Invite Contact</h3>
        <p>Enter the phone number for {inviteEmail}:</p>
        <input
          type="tel"
          className="mt-2 w-full p-2 border rounded"
          placeholder="Phone number"
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleInvite}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Send Invite
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ContactSelector;