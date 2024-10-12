import React from 'react';

const BADGE_CONFIG = {
    low: {
        text: 'LOW',
        classes: 'inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10'
    },
    medium: {
        text: 'MEDIUM',
        classes: 'inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20'
    },
    high: {
        text: 'HIGH',
        classes: 'inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10'
    }
};

const PriorityBadge = (props) => {
    let priority = props?.priority;

    if (!(priority in BADGE_CONFIG)) {
        console.log(`PriorityBadeg~Error while rendering the badge for priority: ${priority}`);
        return null;
    }

    const details = BADGE_CONFIG[priority];

    return (
        <span className={details.classes}>{details.text}</span>
    )
};

export default PriorityBadge;