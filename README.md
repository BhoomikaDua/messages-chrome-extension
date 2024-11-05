# Introduction

This Chrome extension enables organization-wide communication by displaying messages from an admin to users. Developed to showcase frontend development skills and understanding of browser extension architecture, this project ensures users stay informed with real-time notifications.


## Features
* Badge Icon: Displays unread messages count/badge.
* Popup UI: Shows messages when the extension icon is clicked.
* Mark as Read: Users can mark messages as read.
* Local Storage: Stores message history locally for persistence.
* Periodic Sync: Background script checks for new messages periodically.

## Setup

#### Mock Server
* Create a free [Postman](http://www.postman.com/ "Postman") account
* Import `Fetch Admin Messages.postman_collection.json` into a Postman collection
* Create a mock server based on this collection following these steps: [Link](https://learning.postman.com/docs/designing-and-developing-your-api/mocking-data/setting-up-mock/#create-a-mock-server-from-a-collection "Create a mock server")
* After mock is created, a url will be given - use it in background.js as `messagesURL`


#### App
* Clone this repository
* Set `messagesURL` as per the mock we created using postman mock server
* run `npm install`
* run `npm run build`
* While loading the unpacked extension use `build` folder - [Link](https://knowledge.workspace.google.com/kb/load-unpacked-extensions-000005962)

  
![image](https://github.com/user-attachments/assets/f2162e35-48ed-4097-814a-dd00d7395459)
