"use client";

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { ReactTyped } from "react-typed";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import claimAirdrop from "@/contracts/info/claimAirdrop.json";
import "@/styles/Home.css";


const Home = () => {

    const [provider, setProvider] = useState(null);
    const [userClaimed, setUserClaimed] = useState(false);
    const [claimContract, setClaimContract] = useState(null);
    const [loading, setLoading] = useState(false);
    const { address, isConnected } = useAccount();

    useEffect(() => {
        const handleInitialize = async () => {
            if (isConnected) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                setProvider(provider);
                const tempClaimContract = new ethers.Contract(
                    claimAirdrop.address,
                    claimAirdrop.abi,
                    provider
                );
                setClaimContract(tempClaimContract);
                const isClaimed = await tempClaimContract.isClaimed(address);
                if (isClaimed) {
                    setUserClaimed(true);
                } else {
                    setUserClaimed(false);
                }
            }
        }
        handleInitialize();
    }, [isConnected]);

    const handleClaim = async () => {
        if (claimContract) {
            try {
                setLoading(true);
                const signer = await provider.getSigner();
                const tempClaimContract = claimContract.connect(signer);
                const tx = await tempClaimContract.claim();
                await tx.wait();
                setUserClaimed(true);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="container">
            <div className="connect">
                <ConnectButton showBalance={false} />
            </div>
            <ReactTyped
                strings={["CLAIM 1 $NULL TOKEN AIRDROP!"]}
                typeSpeed={70}
                showCursor={true}
                style={{
                    padding: "0 1rem",
                    textAlign: "center",
                    fontSize: "1.7rem",
                    fontWeight: "bold"
                }}
            />
            <button
                className={
                    isConnected && !userClaimed && !loading ?
                    "claim-btn" :
                    "claim-btn disabled-btn"
                }
                disabled={!isConnected || userClaimed || loading}
                onClick={handleClaim}
            >
                {
                    loading ? (
                        <div className="loading-spinner"></div>
                    ) : (
                        isConnected && !userClaimed ?
                        "Claim" :
                        !isConnected ?
                        "Connect Wallet" : "Claimed"
                    )
                }
            </button>
            <div className="note">
                <p>
                    NOTE: You need to have some SepoliaETH in your wallet to pay network fee.
                </p>
                <p>
                    Don't have SepoliaETH? You can get some&nbsp;
                    <a href="https://www.alchemy.com/faucets/ethereum-sepolia" target="_blank" rel="noreferrer">
                        here
                    </a>.
                </p>
            </div>
        </div>
    );
};


export default Home;