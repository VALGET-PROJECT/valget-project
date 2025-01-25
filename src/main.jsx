import React, { useMemo } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import("@solana/wallet-adapter-react-ui/styles.css");
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  UnsafeBurnerWalletAdapter,
} from "@solana/wallet-adapter-wallets";

const endpoint =
  // "https://rpc.shyft.to?api_key=FuUIqFNPQQ7OfcCj";
  "https://devnet-rpc.shyft.to?api_key=FuUIqFNPQQ7OfcCj";

const AppWrapper = () => {
  const network = WalletAdapterNetwork.Devnet; // Adjust the network as needed

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <App />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
