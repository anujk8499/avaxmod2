import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import anujWalletAbi from "../artifacts/contracts/Assessment.sol/VotingSystem.json";

export default function HomePage() {
  const [anujWallet, setAnujWallet] = useState(undefined);
  const [anujAccount, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);

  const voterAdd = useRef();
  const voterDeregisterRef = useRef();
  const voteCandidate = useRef();

  const contractAddress = "0x00C406D49D4822088061E051E9852D3Cb7Fd7b1F";
  const atmABI = anujWalletAbi.abi;

  const getWalletAddress = async () => {
    if (window.ethereum) {
      setAnujWallet(window.ethereum);
    }

    if (anujWallet) {
      try {
        const accounts = await anujWallet.request({ method: "eth_accounts" });
        accoundHandler(accounts);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const accoundHandler = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No anujAccount found");
    }
  };

  const connectToMetamask = async () => {
    if (!anujWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await anujWallet.request({
      method: "eth_requestAccounts",
    });
    accoundHandler(accounts);
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(anujWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const registerVoter = async (addr) => {
    try {
      if (atm) {
        let tx = await atm.registerVoter(addr);
        await tx.wait();
        alert("voting rights granted");
      }
    } catch (error) {
      console.log("SOMETHING WENT WRONG");
      console.log(error);
    }
  };

  const deRegisterVoter = async (address) => {
    try {
      if (atm) {
        let tx = await atm.revokeVoter(address);
        await tx.wait();
        alert("permission revoked");
      }
    } catch (error) {
      console.log("SOMETHING WENT WRONG");
      console.log(error);
    }
  };

  const vote = async (candidate_name) => {
    try {
      if (atm) {
        let tx = await atm.vote(candidate_name);
        await tx.wait();
        alert(`${candidate_name}'s vote increased by 1`);
      }
    } catch (error) {
      console.log("SOMETHING WENT WRONG");
      console.log(error);
    }
  };

  useEffect(() => {
    getWalletAddress();
  }, []);
  return (
    <main className="container">
      <header>
        <h1>Module 2 Voting System</h1>
      </header>
      <div className="content">
        {!anujAccount ? (
          <button onClick={connectToMetamask}>Start Voting System</button>
        ) : (
          <>
            <div className="div">
              <h2>Only for Owner</h2>
              <div className="btn-group">
                <input ref={voterAdd} type="text" placeholder="Address" />
                <button
                  onClick={() => {
                    registerVoter(voterAdd.current.value);
                  }}
                >
                  Give Voting Access
                </button>
              </div>
              <div className="btn-group">
                <input
                  ref={voterDeregisterRef}
                  type="text"
                  placeholder="Address"
                />
                <button
                  onClick={() => {
                    deRegisterVoter(voterDeregisterRef.current.value);
                  }}
                >
                  Revoke Voting Access
                </button>
              </div>
              <h2>For Users</h2>
              <div className="btn-group">
                <input
                  ref={voteCandidate}
                  type="text"
                  placeholder="enter name of candidate"
                />
                <button
                  onClick={() => {
                    vote(voterDeregisterRef.current.value);
                  }}
                >
                  vote
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f4f4f4;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        header {
          margin-bottom: 20px;
          text-align: center;
        }

        h1 {
          font-size: 2rem;
          color: #333;
          font-weight: bolder;
        }

        .content {
          width: 100%;
          max-width: 600px;
          padding: 20px;
          display: flex;
          justify-content: center;
          font-size: 1.25rem;
        }

        .div {
          margin-bottom: 1.5em;
        }

        h2 {
          font-size: 1.75rem;
          color: #333;
          margin-bottom: 1em;
        }

        .btn-group {
          display: flex;
          width: 100%;
          align-items: center;
          margin-top: 1.5em;
        }

        input {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 28em;
          box-sizing: border-box;
        }

        button {
          padding: 7px 20px;
          cursor: pointer;
          border: none;
          border-radius: 4px;
          background-color: #007bff;
          color: #fff;
          font-size: 16px;
          transition: background-color 0.3s;
          margin-left: 0.75em;
        }

        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </main>
  );
}
