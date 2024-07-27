import React from 'react';
import { useEffect, useState } from 'react';

function Header({ amount, status, people, payUntil }) {
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

                  src={'/logo.png'} alt="logo" className="w-24 h-24 mr-4" />


            </div>

            <div className="mt-6">
            <div className="w-full bg-white rounded-full h-4 dark:bg-background">
                <div
                  className="bg-secondary h-4 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-2xl mt-2 text-center">${ ((paidPeople * amount)/totalPeople).toFixed(2) } out of ${amount} paid</p>

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
