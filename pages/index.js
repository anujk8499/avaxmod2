import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import anujWalletAbi from "../artifacts/contracts/Assessment.sol/AnujKumarWallet.json";

export default function HomePage() {
  const [anujWallet, setRahulWallet] = useState(undefined);
  const [anujAccount, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [secretBalance, setSecretBalance] = useState(undefined);
  const [hideContractAddress, setHideContractAddress] = useState(false);
  const [val, setVal] = useState("show password");
  const [val1, setVal1] = useState("show password");

  const depositRef = useRef();
  const withdrawRef = useRef();

  const depositSecret = useRef();
  const withdrawSecret = useRef();

  const [buyNFT, setbuyNFT] = useState("");

  const contractAddress = "0x10D4431Fde93e57E67f55f8fac14C76Bee447A87";
  const atmABI = anujWalletAbi.abi;

  const getWalletAddress = async () => {
    if (window.ethereum) {
      setRahulWallet(window.ethereum);
    }

    if (anujWallet) {
      try {
        const acc = await anujWallet.request({ method: "eth_accounts" });
        accHandler(acc);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const accHandler = (acc) => {
    if (acc && acc.length > 0) {
      console.log("Account connected: ", acc[0]);
      setAccount(acc[0]);
    } else {
      console.log("No anujAccount found");
    }
  };

  const connToMetamask = async () => {
    if (!anujWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const acc = await anujWallet.request({
      method: "eth_requestAccounts",
    });
    accHandler(acc);

    getatmContract();
  };

  const getatmContract = () => {
    const provider = new ethers.providers.Web3Provider(anujWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      try {
        const currentBal = await atm.getBalance();
        console.log(currentBal);

        setSecretBalance(currentBal.toNumber());
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const depositToken = async () => {
    const amt = Number(depositRef.current.value);
    const secret = Number(depositSecret.current.value);
    console.log(amt, secret);

    if (amt === 0) {
      alert("amount should be more than 0");
      return;
    }

    try {
      if (atm) {
        let tx = await atm.DepositToken(amt, secret);
        await tx.wait();
        getBalance();
        depositRef.current.value = 0;
        depositSecret.current.value = 0;
      }
    } catch (error) {
      alert("ACTION REJECTED");
    }
  };

  const withdrawToken = async () => {
    const amt = Number(withdrawRef.current.value);
    const secret = Number(withdrawSecret.current.value);

    if (amt === 0) {
      alert("amount should be more than 0");
      return;
    }

    console.log(amt, secret);

    try {
      if (atm) {
        let tx = await atm.WithdrawToken(amt, secret);
        await tx.wait();
        getBalance();
      }
    } catch (error) {
      alert("ACTION REJECTED");
      console.log(error);
    }
  };

  const purchaseNFT = async () => {
    try {
      if (atm) {
        let tx = await atm.purchaseNFT(1);
        await tx.wait();
        getBalance();
      }
    } catch (error) {
      alert("ACTION REJECTED");
    }
  };

  const toggleContractAddress = () => {
    setHideContractAddress(
      (prevShowContractAddress) => !prevShowContractAddress
    );
  };

  useEffect(() => {
    getWalletAddress();
  }, []);

  useEffect(() => {
    if (atm) {
      getBalance();
    }
  }, [atm]);

  return (
    <main className="container">
      <div className="content">
        {!anujAccount ? (
          <button onClick={connToMetamask}>
            Click to connect your MetaMask wallet
          </button>
        ) : (
          <>
            <header>
              <h2>Frontend project</h2>
            </header>
            <div className="button-group">
              <div className="btn-input">
                <button onClick={toggleContractAddress}>
                  {hideContractAddress
                    ? "Hide Contract Address"
                    : "Show Contract Address"}
                </button>
                {hideContractAddress && (
                  <div>
                    <p
                      style={{
                        color: "white",
                        fontWeight: 700,
                        fontSize: "1.5rem",
                      }}
                    >
                      Contract Address: {contractAddress}
                    </p>
                  </div>
                )}
              </div>
              <div className="btn-input">
                <button onClick={depositToken}>Deposit Token</button>
                <div>
                  <input
                    ref={depositRef}
                    type="number"
                    placeholder="Amount"
                  ></input>
                </div>
                <div>
                  <input
                    ref={depositSecret}
                    type="password"
                    placeholder="Secret Key"
                  ></input>
                  <button
                    onClick={() => {
                      let type;
                      depositSecret.current?.type === "text"
                        ? (type = "password")
                        : (type = "text");
                      depositSecret.current.type = type;
                      setVal1(
                        type === "password" ? "show password" : "hide password"
                      );
                    }}
                  >
                    {val1}
                  </button>
                </div>
              </div>
              <hr />

              <div className="btn-input">
                <button onClick={withdrawToken}>Withdraw Token</button>
                <div>
                  <input
                    ref={withdrawRef}
                    type="number"
                    placeholder="Amount"
                  ></input>
                </div>
                <div>
                  <input
                    ref={withdrawSecret}
                    type="password"
                    placeholder="Secret Key"
                  ></input>
                  <button
                    onClick={() => {
                      let type;
                      withdrawSecret.current?.type === "text"
                        ? (type = "password")
                        : (type = "text");
                      withdrawSecret.current.type = type;
                      setVal(
                        type === "password" ? "show password" : "hide password"
                      );
                    }}
                  >
                    {val}
                  </button>
                </div>
              </div>

              <hr />

              <div className="btn-input">
                <button onClick={purchaseNFT}>Buy NFT</button>
              </div>
            </div>
          </>
        )}
      </div>
      <style jsx>{`
        body,
        * {
          margin: 0;
          padding: 0;
          font-family: "Roboto", sans-serif; /* Updated font */
        }

        main {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          justify-content: center;
          background: linear-gradient(
            to right,
            #4caf50,
            #64b5f6
          ); /* Updated background colors */
          color: #fff;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .btn-input {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin-bottom: 1em;
        }

        .btn-input > div {
          display: flex;
        }

        input {
          padding: 10px 20px;
          font-size: 16px;
          background-color: #fff; /* White background color */
          color: #333;
          border: 1px solid #4caf50; /* Updated border color */
          border-radius: 5px;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: background 0.2s, transform 0.2s;
          margin: 0.4em;
        }

        .container {
          text-align: center;
          padding: 2em;
          font-family: "Roboto", sans-serif; /* Updated font */
          background: linear-gradient(
            to bottom,
            #e1bee7,
            #ba68c8
          ); /* Updated background colors */
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          color: #333;
        }

        header {
          margin-bottom: 0.5em;
          font-size: 36px;
          color: #4caf50;
        }

        .content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          padding: 20px;
          border-radius: 8px;
        }

        .button-group {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        button {
          display: block;
          padding: 10px 20px;
          font-size: 16px;
          background: linear-gradient(to right, #ff5722, #ffc107);
          color: #fff;
          border: 1px solid #ff5722;
          font-weight: bold;
          cursor: pointer;
          width: 20vw;
          border-radius: 5px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, background 0.2s;
        }

        button:hover {
          transform: scale(1.05);
          background: linear-gradient(
            to right,
            #ff9800,
            #ffeb3b
          ); /* Updated hover colors */
        }
      `}</style>
    </main>
  );
}
