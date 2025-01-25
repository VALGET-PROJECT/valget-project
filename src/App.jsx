import "./App.css";
import React from "react";
import Presale from "./components/PresaleSwap/Presale";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { adminPublickey, mint } from "./components/utils/constants";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import OwnerPrevilege from "./components/OwnerPrevilege/OwnerPrevilege";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import Header from "./components/header/Header";
import HowToBuy from "./components/HowToBuy/HowToBuy";
import Footer from "./components/Footer/footer";
import Navbar from "./components/Navbar/navbar";

function App() {
  const [adminState, setadminState] = useState(false);
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  useEffect(() => {
    if (connection && publicKey) {
      let admin = publicKey.equals(adminPublickey);
      if (admin) {
        setadminState(true);
      } else {
        setadminState(false);
      }
    }
  }, [publicKey, connection]);

  return (
    <>
      {/* <Header /> */}
      <Navbar/>
      <Presale />
      {adminState && <OwnerPrevilege />}
      {/* <HowToBuy /> */}
      <Footer/>
    </>
  );
}

export default App;
