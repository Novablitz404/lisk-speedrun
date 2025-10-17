"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

export const NFTCollection = () => {
  const { address: connectedAddress } = useAccount();
  const [mintToAddress, setMintToAddress] = useState("");

  const { data: nftName } = useScaffoldContractRead({
    contractName: "MyNFT",
    functionName: "name",
  });

  const { data: nftSymbol } = useScaffoldContractRead({
    contractName: "MyNFT",
    functionName: "symbol",
  });

  const { data: totalSupply } = useScaffoldContractRead({
    contractName: "MyNFT",
    functionName: "totalSupply",
  });

  const { data: userBalance } = useScaffoldContractRead({
    contractName: "MyNFT",
    functionName: "balanceOf",
    args: [connectedAddress],
  });

  const { writeAsync: writeMyNFTAsync } = useScaffoldContractWrite({
    contractName: "MyNFT",
    functionName: "mint",
    args: [mintToAddress || connectedAddress],
  });

  const handleMint = async () => {
    const targetAddress = mintToAddress || connectedAddress;

    if (!targetAddress) {
      notification.error("Please connect wallet or specify address");
      return;
    }

    try {
      await writeMyNFTAsync({
        args: [targetAddress],
      });

      notification.success("NFT minted successfully!");
      setMintToAddress("");
    } catch (error) {
      console.error("Mint failed:", error);
      notification.error("Minting failed. Please try again.");
    }
  };

  if (!connectedAddress) {
    return (
      <div className="card w-full bg-gradient-to-br from-secondary/5 to-secondary/10 shadow-xl border border-secondary/20">
        <div className="card-body items-center text-center">
          <div className="badge badge-secondary badge-lg mb-2">ERC721</div>
          <h2 className="card-title text-2xl">NFT Collection</h2>
          <p className="text-base-content/60">Please connect your wallet to view and mint NFTs</p>
          <div className="mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-16 h-16 stroke-secondary/30"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card w-full bg-gradient-to-br from-secondary/5 to-secondary/10 shadow-xl border border-secondary/20 hover:shadow-2xl transition-all">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">
          <div className="badge badge-secondary badge-lg">ERC721</div>
          {nftName} ({nftSymbol})
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-base-100 rounded-xl p-4 shadow-inner text-center">
            <div className="text-xs text-base-content/60 mb-1">Total Minted</div>
            <div className="text-3xl font-bold text-secondary">{totalSupply?.toString() || "0"}</div>
          </div>
          <div className="bg-base-100 rounded-xl p-4 shadow-inner text-center">
            <div className="text-xs text-base-content/60 mb-1">You Own</div>
            <div className="text-3xl font-bold text-accent">{userBalance?.toString() || "0"}</div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Mint to address</span>
            <span className="label-text-alt text-xs">Optional</span>
          </label>
          <input
            type="text"
            placeholder="0x... (leave empty to mint to yourself)"
            className="input input-bordered w-full focus:input-secondary"
            value={mintToAddress}
            onChange={e => setMintToAddress(e.target.value)}
          />
          <label className="label">
            <span className="label-text-alt text-xs">Leave empty to mint to your own wallet</span>
          </label>
        </div>

        <div className="card-actions justify-end">
          <button className="btn btn-secondary btn-block" onClick={handleMint}>
            🎨 Mint NFT
          </button>
        </div>

        <div className="flex justify-between items-center text-xs">
          <span className="text-base-content/60">Your Wallet:</span>
          <Address address={connectedAddress} />
        </div>
      </div>
    </div>
  );
};
