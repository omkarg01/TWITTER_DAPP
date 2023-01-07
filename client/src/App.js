import './App.css';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Feed from './Feed';
import Widgets from './Widgets';

function App() {

    // state for currentAccount and correctNetwork
    const [currentAccount, setCurrentAccount] = useState("");
    const [correctNetwork, setCorrectNetwork] = useState(false);

    // call metamask to connect to the blockchain
    const connectToBlockchain = async () => {
        try {
            const { ethereum } = window

            if (!ethereum) {
                alert("Please install metamask");
                return;
            }

            let chainId = await ethereum.request({ method: 'eth_chainId' })
            console.log('Connected to chain:' + chainId)

            const goerliChainId = '0x5'

            if (chainId !== goerliChainId) {
                alert('You are not connected to the Goerli Testnet!')
                setCorrectNetwork(false);
                return
            } else {
                setCorrectNetwork(true);
            }


            // get the accounts from metamask
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

            // set the current account
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error)
        }
    }

    // call connectToBlockchain when the page loads
    useEffect(() => {
        connectToBlockchain();
    }, []);

    return (
        <div>
            {currentAccount === '' ? (
                <button
                    className='text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
                    onClick={connectToBlockchain}
                >
                    Connect Wallet
                </button>
            ) : correctNetwork ? (
                <div className="app">
                    <Sidebar />
                    <Feed />
                    <Widgets />
                </div>
            ) : (
                <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
                    <div>----------------------------------------</div>
                    <div>Please connect to the Rinkeby Testnet</div>
                    <div>and reload the page</div>
                    <div>----------------------------------------</div>
                </div>
            )}
        </div>
    );
}

export default App;
