"use client";

import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export const TokenBalance = () => {
  const { address: connectedAddress } = useAccount();

  const { data: tokenBalance } = useScaffoldContractRead({
    contractName: "MyToken",
    functionName: "balanceOf",
    args: [connectedAddress],
  });

  const { data: tokenSymbol } = useScaffoldContractRead({
    contractName: "MyToken",
    functionName: "symbol",
  });

  const { data: tokenName } = useScaffoldContractRead({
    contractName: "MyToken",
    functionName: "name",
  });

  if (!connectedAddress) {
    return (
      <div className="card w-full bg-gradient-to-br from-primary/5 to-primary/10 shadow-xl border border-primary/20">
        <div className="card-body items-center text-center">
          <div className="badge badge-primary badge-lg mb-2">ERC20</div>
          <h2 className="card-title text-2xl">Token Balance</h2>
          <p className="text-base-content/60">Please connect your wallet to view token balance</p>
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
                d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
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
          <div className="badge badge-primary badge-lg">ERC20</div>
          {tokenName}
        </h2>
        <div className="bg-base-100 rounded-xl p-6 shadow-inner">
          <div className="text-center">
            <div className="text-sm text-base-content/60 mb-2">Your Balance</div>
            <div className="text-4xl font-bold text-primary mb-1">
              {tokenBalance
                ? (Number(tokenBalance) / 1e18).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 4,
                  })
                : "0.0000"}
            </div>
            <div className="text-lg font-semibold text-base-content/70">{tokenSymbol}</div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-base-content/60">Wallet Address:</span>
          <Address address={connectedAddress} />
        </div>
      </div>
    </div>
  );
};
