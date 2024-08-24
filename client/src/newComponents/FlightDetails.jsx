import React from 'react';

function FlightDetails(props) {
    return (
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
    );
}

export default FlightDetails;