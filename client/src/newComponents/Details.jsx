import React, {useEffect, useState} from 'react';

function Details({ amount, status, people, payUntil,onShare }) {

      const [timeLeft, setTimeLeft] = useState(Math.floor((payUntil - new Date()) / 1000));
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(Math.max(0, Math.floor((payUntil - new Date()) / 1000)));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

    const totalPeople = people.length;
    const paidPeople = Object.values(status).filter(status => status === 'paid').length;
    const progress = (paidPeople / totalPeople) * 100;

  return (
        <div className={"w-full flex flex-col items-center justify-center pt-8 geologica px-8"}>
            <h1 className={"text-3xl font-semibold geologica"}>Pay together with friends</h1>
            <p className={"text-xl font-light text-gray-400 p-2"}>Invite your friends to join and cover their share</p>

            <div
                className="flex flex-row justify-center items-center space-x-2 mt-2 bg-green-200 p-1 px-2 rounded-full">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1_30)">
                        <path
                            d="M11 18.5625C15.1767 18.5625 18.5625 15.1767 18.5625 11C18.5625 6.82335 15.1767 3.4375 11 3.4375C6.82335 3.4375 3.4375 6.82335 3.4375 11C3.4375 15.1767 6.82335 18.5625 11 18.5625Z"
                            stroke="#000710" strokeWidth="1.2232" strokeLinecap="round" stroke-linejoin="round"/>
                        <path d="M4.8125 2.0625L2.0625 4.8125" stroke="#000710" strokeWidth="1.2232"
                              strokeLinecap="round" stroke-linejoin="round"/>
                        <path d="M17.1875 2.0625L19.9375 4.8125" stroke="#000710" stroke-width="1.2232"
                              stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11 6.1875V11H15.8125" stroke="#000710" stroke-width="1.2232" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_1_30">
                            <rect width="22" height="22" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>

                <span className="text-lg text-center">
                        {`${Math.floor(timeLeft / 60)}:${Math.floor(timeLeft % 60).toString().padStart(2, '0')}`}
                    </span>
            </div>
            <div
                className={"flex flex-row items-center justify-between w-full max-w-3xl mt-4 border-opacity-50 font-light border border-primary p-4 rounded-2xl"}>
                <div className={"flex flex-col items-center"}>
                    <span className={"text-4xl font-semibold"}>13:30</span>
                    <span className={"text-xs"}>Tel Aviv</span>
                    <span className={"text-xs"}>(TLV)</span>
                </div>
                <hr
                    className={"border border-dashed w-full m-4  border-gray-400 "}
                />
                <div className={"flex flex-col items-center pt-6"}>
                    <img src={"Airplane.svg"} alt={"plane"}/>
                    <span className={"text-xs text-nowrap"}>12h 10 min</span>
                    <span className={"text-xs"}>Direct</span>
                </div>
                <hr
                    className={"border border-dashed w-full m-4 border-gray-400"}
                />
                <hr/>
                <div className={"flex flex-col items-center"}>
                    <span className={"text-4xl  font-semibold"}>2:40</span>
                    <span className={"text-xs"}>Las Vegas</span>
                    <span className={"text-xs"}>(LAS)</span>
                </div>
            </div>

            <div
                className={"flex flex-col items-center justify-center w-full max-w-3xl mt-4 border-opacity-50 font-light border border-primary p-4 rounded-2xl"}>
                <span className={"text-2xl font-normal"}>${((paidPeople * amount) / totalPeople).toFixed(2)} out of ${amount} paid</span>
                <div className="w-full bg-white rounded-full h-4 mt-4" style={{background: '#B1D5EB'}}>
                    <div
                        className="bg-primary h-4 rounded-full transition-all duration-500 ease-out"
                        style={{width: `${progress}%`}}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default Details;