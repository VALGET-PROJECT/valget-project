import {
  Box,
  Container,
  FormControl,
  Grid,
  Typography,
  Stack,
  useMediaQuery,
  LinearProgress,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useEffect, useState } from "react";
import sol from "../../assets/sol.png";
import usdt from "../../assets/usdt.png";
import usdc from "../../assets/usdc.png";
import logo from "../../assets/hlogo.png";
import bg from "../../assets/bg.jpg";
import { CustomizeInput } from "../CustomizeInput";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { motion } from "framer-motion";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import {
  findAssociatedTokenAccountPublicKey,
  formatAllocation,
  sendTransaction,
  usePresaleProgram,
} from "../utils/hooks";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import NotificationModal from "../NotificationModal/NotificationModal";
import {
  Connection,
  Keypair,
  PublicKey,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
  TransactionInstruction,
  clusterApiUrl,
} from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import Countdown from "react-countdown";
import {
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountIdempotentInstruction,
  getAccount,
  getAssociatedTokenAddressSync,
  getMint,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import BigOrangeButton from "../BigOrangeButton";
import { chainlinkFeed, chainlinkProgram, mint } from "../utils/constants";
import { ASSOCIATED_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { formatUnits, parseUnits } from "@ethersproject/units";
import Timer from "../Timer/Timer";
import moment from "moment";
import CopyToClipboard from "react-copy-to-clipboard";
const Presale = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes borderRotate {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);

    // Cleanup when component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const match = useMediaQuery("(max-width:900px)");
  const {
    publicKey,
    sendTransaction: sendWalletTx,
    signTransaction,
  } = useWallet();
  const wallet = useWallet();
  const [From, setFrom] = useState("");
  const [ToToken, setToToken] = useState("");
  const presaleProgram = usePresaleProgram();
  const [tokenTransfer, settokenTransfer] = useState("");
  const { connection } = useConnection();
  const [loading, setloading] = useState(false);
  const [refCopied, setrefCopied] = useState(false);
  const [notificationProps, setnotificationProps] = useState({
    error: "",
    message: "",
    modal: false,
  });
  const [presaleData, setpresaleData] = useState(undefined);
  const [userData, setuserData] = useState(undefined);
  const [anchorEl, setAnchorEl] = useState(null);
  const [tokenType, settokenType] = useState(1);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let getData = async () => {
    try {
      let [
        [presaleAccount],
        [presaleKeys],
        {
          data: { USD },
        },
      ] = await Promise.all([
        presaleProgram.account.presaleAccount.all(),
        presaleProgram.account.presaleKeys.all(),
        axios.get(
          "https://min-api.cryptocompare.com/data/price?fsym=SOL&tsyms=USD"
        ),
      ]);

      if (presaleAccount) {
        const [
          { decimals },
          { decimals: usdtDecimals },
          { decimals: usdcDecimals },
        ] = await Promise.all([
          getMint(connection, presaleKeys.account.mint),
          getMint(connection, presaleKeys.account.usdtMint),
          getMint(connection, presaleAccount.account.usdcMint),
        ]);
        let obtain = +formatUnits(
          presaleAccount?.account?.stages?.[
            Number(presaleAccount.account?.activeStage) > 4
              ? 4
              : Number(presaleAccount.account?.activeStage)
          ]?.soldTokens.toString(),
          decimals.toString()
        );
        let total = +formatUnits(
          presaleAccount?.account?.stages?.[
            Number(presaleAccount.account?.activeStage) > 4
              ? 4
              : Number(presaleAccount.account?.activeStage)
          ]?.allocation.toString(),
          decimals.toString()
        );

        let usdtRaised = +formatUnits(
          presaleAccount?.account?.usdtRaised.toString(),
          9
        );
        let usdcRaised = +formatUnits(
          presaleAccount?.account?.usdcRaised.toString(),
          9
        );
        let solRaised =
          +formatUnits(presaleAccount?.account?.solRaised.toString(), 9) * USD;

        let totalRaised = (usdtRaised + usdcRaised + solRaised).toFixed(2);
        let percentage = ((+obtain / total) * 100).toFixed(4);
        let remaining = total - obtain;

        setpresaleData({
          percentage,
          ...presaleAccount.account,
          ...presaleKeys.account,
          remaining: remaining,
          presaleAccount: presaleAccount.publicKey,
          presaleKeys: presaleKeys.publicKey,
          currentTokenPrice: (
            1 /
            Number(
              presaleAccount.account.stages[
                Number(presaleAccount.account?.activeStage) > 4
                  ? 4
                  : Number(presaleAccount.account?.activeStage)
              ].price
            )
          ).toFixed(3),
          allocation: remaining,
          // allocation: +formatUnits(
          //   presaleAccount.account.stages[
          //     Number(presaleAccount.account?.activeStage) > 4
          //       ? 4
          //       : Number(presaleAccount.account?.activeStage)
          //   ].allocation.toString(),
          //   decimals
          // ),
          bonus: Number(
            presaleAccount.account.stages[
              Number(presaleAccount.account?.activeStage) > 4
                ? 4
                : Number(presaleAccount.account?.activeStage)
            ].bonus
          ),
          nextTokenPrice:
            Number(presaleAccount.account?.activeStage + 1) > 4
              ? 0.01
              : (
                  1 /
                  Number(
                    presaleAccount.account.stages[
                      Number(presaleAccount.account?.activeStage + 1)
                    ]?.price
                  )
                ).toFixed(3),
          oneUsdPrice: Number(
            presaleAccount.account.stages[
              Number(presaleAccount.account?.activeStage) > 4
                ? 4
                : Number(presaleAccount.account?.activeStage)
            ].price
          ),
          totalRaised,
          oneSolPrice: USD,
        });
        if (publicKey) {
          let userAccounts = await presaleProgram.account.userAccount.all();
          let tokens = 0;
          console.log(userAccounts.length);
          userAccounts.map(({ account, publicKey }) => {
            tokens += +formatUnits(account.totalTokens.toString(), decimals);
            console.log(
              +formatUnits(account.totalTokens.toString(), decimals),
              account?.user.toString(),
              publicKey.toString(),
              "Tokens"
            );
          });
          console.log(tokens, "total tokens");
          userAccounts = userAccounts.find(({ account: { user } }) =>
            user.equals(publicKey)
          );
          if (userAccounts?.publicKey) {
            setuserData({
              userAccount: userAccounts.publicKey,
              ...userAccounts.account,
              totalTokens: (
                +formatUnits(
                  userAccounts.account.totalTokens.toString(),
                  decimals
                ) -
                +formatUnits(
                  userAccounts.account.claimedTokens.toString(),
                  decimals
                )
              ).toFixed(2),
            });
          }
        }
      }
    } catch (error) {
      console.log(error, "+++++++++++++");
    }
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const bebe_ref = searchParams.get("bebe_ref");
    console.log(bebe_ref, "called");
    if (bebe_ref) {
      localStorage.setItem("bebe_ref", bebe_ref);
      // const code = searchParams.get("code");
    }
    if (connection) {
      getData();
    }
  }, [connection, publicKey]);

  const buyHandler = async () => {
    try {
      if (!From || From <= 0 || isNaN(From)) {
        return setnotificationProps({
          ...notificationProps,
          modal: true,
          error: true,
          message: "Enter a valid value to buy.",
        });
      }

      if (ToToken > presaleData.remaining) {
        let fromAmount = 0;
        if (tokenType == 1) {
          fromAmount = presaleData.remaining / presaleData.oneUsdPrice;
          fromAmount = (fromAmount / presaleData.oneSolPrice).toFixed(4);
        } else {
          fromAmount = (
            presaleData.remaining / presaleData.oneUsdPrice
          ).toFixed(2);
        }
        setFrom(fromAmount);
        return setnotificationProps({
          ...notificationProps,
          modal: true,
          error: true,
          message: `You can only buy ${fromAmount} ${
            tokenType === 1 ? "SOL" : "USDT"
          } amount of bebe tokens in this stage.`,
        });
      }

      setloading(true);

      const userAccount = Keypair.generate();
      const {
        presaleAccount,
        owner,
        ownerUsdtAccount,
        ownerUsdcAccount,
        usdcMint,
        usdtMint,
        presaleKeys,
      } = presaleData;

      const [
        [presalePda, bump],
        { decimals: usdtDecimals },
        { decimals: usdcDecimals },
        { blockhash, lastValidBlockHeight },
      ] = await Promise.all([
        PublicKey.findProgramAddressSync(
          [Buffer.from(anchor.utils.bytes.utf8.encode("presale_authority"))],
          presaleProgram.programId
        ),
        getMint(connection, usdtMint),
        getMint(connection, usdcMint),
        connection.getLatestBlockhash("finalized"),
      ]);

      let instructions = [];
      const associateUsdtAccount = getAssociatedTokenAddressSync(
        usdtMint,
        publicKey
      );

      try {
        await getAccount(connection, associateUsdtAccount);
      } catch (error) {
        instructions.push(
          createAssociatedTokenAccountIdempotentInstruction(
            publicKey,
            associateUsdtAccount,
            publicKey,
            usdtMint
          )
        );
      }

      const associateUsdcAccount = getAssociatedTokenAddressSync(
        usdcMint,
        publicKey
      );

      try {
        await getAccount(connection, associateUsdcAccount);
      } catch (error) {
        instructions.push(
          createAssociatedTokenAccountIdempotentInstruction(
            publicKey,
            associateUsdcAccount,
            publicKey,
            usdcMint
          )
        );
      }

      let transaction;
      if (userData?.userAccount) {
        transaction = await presaleProgram.methods
          .existingBuy(
            new anchor.BN(+parseUnits(From, 9)),
            new anchor.BN(+tokenType),
            usdtDecimals,
            usdcDecimals
          )
          .accounts({
            userAccount: userData.userAccount,
            presalePda,
            chainlinkFeed,
            chainlinkProgram,
            presaleAccount,
            presaleKeys,
            ownerUsdtAccount,
            ownerUsdcAccount,
            userUsdtAccount: associateUsdtAccount,
            userUsdcAccount: associateUsdcAccount,
            owner,
            user: publicKey,
            rent: SYSVAR_RENT_PUBKEY,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          })
          .preInstructions(instructions)
          .transaction();
      } else {
        transaction = await presaleProgram.methods
          .buy(
            new anchor.BN(+parseUnits(From, 9)),
            new anchor.BN(+tokenType),
            usdtDecimals,
            usdcDecimals
          )
          .accounts({
            userAccount: userAccount.publicKey,
            presalePda,
            chainlinkFeed,
            chainlinkProgram,
            presaleAccount,
            presaleKeys,
            ownerUsdtAccount,
            ownerUsdcAccount,
            userUsdtAccount: associateUsdtAccount,
            userUsdcAccount: associateUsdcAccount,
            owner,
            user: publicKey,
            rent: SYSVAR_RENT_PUBKEY,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          })
          .preInstructions(instructions)
          .transaction();
      }
      transaction.recentBlockhash = blockhash;
      transaction.lastValidBlockHeight = lastValidBlockHeight;
      transaction.feePayer = publicKey;
      // Sign and send the transaction using the connected wallet
      const signedTransaction = await signTransaction(transaction);
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );

      // Confirm the transaction
      await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight,
      });

      setnotificationProps({
        modal: true,
        message: "Transaction Confirmed",
        error: false,
      });
      getData();
      setloading(false);
    } catch (error) {
      let mainMessage;
      console.log(
        error?.message ||
          error?.data?.message ||
          error?.response?.data?.data?.message ||
          error?.name,
        "error==>"
      );

      // Regex to extract the error message
      const regex = /Error Message: (.+)/;
      const errorMessage = error?.message || ""; // Extract the raw error message

      const match = regex.exec(errorMessage); // Match regex on error message
      if (match) {
        mainMessage = match[1]; // Extracted message from regex
      } else {
        // Fallback to nested error data or default name
        mainMessage =
          error?.message ||
          error?.data?.message ||
          error?.response?.data?.data?.message ||
          error?.name ||
          "An unknown error occurred.";
      }

      setnotificationProps({
        ...notificationProps,
        modal: true,
        error: true,
        message: mainMessage, // Set the extracted or fallback message
      });
      setloading(false);
    }
  };
  const claimHandler = async () => {
    try {
      if (
        Number(presaleData?.claimedTokens) >= Number(presaleData?.totalTokens)
      ) {
        return setnotificationProps({
          ...notificationProps,
          modal: true,
          error: true,
          message: "You dont have any token to claim.",
        });
      }

      setloading(true);
      let { presaleAccount, owner, presaleTokenVault, mint, presaleKeys } =
        presaleData;

      const [[presalePda, bump], { blockhash, lastValidBlockHeight }] =
        await Promise.all([
          PublicKey.findProgramAddressSync(
            [Buffer.from(anchor.utils.bytes.utf8.encode("presale_authority"))],
            presaleProgram.programId
          ),
          connection.getLatestBlockhash("finalized"),
        ]);
      let instructions = [];
      const associateMintAccount = getAssociatedTokenAddressSync(
        mint,
        publicKey
      );

      try {
        await getAccount(connection, associateMintAccount);
      } catch (error) {
        console.log(error);

        instructions.push(
          createAssociatedTokenAccountIdempotentInstruction(
            publicKey,
            associateMintAccount,
            publicKey,
            mint
          )
        );
      }

      let { userAccount } = userData;
      const transaction = await presaleProgram.methods
        .claim()
        .accounts({
          userAccount,
          presalePda,
          presaleAccount,
          presaleTokenVault,
          presaleKeys,
          userTokenAccount: associateMintAccount,
          owner,
          user: publicKey,
          rent: SYSVAR_RENT_PUBKEY,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .preInstructions(instructions)
        .signers([])
        .transaction();
      transaction.recentBlockhash = blockhash;
      transaction.lastValidBlockHeight = lastValidBlockHeight;
      transaction.feePayer = publicKey;
      // Sign and send the transaction using the connected wallet
      const signedTransaction = await signTransaction(transaction);
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );

      // Confirm the transaction
      await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight,
      });

      setnotificationProps({
        modal: true,
        message: "Transaction Confirmed",
        error: false,
      });
      getData();
      setloading(false);
    } catch (error) {
      let mainMessage;
      console.log(
        error?.message ||
          error?.data?.message ||
          error?.response?.data?.data?.message ||
          error?.name,
        "error==>"
      );

      // Regex to extract the error message
      const regex = /Error Message: (.+)/;
      const errorMessage = error?.message || ""; // Extract the raw error message

      const match = regex.exec(errorMessage); // Match regex on error message
      if (match) {
        mainMessage = match[1]; // Extracted message from regex
      } else {
        // Fallback to nested error data or default name
        mainMessage =
          error?.message ||
          error?.data?.message ||
          error?.response?.data?.data?.message ||
          error?.name ||
          "An unknown error occurred.";
      }

      setnotificationProps({
        ...notificationProps,
        modal: true,
        error: true,
        message: mainMessage, // Set the extracted or fallback message
      });
      setloading(false);
    }
  };
  useEffect(() => {
    if (From > 0 && presaleData?.oneUsdPrice) {
      if (tokenType === 1) {
        setToToken(
          (+presaleData.oneUsdPrice * +presaleData.oneSolPrice * +From).toFixed(
            2
          )
        );
      } else {
        setToToken((presaleData.oneUsdPrice * From).toFixed(2));
      }
    } else {
      setToToken("");
    }
  }, [From, tokenType]);

  const Data = [
    {
      label: "Price",
      price: `$${presaleData?.currentTokenPrice ?? 0}`,
    },
    {
      label: "Bonus",
      price: `${presaleData?.bonus ?? 0}% Extra Valget`,
    },
    {
      label: "Tokens Available",
      price: presaleData?.allocation
        ? formatAllocation(presaleData.allocation)
        : 0,
    },
    {
      label: "Duration",
      price: "1-15 Days",
    },
  ];

  const StepperType = [
    {
      text: "Early Bird",
    },
    {
      text: "Early Adopters",
    },
    {
      text: "Growing Momentum",
    },
    {
      text: "Raising Value",
    },
    {
      text: "Last Chance",
    },
  ];
  return (
    <>
      <NotificationModal
        notificationProps={notificationProps}
        setnotificationProps={setnotificationProps}
      />
      <Box
        sx={{
          backgroundImage: `url("/Shade.png")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 70%",
          backgroundColor: "#1A1A2E",
          height: "100%",
          paddingBottom: "30px",
        }}
      >
        <Container maxWidth="md">
          <Box textAlign="center" p={2}>
            <Typography
              variant="h1"
              fontFamily={"Sofia Sans"}
              sx={{
                fontWeight: "800",
                color: "white",
                fontSize: { md: "86px", xs: "50px" },
              }}
            >
              Presale
            </Typography>
            <Typography
              variant="h6"
              fontFamily={"DM Sans"}
              sx={{ color: "white", fontSize: { md: "20px", xs: "16px" } }}
            >
              Join the Valget Revolution Early. <br />
              Secure Your Tokens at Exclusive Presale Prices
            </Typography>
            <Typography
              fontFamily="Archivo"
              variant="h5"
              color="#ffff"
              mb={0}
              sx={{ mt: "30px" }}
            >
              This round ends in:
            </Typography>
            {presaleData?.stageEndTime ? (
              <Timer
                expiryTimestamp={
                  +moment.unix(Number(presaleData?.stageEndTime)).format("X")
                }
              />
            ) : (
              <Timer expiryTimestamp={+moment().format("X")} />
            )}
          </Box>
          <Box
            elevation={3}
            sx={{
              bgcolor: "#1A1A2E",
              borderRadius: "18px",
              p: { xs: 2, sm: 4 },
              textAlign: "center",
              border: "2px solid #636371",
            }}
          >
            {/* Settper Type  */}

            <Box
              sx={{
                display: { md: "flex", xs: "none" },
                justifyContent: "space-around",
                mb: "50px",
              }}
            >
              {StepperType.map((data, index) => (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      display: { md: "flex" },
                      justifyContent: "none",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        color: "white",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        fontFamily: "Sofia Sans",
                        alignItems: "center",
                        borderLeft:
                          index != +presaleData?.activeStage
                            ? "1px solid gray"
                            : null,
                        width: "30px",
                        height: "30px",
                        backgroundImage:
                          index <= presaleData?.activeStage
                            ? "linear-gradient(180deg, #0163ED 0%, #0163ED 74%)"
                            : "linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, #1A1A2E 74%)",
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Typography
                      sx={{
                        mt: "10px",
                        textAlign: "left",
                        color: "white",
                        fontSize: ".8em",
                        fontFamily: "Sofia Sans",
                      }}
                    >
                      {data.text}
                    </Typography>
                  </Box>
                  <Box
                    width={"90px"}
                    height={"3px"}
                    sx={{
                      backgroundColor:
                        index <= presaleData?.activeStage - 1
                          ? "#933FFE"
                          : "#5A5A5A",
                      position: "relative",
                      top: "-15px",
                      display: index == 4 ? "none" : "block",
                    }}
                  ></Box>
                </Box>
              ))}
            </Box>

            {Data.map((data, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    px: { md: "50px", xs: "0px" },
                    position: "relative",
                  }}
                >
                  <Typography
                    sx={{
                      p: 1,
                      color: "white",
                      fontFamily: "DM Sans",
                      fontSize: { md: "18px", xs: "15px" },
                      fontWeight: "400",
                    }}
                  >
                    {data.label}
                  </Typography>
                  <Typography
                    sx={{
                      position: "absolute",
                      right: {
                        md: "50px",
                        xs: "0px",
                        color: "white",
                        fontFamily: "DM Sans",
                        fontWeight: "600",
                        fontsize: { md: "20px", xs: "17px" },
                      },
                    }}
                  >
                    {data.price}
                  </Typography>
                </Box>
              );
            })}

            <Box
              display="flex"
              flexDirection={{ md: "row", xs: "column" }}
              alignItems={{ xs: "center" }}
              mt="40px"
              py="20px"
            >
              {/* Presale Stage */}
              <Typography
                fontFamily="Sofia Sans"
                color="#fff"
                sx={{
                  fontSize: { xs: "16px", sm: "18px", md: "20px" },
                  fontWeight: 600,
                  textAlign: { xs: "center", md: "left" },
                  width: "100%",
                }}
                variant="h6"
              >
                {" "}
                Presale Stage Early Bird{" "}
                {Math.min(Number(presaleData?.activeStage ?? 0) + 1, 5)}{" "}
              </Typography>

              {/* Raised Amount */}
              <Box
                display="flex"
                justifyContent={{ xs: "center", md: "end" }}
                width="100%"
                gap={1}
                pt={{ md: "0px", xs: "20px" }}
              >
                <Typography
                  fontFamily="Sofia Sans"
                  color="#fff"
                  sx={{
                    fontSize: { xs: "16px", sm: "18px", md: "20px" },
                    textAlign: { xs: "center", sm: "left" },
                  }}
                >
                  {" "}
                  RAISED:
                </Typography>
                <Typography
                  fontFamily="Sofia Sans"
                  color="#A442EF"
                  sx={{
                    fontSize: { xs: "16px", sm: "18px", md: "20px" },
                    ml: { xs: 0, sm: 1 },
                    textAlign: { xs: "center", sm: "left" },
                  }}
                >
                  ${presaleData?.totalRaised ?? 0.0}
                </Typography>
              </Box>
            </Box>

            <Box width="100%" mb={2}>
              <LinearProgress
                value={presaleData?.percentage ?? 0}
                variant="determinate"
                sx={{
                  height: 15,
                  width: "100%",
                  borderRadius: 5,
                  backgroundColor: "#D9D9D9", // Background of the track
                  "& .MuiLinearProgress-bar": {
                    background:
                      "linear-gradient(90.26deg, #FC51FE -40.05%, #A442EF 50.04%, #1629E0 95.72%)",
                    borderRadius: 5,
                  },
                }}
              />
            </Box>
            <Typography
              fontFamily="Sofia Sans"
              color="#ffff"
              sx={{ fontSize: { xs: "22px", md: "36px" }, fontWeight: 700 }}
            >
              1 ValGet = ${presaleData?.currentTokenPrice ?? 0.0}
            </Typography>

            <Box
              sx={{
                bgcolor: "transparent",
                borderRadius: "18px",
                px: { md: 1, xs: 0 },
                py: 1,
                textAlign: "left",
                mb: 2,
                mt: 5,
              }}
            >
              <Typography
                fontFamily="Sofia Sans"
                variant="h6"
                sx={{
                  fontSize: { xs: "13px", sm: "16px" },
                }}
                color="#fff"
                my={0}
                ml="5px"
              >
                You pay
              </Typography>
              <Box
                container
                sx={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <CustomizeInput
                    type="number"
                    placeholder="0"
                    value={From}
                    inputProps={{ min: 0 }}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFrom(e.target.value);
                      if (value > 0) {
                        console.log(presaleData?.tokenPrice);
                        const toValue = +value * +presaleData?.tokenPrice;
                        setToToken(toValue);
                      } else {
                        setToToken(0);
                      }
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    position: "absolute",
                    right: "10px",
                    background: "white",
                    borderRadius: "50px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Stack
                    alignItems="flex-end"
                    sx={{
                      background: "white",
                      borderRadius: "50%",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                      sx={{
                        bgcolor: "transparent",
                        borderRadius: "24px",
                        color: "black",
                        px: 1, // Reduced padding for a smaller button
                        fontSize: "14px", // Reduced font size for smaller text
                        fontWeight: "bold",
                        height: "30px", // Ensure the button height is consistent with the container
                        display: "flex",
                        alignItems: "center",
                        minWidth: "auto", // Remove any minimum width to make the button compact
                      }}
                      endIcon={<KeyboardArrowDownIcon color="black" />}
                      startIcon={
                        <img
                          src={
                            tokenType === 1
                              ? sol
                              : tokenType === 2
                              ? usdt
                              : usdc
                          }
                          width="25px"
                        /> // Reduced icon size for smaller button
                      }
                    >
                      {tokenType === 1
                        ? "SOL"
                        : tokenType === 2
                        ? "USDT"
                        : "USDC"}
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{ "aria-labelledby": "basic-button" }}
                      slotProps={{
                        paper: {
                          sx: {
                            bgcolor: "white", // Set the background color of the menu to white
                            borderRadius: "8px", // Optional: add border radius for a rounded look
                            boxShadow: 3, // Optional: add shadow for depth
                          },
                        },
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          settokenType(1);
                          handleClose();
                        }}
                        sx={{
                          background: "white", // Set the background color of the menu item to white
                          color: "#000", // Change text color to black for contrast
                          "&:hover": {
                            background: "#f1f1f1", // Change hover color for better UX
                          },
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={2}
                          justifyContent={{ xs: "center", sm: "flex-start" }}
                          width="150px"
                          alignItems="center"
                        >
                          <Box>
                            <img src={sol} width="25px" />{" "}
                            {/* Reduced icon size */}
                          </Box>
                          <Typography
                            fontFamily="Archivo"
                            variant="h6"
                            sx={{ fontSize: { xs: "13px", sm: "16px" } }}
                            color="#000" // Change text color to black
                            my={0}
                          >
                            SOL
                          </Typography>
                        </Stack>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          settokenType(2);
                          handleClose();
                        }}
                        sx={{
                          background: "white", // Set the background color of the menu item to white
                          color: "#000", // Change text color to black for contrast
                          "&:hover": {
                            background: "#f1f1f1", // Change hover color for better UX
                          },
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={2}
                          justifyContent={{ xs: "center", sm: "flex-start" }}
                          width="150px"
                          alignItems="center"
                        >
                          <Box>
                            <img src={usdt} width="25px" />{" "}
                            {/* Reduced icon size */}
                          </Box>
                          <Typography
                            fontFamily="Archivo"
                            variant="h6"
                            sx={{ fontSize: { xs: "13px", sm: "16px" } }}
                            color="#000" // Change text color to black
                            my={0}
                          >
                            USDT
                          </Typography>
                        </Stack>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          settokenType(3);
                          handleClose();
                        }}
                        sx={{
                          background: "white", // Set the background color of the menu item to white
                          color: "#000", // Change text color to black for contrast
                          "&:hover": {
                            background: "#f1f1f1", // Change hover color for better UX
                          },
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={2}
                          justifyContent={{ xs: "center", sm: "flex-start" }}
                          width="150px"
                          alignItems="center"
                        >
                          <Box>
                            <img src={usdc} width="25px" />{" "}
                            {/* Reduced icon size */}
                          </Box>
                          <Typography
                            fontFamily="Archivo"
                            variant="h6"
                            sx={{ fontSize: { xs: "13px", sm: "16px" } }}
                            color="#000" // Change text color to black
                            my={0}
                          >
                            USDC
                          </Typography>
                        </Stack>
                      </MenuItem>
                    </Menu>
                  </Stack>
                </Box>
              </Box>

              {/* {((tokenType === 2 && From < 15) ||
              (tokenType === 1 && From * presaleData?.oneSolPrice < 15)) &&
              From > 0 && (
                <Typography
                  fontFamily="Archivo"
                  variant="h5"
                  sx={{
                    fontSize: { xs: "15px", sm: "18px" },
                  }}
                  color="#E83C5B"
                  my={0}
                >
                  Minimum buy is $15
                </Typography>
              )} */}
            </Box>
            <Avatar
              src="/convert.png"
              alt=""
              sx={{
                margin: "auto",
                display: "block",
                marginTop: "20px",
                width: { md: 40, xs: 30 },
                height: { md: 40, xs: 30 },
              }}
            />
            <Box
              sx={{
                bgcolor: "transparent",
                borderRadius: "18px",
                px: { md: 1, xs: 0 },
                pb: { md: 1, xs: 0 },
                textAlign: "left",
                mb: 2,
                position: "relative",
              }}
            >
              <Typography
                fontFamily="Sofia Sans"
                variant="h6"
                sx={{ fontSize: { xs: "13px", sm: "16px" } }}
                color="#ffff"
                my={0}
                ml="5px"
              >
                {" "}
                You receive{" "}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  {" "}
                  <CustomizeInput
                    type="number"
                    placeholder="0"
                    inputProps={{ min: 0, readOnly: true }}
                    value={ToToken}
                  />{" "}
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    right: { md: "15px", xs: "9px" },
                  }}
                >
                  <Stack alignItems="flex-end">
                    <Button
                      id="basic-button"
                      sx={{
                        bgcolor: "#ffff",
                        borderRadius: "24px",
                        color: "#000000",
                        px: 2,
                        fontWeight: "bold",
                        height: "30px", // Set height to match previous size
                        minWidth: "60px", // Set width to match the previous size
                        display: "flex",
                        alignItems: "center",
                        "&:hover": {
                          bgcolor: "#CCCCCC",
                          cursor: "default",
                        },
                      }}
                      startIcon={<img src={logo} width="20px" />} // Adjusted logo width for compactness
                    >
                      ValGet
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </Box>

            <Stack>
              {publicKey ? (
                <BigOrangeButton
                  onClick={buyHandler}
                  loading={loading}
                  disabled={presaleData?.activeStage > 4}
                >
                  {presaleData?.activeStage < 5 ? "Buy Now" : "Presale Ended"}
                </BigOrangeButton>
              ) : (
                //   <WalletMultiButton
                //   style={{
                //     position: 'relative',
                //     textTransform: 'capitalize',
                //     backgroundImage: 'linear-gradient(135deg, #140ed6 0%, #f2295b 100%)',
                //     color: 'black',
                //     fontSize: '18px',
                //     fontWeight: 'bold',
                //     width: '100%',
                //     textAlign: 'center',
                //     justifyContent: 'center',
                //     fontFamily: 'Archivo',
                //     boxShadow: '0px 4px 19px rgba(0, 0, 0, 0.65)',
                //     padding: '10px',
                //     zIndex: '1', // Ensure button content stays above the rotating border
                //   }}
                // />

                <div className="wrapper">
                  <div className="a" style={{ width: "100%" }}>
                    <WalletMultiButton
                      style={{
                        position: "relative",
                        textTransform: "capitalize",
                        background: "#007BFF",
                        color: "White",
                        fontSize: { md: "18px", xs: "10px" },
                        fontWeight: "700",
                        height: "54px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        fontFamily: "Archivo",
                        boxShadow: " 0px 3px 12.1px 0px #B78CEF ",
                        // padding:"13px 80px",
                        zIndex: "1",
                        top: "7px",
                        borderRadius: "10px",
                      }}
                      fullWidth
                    />
                  </div>
                  <style>
                    {`
      .wrapper {
        display: flex;
        justify-content: center,
        align-items: center;
        width: 100%;
        // background-color: #f0f0f0; /* Add a light background for visibility */
      }

        .wallet-adapter-dropdown {
    position: relative;
    display: inline-block;
    width: 60%;
    top: -2px;
}
    `}
                  </style>
                </div>
              )}
            </Stack>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          background: "linear-gradient(180deg, #1A1A2E 80%, #3E165C 100%)",
          mt: "20px",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center", p: 2 }}>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Typography
              variant="h3"
              sx={{
                fontFamily: "Archivo",
                fontWeight: 600,
                color: "white",
                fontSize: { xs: "30px", sm: "40px" },
              }}
            >
              YOUR
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "30px", sm: "40px" },
                // fontSize: "36px", // Adjust font size as needed
                WebkitTextStrokeWidth: "1px", // Width of the text stroke
                WebkitTextStrokeColor: "rgba(255, 255, 255, 1)", // Color of the text stroke
                MozTextStrokeWidth: "1px",
                MozTextStrokeColor: "rgba(255, 255, 255, 1)",
                textStrokeWidth: "1px",
                textStrokeColor: "rgba(255, 255, 255, 1)",
                color: "transparent",
                fontFamily: "Archivo",
                fontWeight: 900,
              }}
            >
              BALANCE
            </Typography>
          </Stack>
          <Typography fontFamily="Archivo" variant="h4" color="#00FF99" my={3}>
            VALGET
          </Typography>
          <Box
            sx={{
              bgcolor: "#2B2B44",
              border: "1px solid #504c54",
              borderRadius: "18px",
              px: { xs: 2, sm: 4 },
              py: 2,
              textAlign: "center",
              mt: 2,
            }}
          >
            <Typography
              fontFamily="Archivo"
              variant="h3="
              color="#00FF99"
              my={3}
            >
              {userData?.totalTokens ?? 0.0}
            </Typography>
          </Box>
          <Typography fontFamily="Archivo" variant="h6" color="#9A999A" my={3}>
            {Number(presaleData?.vesting) === 1
              ? "Your tokens will be sent to your wallet once you have claimed."
              : "You will be able to claim your tokens once the presale has ended"}
          </Typography>
          {publicKey ? (
            <BigOrangeButton
              onClick={claimHandler}
              loading={loading}
              disabled={
                Number(userData?.totalTokens) === 0 ||
                Number(presaleData?.vesting) === 0
              }
            >
              {userData?.totalTokens > 0 && Number(presaleData?.vesting) === 1
                ? "Claim Tokens"
                : Number(userData?.totalTokens) === 0
                ? "Claimed"
                : "Claiming Not Started"}
            </BigOrangeButton>
          ) : (
            <WalletMultiButton
              style={{
                textTransform: "capitalize",
                backgroundColor: "#00FF99",
                color: "black",
                borderRadius: "47px",
                fontSize: "18px",
                fontWeight: "bold",
                width: "100%",
                textAlign: "center",
                justifyContent: "center",
                fontFamily: "Archivo",
                boxShadow: "0px 4px 19px rgba(0, 0, 0, 0.65)",
                "&:hover,&:disabled": {
                  backgroundColor: "#91EB4Aa1",
                },
              }}
            />
          )}
        </Container>
      </Box>
    </>
  );
};

export default Presale;
