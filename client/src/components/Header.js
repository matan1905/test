import React from 'react';

function Header({ amount, paidStatus, people }) {
  const totalPeople = people.length;
  const paidPeople = Object.values(paidStatus).filter(Boolean).length;
  const progress = (paidPeople / totalPeople) * 100;
  return (
    <header className="bg-primary text-white p-8">
      <div className="container mx-auto">
          <div>
            <div className={"flex flex-row items-center justify-between"}>
              <img src={'/logo.png'} alt="logo" className="w-16 h-16 mr-4" />
              <p className="text-4xl font-bold">${amount} USD</p>

            </div>

            <div className="mt-4">
            <div className="w-full bg-white rounded-full h-4 dark:bg-background">
                <div
                  className="bg-secondary h-4 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm mt-2 text-center">${ ((paidPeople * amount)/totalPeople).toFixed(2) } / ${amount} USD</p>
            </div>
          </div>
      </div>
    </header>
  );
}

export default Header;
