"use client";

import { useState } from "react";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

export const TokenTransfer = () => {
  const { address: connectedAddress } = useAccount();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const { writeAsync: writeMyTokenAsync } = useScaffoldContractWrite({
    contractName: "MyToken",
    functionName: "transfer",
    args: [recipient, parseEther(amount || "0")],
  });

  const handleTransfer = async () => {
    if (!recipient || !amount) {
      notification.error("Please fill in all fields");
      return;
    }

    try {
      await writeMyTokenAsync({
        args: [recipient, parseEther(amount)],
      });

      notification.success("Token transfer successful!");
      setRecipient("");
      setAmount("");
    } catch (error) {
      console.error("Transfer failed:", error);
      notification.error("Transfer failed. Please try again.");
    }
  };

  if (!connectedAddress) {
    return (
      <div className="card w-full bg-gradient-to-br from-primary/5 to-primary/10 shadow-xl border border-primary/20">
        <div className="card-body items-center text-center">
          <div className="badge badge-primary badge-lg mb-2">Send</div>
          <h2 className="card-title text-2xl">Transfer Tokens</h2>
          <p className="text-base-content/60">Please connect your wallet to transfer tokens</p>
          <div className="mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-16 h-16 stroke-primary/30"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card w-full bg-gradient-to-br from-primary/5 to-primary/10 shadow-xl border border-primary/20 hover:shadow-2xl transition-all">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">
          <div className="badge badge-primary badge-lg">Send</div>
          Transfer Tokens
        </h2>

        <div className="space-y-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Recipient Address</span>
              <span className="label-text-alt text-xs">Required</span>
            </label>
            <input
              type="text"
              placeholder="0x... Enter wallet address"
              className="input input-bordered w-full focus:input-primary"
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Amount (LSEA)</span>
              <span className="label-text-alt text-xs">Required</span>
            </label>
            <input
              type="number"
              placeholder="0.0"
              className="input input-bordered w-full focus:input-primary"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              step="0.0001"
              min="0"
            />
          </div>
        </div>

        <div className="divider"></div>

        <div className="card-actions justify-end">
          <button className="btn btn-primary btn-block" onClick={handleTransfer} disabled={!recipient || !amount}>
            {!recipient || !amount ? "Fill in all fields" : "Transfer Tokens"}
          </button>
        </div>
      </div>
    </div>
  );
};
