import React from 'react';
import { useState } from 'react';
import { SharePhone, ShareEmail, ShareCopyLink } from './ShareComponents';

const tabs = [
    {
        title: 'Phone',
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"/>
        </svg>

    },
    {
        title: 'Email',
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/>
        </svg>

    },
    {
        title: 'Copy Link',
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"/>
        </svg>

    }
];

function SharePopup({isOpen, onClose}) {
    const [currentTab, setCurrentTab] = useState(0);


    return isOpen ?
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`} onClick={onClose}>
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md"
                 onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
                <h2 className="text-2xl font-semibold mb-4">Share with your friends</h2>
                <div className="flex flex-row space-x-4">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentTab(index)}
                            data-is-active={currentTab === index}
                            className={`data-[is-active=true]:bg-primary data-[is-active=true]:text-white data-[is-active=false]:text-gray-600 hover:text-gray-800 transition-colors px-4 py-2 rounded-md`}
                        >
                            <div className="flex flex-row items-center justify-center">
                                {tab.icon}
                                <span className="ml-2">{tab.title}</span>
                            </div>
                        </button>
                    ))}

                </div>
                <hr className="my-4 w-full"/>
                {currentTab === 0 && <SharePhone onClose={onClose} />}
                {currentTab === 1 && <ShareEmail onClose={onClose} />}
                {currentTab === 2 && <ShareCopyLink onClose={onClose} />}

            </div>
        </div> : null;
}





export default SharePopup;
