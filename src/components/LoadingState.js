import React from 'react';

const EmptyState = (props) => {
    return (
        <div className="flex flex-col justify-center items-center drop-shadow-lg mx-10 my-10">
            <h2 className='text-sm font-semibold leading-6 text-gray-900'>Fetching Messages...</h2>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">Please wait while we fetch all your messages</p>
        </div>
    )
};

export default EmptyState;