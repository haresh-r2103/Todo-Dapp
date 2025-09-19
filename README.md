Todo-DApp Documentation
Overview
Todo-DApp is a decentralized application built with React that allows users to manage their todo list on the blockchain. It interacts with a smart contract deployed on the Ethereum blockchain to store and manage tasks in a decentralized manner.

Features
🔐 Connect your Ethereum wallet (MetaMask)

✅ Add new tasks to the blockchain

✔️ Mark tasks as completed

🗑️ Delete tasks

🔒 Secure and transparent task management

📱 Responsive design

Smart Contract Details
Contract Address: 0x9bbfe99a7aee8afbf559c12f1765f4284aa79046

Network: Ethereum Mainnet (or the network where you deployed your contract)

ABI: Available in the TodoList.js component

Project Structure
text
Todo-Dapp/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── App.js
│   ├── App.css
│   ├── ConnectWallet.js
│   ├── ConnectWallet.css
│   ├── TodoList.js
│   ├── TodoList.css
│   └── index.js
├── package.json
├── vercel.json
└── README.md
Setup Instructions
Prerequisites
Node.js (v14 or higher)

npm or yarn

MetaMask browser extension

Ethereum wallet with test ETH (for testnet deployment)

Installation
Clone the repository:

bash
git clone https://github.com/haresh-r2103/Todo-Dapp.git
cd Todo-Dapp
Install dependencies:

bash
npm install
Start the development server:

bash
npm start
Open http://localhost:5173 to view it in the browser.



Push your code to GitHub:

bash
git add .
git commit -m "Initial commit"
git push origin main
