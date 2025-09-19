import React, { useState } from 'react'
import { ethers } from 'ethers'
import { useNavigate } from 'react-router-dom';
import './ConnectWallet.css';

const ConnectWallet = () => {
    const [account, setAccount] = useState(null);
    const [signer, setSigner] = useState(null);
    const [provider, setProvider] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const connectWallet = async() => {
        try {
            setLoading(true);
            if(typeof window.ethereum === 'undefined') {
                alert("MetaMask is not found!");
                return;
            }

            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // Provider
            const provider = new ethers.BrowserProvider(window.ethereum);
            setProvider(provider);

            // Get accounts
            const accounts = await provider.send("eth_requestAccounts", []);
            
            // Signer
            const signer = await provider.getSigner();
            setSigner(signer);

            setAccount(accounts[0]);
            localStorage.setItem("user", accounts[0]);
            
            navigate("/todo");

        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
            alert("Failed to connect wallet. Please try again.");
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="connect-wallet-container">
        <div className="connect-wallet-card">
            <div className="wallet-header">
                <h1>Welcome to Todo-DApp</h1>
                <p>Manage your tasks on the blockchain</p>
            </div>
            
            <div className="wallet-content">
                <div className="wallet-icon">
                    <svg viewBox="0 0 24 24" width="64" height="64" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                        <path d="M18 12a2 2 0 0 0 0 4h4v-4z"></path>
                    </svg>
                </div>
                
                <p className="wallet-description">
                    Connect your wallet to start managing your decentralized todo list. 
                    Your tasks will be stored securely on the blockchain.
                </p>
                
                <button 
                    onClick={connectWallet} 
                    disabled={loading}
                    className="connect-wallet-btn"
                >
                    {loading ? (
                        <>
                            <span className="spinner"></span>
                            Connecting...
                        </>
                    ) : (
                        <>
                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            Connect Wallet
                        </>
                    )}
                </button>
                
                {account && (
                    <div className="connected-account">
                        <span>Connected: {account.substring(0, 6)}...{account.substring(account.length - 4)}</span>
                    </div>
                )}
            </div>
            
            <div className="wallet-footer">
                <p>You'll need to have MetaMask installed to use this application</p>
            </div>
        </div>
    </div>
  )
}

export default ConnectWallet