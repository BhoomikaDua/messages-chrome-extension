/* global chrome */

import React, { useState } from 'react';
import PriorityBadge from "./PriorityBadge";

const MessageListItem = (props) => {
    const [read, setRead] = useState(props?.isMessageRead);

    let message = props?.message?.content,
        priority = props?.message?.priority,
        date = new Date(props?.message?.timestamp).toDateString(),
        id = props?.message?.id;

    const markAsRead = (id) => {
      chrome.storage.local.get(['messages', 'seenMessages'], (res) => {
        let seen = res.seenMessages || {};
        seen[id] = true;
        chrome.storage.local.set({ seenMessages: seen });
        setRead(true);

        let unseenMessageCount = res.messages.length - Object.keys(seen).length;
        if (unseenMessageCount) {
            chrome.action.setBadgeText({ text: unseenMessageCount.toString() });
            chrome.action.setBadgeBackgroundColor({ color: 'red' });
        } else {
            chrome.action.setBadgeText({ text: '' });
        }
      });
    };
      

    return (
        <div className={`flex justify-between items-center p-3 rounded-lg my-1 ${read ? 'bg-transparent' : 'bg-slate-50'}`}>
            <div className=' w-4/6'>
                <p className='text-sm font-semibold leading-6 text-gray-900'>
                    {message}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{date}</p>
                <PriorityBadge priority={priority} />
            </div>
            {
                !read && <div className='flex flex-col justify-between items-center'>
                    <button className='rounded-md bg-slate-800 py-1 px-2.5 border border-transparent text-center text-xs text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' onClick={() => markAsRead(id)}>Mark as Read</button>
                </div>
            }
        </div>
    )
};

export default MessageListItem;