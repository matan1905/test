import React, { useState } from 'react';
import Modal from './Modal';




function ContactSelector({ onContactsSelected }) {
  const canUseContacts = 'contacts' in navigator && 'select' in navigator.contacts

  const [contacts, setContacts] = useState([
    { name: 'Matan Ellhayani', id: 'matan' },
    { name: 'itamar hay', id: 'itamar' },
    { name: 'Plony Almony', id: 'plony' }
  ]);
  const [invitedContacts, setInvitedContacts] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [inviteId, setInviteId] = useState('');




  const inviteContact = (contact) => {
    setInviteId(contact.id);
    setShowModal(true);
  };

  const handleInvite = () => {
    setInvitedContacts(prev => ({ ...prev, [inviteId]: 'inviting' }));
    setTimeout(() => {
      setInvitedContacts(prev => ({ ...prev, [inviteId]: 'invited' }));
    }, 1000);
    setShowModal(false);
  };

  const handleSelectContacts = async () => {
    try {
      const properties = ['name', 'email', 'tel'];
      const selectedContacts = await navigator.contacts.select(properties, { multiple: true });
      const newContacts = selectedContacts.map((contact, index) => ({
        name: contact.name[0] || `Contact ${index + 1}`,
        id: `contact-${index}`,
        email: contact.email[0],
        tel: contact.tel[0]
      }));
      // find the contact and set the tel number
      const contact = contacts.find(c => c.id === newContacts[0].id);
      if (contact) {
        setContacts(prevContacts => [...prevContacts, contact]);
      }
    } catch (err) {
      console.error('Error selecting contacts:', err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Contacts</h2>
      <ul className="space-y-2">
        {contacts.map((contact, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
            <span className="text-lg">{contact.name}</span>
            {invitedContacts[contact.id] ? (invitedContacts[contact.id] === 'inviting' ? (
                <span className="text-yellow-500">Inviting...
                </span>
                        ) : (
                            <span className="text-green-500 flex items-center">
                              Invited <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </span>
                          )
                        )
            :
              <button
                onClick={() => inviteContact(contact)}
                className="bg-primary text-white px-4 py-2 rounded-md transition-colors text-sm hover:bg-secondary"
              >
                Invite
              </button>
            }
          </li>
        ))}
      </ul>
      <button
        onClick={() => onContactsSelected(contacts)}
        className="mt-6 bg-accent text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors text-lg font-semibold"
      >
        Next
      </button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h3 className="text-lg font-semibold mb-2">Invite Contact</h3>

        {canUseContacts && (
            <div className={"flex flex-col items-center"}>
            <button
                onClick={handleSelectContacts}
                className="mb-4 bg-primary text-white px-4 py-2 rounded-md transition-colors text-sm hover:bg-secondary font-semibold"
            >
              Select from device contacts
            </button>
              <span>
                or
              </span>
              </div>
        )}
        <p className={"text-center mt-2"}>Enter their phone number</p>
        <input
            type="tel"
            className="mt-2 w-full p-2 border rounded"
            placeholder="Phone Number"
        />
        <div className="mt-4 flex justify-end">
          <button
              onClick={handleInvite}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors"
          >
            Send Invite
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ContactSelector;
