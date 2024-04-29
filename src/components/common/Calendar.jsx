"use client"
import React, { useState } from 'react';

function Calendar({ numberOfSeats, setNumberOfSeats }) {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [selectedDate, setSelectedDate] = useState(null);

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const generateCalendar = (year, month) => {
        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfWeek = firstDayOfMonth.getDay();
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        let calendar = [];

        // Create headers for the days of the week
        daysOfWeek.forEach((day) => {
            calendar.push(
                <div key={`header-${day}`} className="text-center font-semibold">
                    {day}
                </div>
            );
        });

        // Create empty boxes for days before the first day of the month
        for (let i = 0; i < firstDayOfWeek; i++) {
            calendar.push(<div key={`empty-${i}`}></div>);
        }

        // Create boxes for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date();
            const isCurrentDate = year === currentDate.getFullYear() && month === currentDate.getMonth() && day === currentDate.getDate();
            const date = new Date(year, month, day);

            calendar.push(
                <div
                    key={`day-${day}`}
                    className={`relative text-center py-2 border cursor-pointer ${isCurrentDate ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => handleDayClick(day)}
                >
                    {day} <span className='absolute text-xs text-green p-[0px] pt-[18px] ml-[-6px] sm:p-2'>
                        {!!numberOfSeats?.[date.toUTCString()] && numberOfSeats[date.toUTCString()]}
                    </span>
                </div>
            );
        }

        return calendar;
    };

    const showModal = (date) => {
        setSelectedDate(date);
        const modal = document.getElementById('myModal');
        modal.classList.remove('hidden');
    };

    const hideModal = () => {
        const modal = document.getElementById('myModal');
        modal.classList.add('hidden');
    };

    const handlePrevMonth = () => {
        setCurrentMonth((prevMonth) => {
            if (prevMonth === 0) {
                setCurrentYear((prevYear) => prevYear - 1);
                return 11;
            } else {
                return prevMonth - 1;
            }
        });
    };

    const handleNextMonth = () => {
        setCurrentMonth((prevMonth) => {
            if (prevMonth === 11) {
                setCurrentYear((prevYear) => prevYear + 1);
                return 0;
            } else {
                return prevMonth + 1;
            }
        });
    };

    const handleDayClick = (day) => {
        const selectedDate = new Date(currentYear, currentMonth, day);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = selectedDate.toLocaleDateString(undefined, options);
        showModal(formattedDate);
    };

    const handleSeatChange = (event) => {
        setNumberOfSeats({
            ...numberOfSeats,
            [new Date(selectedDate).toUTCString()]: parseInt(event.target.value)
        });
    };

    const handleSeatSubmit = () => {
        // Handle seat submission logic here
        console.log(`Seats allotted for ${selectedDate}: ${JSON.stringify(numberOfSeats)}`);
        hideModal();
    };

    return (
        <div className=" flex items-center justify-center mt-10">
            <div className="lg:w-7/12 md:w-9/12 sm:w-10/12 mx-auto p-4">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-3 bg-gray-700">
                        <button onClick={handlePrevMonth} className="text-white">Previous</button>
                        <h2 className="text-white">{`${monthNames[currentMonth]} ${currentYear}`}</h2>
                        <button onClick={handleNextMonth} className="text-white">Next</button>
                    </div>
                    <div className="grid grid-cols-7 gap-2 p-4" id="calendar">
                        {generateCalendar(currentYear, currentMonth)}
                    </div>
                    <div id="myModal" className="modal hidden fixed inset-0 flex items-center justify-center z-50">
                        <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>

                        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                            <div className="modal-content py-4 text-left px-6">
                                <div className="flex justify-between items-center pb-3">
                                    <p className="text-2xl font-bold">Allot seats for</p>
                                    <button onClick={hideModal} className="modal-close px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring">✕</button>
                                </div>
                                <p className="text-xl font-semibold">{selectedDate}</p>
                                <input
                                    type="number"
                                    value={numberOfSeats[new Date(selectedDate).toUTCString()] || ''}
                                    onChange={handleSeatChange}
                                    className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                    placeholder="Enter number of seats"
                                />
                                <button onClick={handleSeatSubmit} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calendar;
