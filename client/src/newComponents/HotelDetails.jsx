import React from 'react';

function FlightDetails(props) {
    return (
        <div
            className={"flex flex-row items-center justify-between w-full max-w-3xl mt-4 border-opacity-50 font-light border border-primary p-4 rounded-2xl"}>
            <div className={"flex flex-row items-center space-x-4"}>
                <img src={"hotel_room.png"} className={"rounded-2xl"} alt={"hotel image"} width={100} height={100}/>
                <div className={"flex flex-col "}>
                    <span className={" text-2xl"}>Your Hotel</span>
                    <div className={"text-sm flex-col flex lg:flex-row"}>
                        <span>Two Standard Rooms</span>
                        <span>・</span>
                        <span>Four Adults</span>
                        <span>・</span>
                        <span>19-29 December</span>
                    </div>
                </div>
            </div>


            <img
                className={"hidden sm:block"}
                src={"group_of_people.svg"} alt={"group of people"}/>
        </div>
    );
}

export default FlightDetails;