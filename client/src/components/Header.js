import React from 'react';
import { useEffect, useState } from 'react';

function Header({ amount, status, people, payUntil,onShare }) {
  const totalPeople = people.length;
  const paidPeople = Object.values(status).filter(status => status === 'paid').length;
  const progress = (paidPeople / totalPeople) * 100;

  // timer until payment deadline
  const [timeLeft, setTimeLeft] = useState(Math.floor((payUntil - new Date()) / 1000));
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(Math.max(0, Math.floor((payUntil - new Date()) / 1000)));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);


  return (
    <header className="bg-primary text-white p-8">
      <div className="container mx-auto">
          <div>
              <div className={"flex flex-row items-center justify-center"}>
                  <img
                      onClick={() => fetch('/api/reset')}

                      src={'/logo.png'} alt="logo" className="w-24 h-24 mr-4"/>


              </div>
              <div className={"flex flex-col items-center justify-center"}>
                  <span className={"text-2xl"}>Pay together with friends</span>
                  <span className="text-sm">
                      <a
                          onClick={onShare}
                          className="font-bold cursor-pointer hover:underline">Invite your friends</a> to join and cover their share
                  </span>
              </div>
              <div className="flex flex-row w-full justify-center items-center space-x-2">
                  <span>ILS</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
                      <path fill="currentColor"
                            d="M11.08 17.77h-1.09l.77-4.31c-.84-.03-1.66-.09-2.39-.16l-1.38 1.48h-.57l.32-1.74c-.56-.13-.88-.26-.88-.48 0-.2.27-.36.88-.5l-.32-1.76h.57l1.38 1.49c.85-.09 1.64-.15 2.39-.18l-.77-4.3h1.09l2.71 4.28c1.74.03 3.05.13 3.88.29.8.15 1.19.37 1.19.66 0 .29-.39.5-1.19.66-.83.16-2.14.25-3.88.29l-2.7 4.28zm-.8-.21h.65l2.7-4.27.07-.01c1.76-.03 3.08-.13 3.9-.28.86-.16 1-.35 1-.45 0-.17-.36-.33-1-.45-.83-.16-2.14-.25-3.9-.28l-.07-.01-2.7-4.27h-.65l.77 4.29-.14.01c-.81.03-1.65.09-2.58.19l-.07.01-1.39-1.51h-.15l.31 1.7-.11.02c-.77.18-.8.31-.8.33 0 .01.01.05.17.12.13.06.33.11.63.18l.11.02-.31 1.68h.15l1.39-1.5.07.01c.78.09 1.67.15 2.58.18l.14.01-.77 4.29z"/>
                  </svg>
                  <span>LAS</span>
              </div>
              <div className="mt-2">
                  <div className="w-full bg-white rounded-full h-4 dark:bg-background">
                      <div
                          className="bg-secondary h-4 rounded-full transition-all duration-500 ease-out"
                          style={{width: `${progress}%`}}
                      ></div>
                  </div>
                  <p className="text-2xl mt-2 text-center">${((paidPeople * amount) / totalPeople).toFixed(2)} out of
                      ${amount} paid</p>

              </div>
          </div>
          <div className="flex flex-row w-full justify-center items-center space-x-2 mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>

              <span className="text-3xl font-bold text-center">
                        {`${Math.floor(timeLeft / 60)}:${Math.floor(timeLeft % 60).toString().padStart(2, '0')}`}
                    </span>
          </div>


      </div>
    </header>
  );
}

export default Header;
