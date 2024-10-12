/* global chrome */

const messagesURL = 'https://453974f5-a53b-4777-b592-93e73524dd86.mock.pstmn.io/messages';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ messages: [], seenMessages: {} });
  });

chrome.alarms.create('fetchMessages', { periodInMinutes: 0.1 });

chrome.alarms.onAlarm.addListener(() => {
  fetch(messagesURL)
    .then(response => response.json())
    .then(data => {
      chrome.storage.local.get('seenMessages', (res) => {
        
        let seen = res.seenMessages || {};
        data.messages.forEach((message) => {
            if (message.read) {
                seen[message?.id] = true
            }
        });
        chrome.storage.local.set({ messages: data.messages, seenMessages: seen });

        let unseenMessageCount = data.messages.length - Object.keys(seen).length;
        if (unseenMessageCount) {
            chrome.action.setBadgeText({ text: unseenMessageCount.toString() });
            chrome.action.setBadgeBackgroundColor({ color: 'red' });
        } else {
            chrome.action.setBadgeText({ text: '' });
        }

        chrome.runtime.sendMessage({ type: 'UPDATE_MESSAGES' });
      });
    });
});
