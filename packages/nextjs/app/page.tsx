"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { CurrencyDollarIcon, PhotoIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { NFTCollection, TokenBalance, TokenTransfer } from "~~/components/example-ui";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col flex-grow">
        {/* Hero Section */}
        <div className="w-full bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-16 px-5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <SparklesIcon className="h-8 w-8 text-primary" />
                <h1 className="text-5xl font-bold text-white">Lisk DApp Interface</h1>
                <SparklesIcon className="h-8 w-8 text-secondary" />
              </div>
              <p className="text-xl text-base-content/70 mb-6">
                Interact with your ERC20 tokens and ERC721 NFTs on Lisk Sepolia
              </p>
              {connectedAddress ? (
                <div className="flex justify-center">
                  <div className="badge badge-lg badge-primary gap-2 py-4 px-6">
                    <span className="font-semibold">Connected:</span>
                    <Address address={connectedAddress} />
                  </div>
                </div>
              ) : (
                <div className="alert alert-warning max-w-md mx-auto shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>Please connect your wallet to get started</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full bg-base-200/50 py-8 px-5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-4 bg-base-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <CurrencyDollarIcon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">ERC20 Tokens</h3>
                  <p className="text-sm text-base-content/60">Transfer LSEA tokens instantly</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-base-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="bg-secondary/10 p-3 rounded-lg">
                  <PhotoIcon className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">ERC721 NFTs</h3>
                  <p className="text-sm text-base-content/60">Mint unique digital collectibles</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-base-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <SparklesIcon className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Real-time Updates</h3>
                  <p className="text-sm text-base-content/60">Live blockchain synchronization</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="w-full bg-base-100 py-12 px-5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Your Dashboard</h2>

            {/* Token Section */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <CurrencyDollarIcon className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold">Token Management</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TokenBalance />
                <TokenTransfer />
              </div>
            </div>

            {/* NFT Section */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <PhotoIcon className="h-6 w-6 text-secondary" />
                <h3 className="text-2xl font-bold">NFT Collection</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <NFTCollection />
                {/* Info Card */}
                <div className="card bg-gradient-to-br from-secondary/10 to-accent/10 shadow-xl border border-secondary/20">
                  <div className="card-body">
                    <h2 className="card-title text-2xl mb-4">
                      <PhotoIcon className="h-6 w-6" />
                      Lisk Builder Badge
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="badge badge-secondary">NFT</div>
                        <div>
                          <p className="font-semibold">ERC721 Collection</p>
                          <p className="text-sm text-base-content/70">Unique digital badges for Lisk builders</p>
                        </div>
                      </div>
                      <div className="divider"></div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-base-content/70">Contract</span>
                          <span className="font-mono text-xs">0x5A88...8d99</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-base-content/70">Network</span>
                          <span className="badge badge-sm">Lisk Sepolia</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-base-content/70">Symbol</span>
                          <span className="font-bold">LBB</span>
                        </div>
                      </div>
                      <div className="alert alert-info">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="stroke-current shrink-0 w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <span className="text-sm">
                          Mint NFTs for free on the testnet. Each NFT is unique and owned by you!
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contract Info */}
            <div className="bg-base-200 rounded-2xl p-8 border border-base-300">
              <h3 className="text-xl font-bold mb-6 text-center">Deployed Contracts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-base-100 rounded-xl p-6 shadow-md">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <CurrencyDollarIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">MyToken (LSEA)</h4>
                      <p className="text-sm text-base-content/60">Lisk SEA Token</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-base-content/70">Type:</span>
                      <span className="badge badge-primary badge-sm">ERC20</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-content/70">Supply:</span>
                      <span className="font-semibold">1,000,000 LSEA</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-base-content/70">Contract:</span>
                      <code className="text-xs bg-base-200 px-2 py-1 rounded">0xc071...2C89</code>
                    </div>
                  </div>
                </div>
                <div className="bg-base-100 rounded-xl p-6 shadow-md">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-secondary/10 p-2 rounded-lg">
                      <PhotoIcon className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">MyNFT (LBB)</h4>
                      <p className="text-sm text-base-content/60">Lisk Builder Badge</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-base-content/70">Type:</span>
                      <span className="badge badge-secondary badge-sm">ERC721</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-content/70">Minting:</span>
                      <span className="font-semibold">Open</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-base-content/70">Contract:</span>
                      <code className="text-xs bg-base-200 px-2 py-1 rounded">0x5A88...8d99</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
