import React from 'react';

const Header = ({ headerText, handleChangeText }) => {
    return (
        <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold text-gray-900">{headerText}</h1>
            </div>
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleChangeText}
                    className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
            </div>
        </div>
    );
};

export default Header;
