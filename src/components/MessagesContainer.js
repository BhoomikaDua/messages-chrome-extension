/* global chrome */

import React, { useEffect, useState } from 'react'
import MessageListItem from './MessageListItem'
import EmptyState from './EmptyState';
import LoadingState from './LoadingState'

const MessagesContainer = () => {
    const [messages, setMessages] = useState([]);
    const [seenMessages, setSeenMessages] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Listener for messages from background script
      const handleMessage = (message) => {
        if (message.type === 'UPDATE_MESSAGES') {
            chrome.storage.local.get(['messages', 'seenMessages'], (result) => {
              setMessages(result.messages || []);
              setSeenMessages(result.seenMessages || {});
              console.log('aaaaa')
              setLoading(false);
            });
        }
      };

      chrome.runtime.onMessage.addListener(handleMessage);

      // Cleanup the listener on component unmount
      return () => {
        chrome.runtime.onMessage.removeListener(handleMessage);
      };
    }, []);


    useEffect(() => {
      
    }, []);

    if (loading) {
        return <LoadingState />
    }

    if (!messages.length) {
        return <EmptyState />
    }

    return (
        <>
            <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight my-4 text-center">Messages</h2>
            <ul>
                {
                    messages.map((message) => {
                        let isMessageRead = message?.id in seenMessages;
                        return <MessageListItem message={message} isMessageRead={isMessageRead}/>;
                    })
                }
            </ul>
        </>
    )
};

export default MessagesContainer;