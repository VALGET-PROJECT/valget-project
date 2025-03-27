import { PublicKey } from "@solana/web3.js";

//presale program id
export const presaleProgramId = new PublicKey(
  "EjNWqnCgCWovuQscyJi558RYQHwBevqupWW6sxh2Mh4H"
);

//associate Program Id
export const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
);

//token
export const mint = new PublicKey(
  "9djyWjVWB7i9dDG7h1se9Qks4tnfiFJTA833WPzmmfDM" //mainnet
  // "9mij72iuy1w8k7Pt6fHqPzLxodH3sCKH9CvQXbihT4KW" //testnet
);
//usdt token
export const usdtMint = new PublicKey(
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"
  // "3go44AHHGYpHFkb51UvXu3zD1N8fzAjuQohjaCofpAnv" //testnet
);
export const usdcMint = new PublicKey(
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
  // "GqtuQ5MppuEbAL1j6eNZy3QEkZPWu1yv81cTae1fmsYY" //testnet
);
// chainlink price feed
export const chainlinkFeed = new PublicKey(
  // "99B2bTijsU6f1GCT73HmdR7HCFFjGMBcPZY6jZ96ynrR" // testnet
  "CH31Xns5z3M1cTAbKW34jcxPPciazARpijcHj9rxtemt" //mainnet
);
// chainlink program id
export const chainlinkProgram = new PublicKey(
  "HEvSKofvBgfaexv23kMabbYqxasxU3mQ4ibBMEmJWHny"
);
//Admin Publickey ;
export const adminPublickey = new PublicKey(
  "EQg4kBFsGyKa7mgVPSiyzLKxGZQCmUs8L3ziSPN2cbwt"
  // "CDQn1VpD1nAuK4C3svdR6ZKw5evWoLg5qLzPGScC7oYn"
  // "5dMg7H3ZGTc5x5KdP4ofrenvxb4vc3ASLixsF55BZM6s"
);
