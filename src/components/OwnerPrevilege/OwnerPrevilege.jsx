import {
  Box,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Button,
  Typography,
  useMediaQuery,
  Stack,
  Menu,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as anchor from "@project-serum/anchor";
import sol from "../../assets/sol.png";
import bebe from "../../assets/hlogo.png";
import { CustomizeInput } from "../CustomizeInput";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import BigOrangeButton from "../BigOrangeButton";
import {
  Keypair,
  PublicKey,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { mint, usdcMint, usdtMint } from "../utils/constants";
import {
  findAssociatedTokenAccountPublicKey,
  formatAllocation,
  sendTransaction,
  usePresaleProgram,
} from "../utils/hooks";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountIdempotentInstruction,
  getAccount,
  getMint,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { formatUnits, parseUnits } from "@ethersproject/units";
import NotificationModal from "../NotificationModal/NotificationModal";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import moment from "moment";
import { JSON } from "mysql/lib/protocol/constants/types";

const OwnerPrevilege = () => {
  const match = useMediaQuery("(max-width:900px)");
  const [currency, setCurrency] = useState("Binance");
  const { publicKey, sendTransaction: sendWalletTx } = useWallet();
  const wallet = useWallet();
  const [tokenPrice, settokenPrice] = useState("");
  const presaleProgram = usePresaleProgram();
  const [tokenTransfer, settokenTransfer] = useState("");
  const [tokenBack, settokenBack] = useState("");
  const { connection } = useConnection();
  const [loading, setloading] = useState(false);
  const [activeStage, setactiveStage] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [notificationProps, setnotificationProps] = useState({
    error: "",
    message: "",
    modal: false,
  });
  const [presaleData, setpresaleData] = useState(undefined);
  const [stageEndTime, setstageEndTime] = useState("");

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };
  let getData = async () => {
    try {
      let [presaleAccount] = await presaleProgram.account.presaleAccount.all();
      let [presaleKeys] = await presaleProgram.account.presaleKeys.all();
      let presaleKeysData = {};
      if (presaleKeys) {
        const [
          { amount },
          { decimals },
          { decimals: usdtDecimals },
          { decimals: usdcDecimals },
        ] = await Promise.all([
          getAccount(connection, presaleKeys.account.presaleTokenVault),
          getMint(connection, presaleKeys.account.mint),
          getMint(connection, presaleKeys.account.usdtMint),
          getMint(connection, presaleAccount.account.usdcMint),
        ]);
        presaleKeysData = {
          ...presaleKeys.account,
          presaleTokenVaultBalance: formatUnits(amount, decimals.toString()),
          decimals,
          usdcDecimals,
          usdtDecimals,
          presaleKeys: presaleKeys.publicKey,
        };
      }
      if (presaleAccount) {
        setstageEndTime(
          moment
            .unix(Number(presaleAccount.account.stageEndTime))
            .format("YYYY-MM-DDTHH:mm")
        );
        setactiveStage(Number(presaleAccount.account.activeStage));
        setpresaleData({
          ...presaleAccount.account,
          ...presaleKeysData,
          presaleAccount: presaleAccount.publicKey,
        });
      }
    } catch (error) {
      console.log(error, "+++++++++++++");
    }
  };
  useEffect(() => {
    if (connection && publicKey) {
      getData();
    }
  }, [publicKey, connection]);
  const initializeHandler = async () => {
    try {
      setloading(true);
      // let owner = new PublicKey("F7FVuNSN4g1Sbz7k1swtTaj6y5UH3c3brQnShj8fyesH");
      const presaleAccount = Keypair.generate();
      const [{ decimals }, { blockhash, lastValidBlockHeight }] =
        await Promise.all([
          getMint(connection, mint),
          connection.getLatestBlockhash("finalized"),
        ]);
      const associateUsdcAccount = getAssociatedTokenAddressSync(
        usdcMint,
        publicKey
      );
      let instructions = [];
      try {
        await getAccount(connection, associateUsdcAccount);
      } catch (error) {
        console.log(error);

        instructions.push(
          createAssociatedTokenAccountIdempotentInstruction(
            publicKey,
            associateUsdcAccount,
            publicKey,
            usdcMint
          )
        );
      }
      const tx1 = await presaleProgram.methods
        .initializePresale(
          [
            {
              price: new anchor.BN(200),
              allocation: new anchor.BN(40000000),
              bonus: new anchor.BN(5),
              sold_tokens: new anchor.BN(0),
              sol_raised: new anchor.BN(0),
              usdt_raised: new anchor.BN(0),
              usdc_raised: new anchor.BN(0),
            },
            {
              price: new anchor.BN(166),
              allocation: new anchor.BN(40000000),
              bonus: new anchor.BN(5),
              sold_tokens: new anchor.BN(0),
              sol_raised: new anchor.BN(0),
              usdt_raised: new anchor.BN(0),
              usdc_raised: new anchor.BN(0),
            },
            {
              price: new anchor.BN(142),
              allocation: new anchor.BN(40000000),
              bonus: new anchor.BN(5),
              sold_tokens: new anchor.BN(0),
              sol_raised: new anchor.BN(0),
              usdt_raised: new anchor.BN(0),
              usdc_raised: new anchor.BN(0),
            },
            {
              price: new anchor.BN(125),
              allocation: new anchor.BN(40000000),
              bonus: new anchor.BN(0),
              sold_tokens: new anchor.BN(0),
              sol_raised: new anchor.BN(0),
              usdt_raised: new anchor.BN(0),
              usdc_raised: new anchor.BN(0),
            },
            {
              price: new anchor.BN(111),
              allocation: new anchor.BN(40000000),
              bonus: new anchor.BN(0),
              sold_tokens: new anchor.BN(0),
              sol_raised: new anchor.BN(0),
              usdt_raised: new anchor.BN(0),
              usdc_raised: new anchor.BN(0),
            },
          ],
          decimals
        )
        .accounts({
          presaleAccount: presaleAccount.publicKey,
          ownerUsdcAccount: associateUsdcAccount,
          admin: publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          usdcMint,
          rent: SYSVAR_RENT_PUBKEY,
          systemProgram: SystemProgram.programId,
        })
        .preInstructions(instructions)
        .signers([presaleAccount])
        .transaction();

      tx1.recentBlockhash = blockhash;
      tx1.lastValidBlockHeight = lastValidBlockHeight;
      tx1.feePayer = publicKey;

      const sign = await sendWalletTx(tx1, connection, {
        signers: [presaleAccount],
      });
      await connection.confirmTransaction({
        signature: sign,
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
      setloading(false);
      let mainMessage;
      console.log(error, "error==>");
      const regex = /Error Message: (.+?)\.\.$/;
      const match = regex.exec(error);

      if (match) {
        mainMessage = match[1];
      } else {
        mainMessage =
          error?.message ||
          error?.data?.message ||
          error?.response?.data?.data?.message ||
          error?.name;
      }
      setnotificationProps({
        ...notificationProps,
        modal: true,
        error: true,
        message: mainMessage,
      });
    }
  };
  const initializeKeysHandler = async () => {
    try {
      setloading(true);

      const presaleTokenVault = Keypair.generate();
      const presaleKeysAccount = Keypair.generate();
      // cont mintInfo=new Mint
      const [[presalePda, bump], { blockhash, lastValidBlockHeight }] =
        await Promise.all([
          PublicKey.findProgramAddressSync(
            [Buffer.from(anchor.utils.bytes.utf8.encode("presale_authority"))],
            presaleProgram.programId
          ),
          connection.getLatestBlockhash("confirmed"),
        ]);
      const associateUsdtAccount = getAssociatedTokenAddressSync(
        usdtMint,
        publicKey
      );

      console.log(associateUsdtAccount.toString());

      const instructions = [];
      try {
        await getAccount(connection, associateUsdtAccount);
      } catch (error) {
        console.log(error);

        instructions.push(
          createAssociatedTokenAccountIdempotentInstruction(
            publicKey,
            associateUsdtAccount,
            publicKey,
            usdtMint
          )
        );
      }

      const tx1 = await presaleProgram.methods
        .initializePresaleKeys(bump)
        .accounts({
          presaleKeys: presaleKeysAccount.publicKey,
          presalePda,
          presaleTokenVault: presaleTokenVault.publicKey,
          ownerUsdtAccount: associateUsdtAccount,
          owner: publicKey,
          // admin: publicKey,
          mint,
          usdtMint,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
          systemProgram: SystemProgram.programId,
        })
        .preInstructions(instructions)
        .signers([presaleKeysAccount, presaleTokenVault])
        .transaction();

      tx1.recentBlockhash = blockhash;
      tx1.lastValidBlockHeight = lastValidBlockHeight;
      tx1.feePayer = publicKey;
      // transactions.add(tx1, tx2);
      // console.log(transactions, "tx");
      const sign = await sendWalletTx(tx1, connection, {
        signers: [presaleKeysAccount, presaleTokenVault],
      });
      await connection.confirmTransaction({
        signature: sign,
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
      setloading(false);
      let mainMessage;
      console.log(error, "error==>");
      const regex = /Error Message: (.+?)\.\.$/;
      const match = regex.exec(error);

      if (match) {
        mainMessage = match[1];
      } else {
        mainMessage =
          error?.message ||
          error?.data?.message ||
          error?.response?.data?.data?.message ||
          error?.name;
      }
      setnotificationProps({
        ...notificationProps,
        modal: true,
        error: true,
        message: mainMessage,
      });
    }
  };
  const changeVestingHandler = async (state) => {
    try {
      setloading(true);
      let { presaleAccount, presaleKeys } = presaleData;
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash("confirmed");
      const tx = await presaleProgram.methods
        .changeVesting(new anchor.BN(state))
        .accounts({
          presaleAccount: presaleAccount,
          presaleKeys: presaleKeys,
          owner: publicKey,
        })
        .signers([])
        .transaction();
      tx.recentBlockhash = blockhash;
      tx.lastValidBlockHeight = lastValidBlockHeight;
      tx.feePayer = publicKey;
      const sign = await sendWalletTx(tx, connection, {
        signers: [],
      });
      await connection.confirmTransaction({
        signature: sign,
        blockhash,
        lastValidBlockHeight,
      });
      getData();
      setnotificationProps({
        modal: true,
        message: "Transaction Confirmed",
        error: false,
      });

      setloading(false);
    } catch (error) {
      let mainMessage;
      console.log(error, "error==>");
      const regex = /Error Message: (.+?)\.\.$/;
      const match = regex.exec(error);

      if (match) {
        mainMessage = match[1];
      } else {
        mainMessage =
          error?.message ||
          error?.data?.message ||
          error?.response?.data?.data?.message ||
          error?.name;
      }
      setnotificationProps({
        ...notificationProps,
        modal: true,
        error: true,
        message: mainMessage,
      });
      setloading(false);
    }
  };
  const deletePresaleHandler = async (state) => {
    try {
      setloading(true);
      let { presaleAccount } = presaleData;
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash("confirmed");
      const tx = await presaleProgram.methods
        .deletePresale()
        .accounts({
          presaleAccount: presaleAccount,
          admin: publicKey,
        })
        .signers([])
        .transaction();
      tx.recentBlockhash = blockhash;
      tx.lastValidBlockHeight = lastValidBlockHeight;
      tx.feePayer = publicKey;
      const sign = await sendWalletTx(tx, connection, {
        signers: [],
      });
      await connection.confirmTransaction({
        signature: sign,
        blockhash,
        lastValidBlockHeight,
      });
      getData();
      setnotificationProps({
        modal: true,
        message: "Transaction Confirmed",
        error: false,
      });

      setloading(false);
    } catch (error) {
      let mainMessage;
      console.log(error, "error==>");
      const regex = /Error Message: (.+?)\.\.$/;
      const match = regex.exec(error);

      if (match) {
        mainMessage = match[1];
      } else {
        mainMessage =
          error?.message ||
          error?.data?.message ||
          error?.response?.data?.data?.message ||
          error?.name;
      }
      setnotificationProps({
        ...notificationProps,
        modal: true,
        error: true,
        message: mainMessage,
      });
      setloading(false);
    }
  };
  const changeActiveStageHandler = async () => {
    try {
      setloading(true);
      if (!stageEndTime) {
        return setnotificationProps({
          ...notificationProps,
          modal: true,
          error: true,
          message: "Enter a valid value of stage end time.",
        });
      }
      let { presaleAccount, presaleKeys } = presaleData;
      let endTime = moment(stageEndTime).format("X");
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash("confirmed");
      const tx = await presaleProgram.methods
        .changeStage(new anchor.BN(activeStage), new anchor.BN(endTime))
        .accounts({
          presaleAccount: presaleAccount,
          owner: publicKey,
          presaleKeys,
        })
        .signers([])
        .transaction();
      tx.recentBlockhash = blockhash;
      tx.lastValidBlockHeight = lastValidBlockHeight;
      tx.feePayer = publicKey;
      const sign = await sendWalletTx(tx, connection, {
        signers: [],
      });
      await connection.confirmTransaction({
        signature: sign,
        blockhash,
        lastValidBlockHeight,
      });
      getData();
      setnotificationProps({
        modal: true,
        message: "Transaction Confirmed",
        error: false,
      });

      setloading(false);
    } catch (error) {
      let mainMessage;
      console.log(error, "error==>");
      const regex = /Error Message: (.+?)\.\.$/;
      const match = regex.exec(error);

      if (match) {
        mainMessage = match[1];
      } else {
        mainMessage =
          error?.message ||
          error?.data?.message ||
          error?.response?.data?.data?.message ||
          error?.name;
      }
      setnotificationProps({
        ...notificationProps,
        modal: true,
        error: true,
        message: mainMessage,
      });
      setloading(false);
    }
  };
  const transferHandler = async () => {
    try {
      if (!tokenTransfer || tokenTransfer <= 0 || isNaN(tokenTransfer)) {
        return setnotificationProps({
          ...notificationProps,
          modal: true,
          error: true,
          message: "Enter a valid token transfer value.",
        });
      }
      setloading(true);
      let { presaleAccount, presaleTokenVault, presaleKeys } = presaleData;
      console.log(presaleData, "presaleData");
      // cont mintInfo=new Mint
      let associateAccount;
      const [
        [presalePda, bump],
        { decimals },
        { blockhash, lastValidBlockHeight },
      ] = await Promise.all([
        PublicKey.findProgramAddressSync(
          [Buffer.from(anchor.utils.bytes.utf8.encode("presale_authority"))],
          presaleProgram.programId
        ),
        getMint(connection, mint),

        connection.getLatestBlockhash("confirmed"),
      ]);
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
      const tx = await presaleProgram.methods
        .transferToken(new anchor.BN(tokenTransfer), new anchor.BN(decimals))
        .accounts({
          presaleAccount: presaleAccount,
          presaleTokenVault: presaleTokenVault,
          mint,
          presaleKeys,
          ownerTokenAccount: associateMintAccount,
          presalePda,
          owner: publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
          systemProgram: SystemProgram.programId,
        })
        .signers([])
        .transaction();
      tx.recentBlockhash = blockhash;
      tx.lastValidBlockHeight = lastValidBlockHeight;
      tx.feePayer = publicKey;
      const sign = await sendWalletTx(tx, connection, {
        signers: [],
      });
      await connection.confirmTransaction({
        signature: sign,
        blockhash,
        lastValidBlockHeight,
      });
      getData();
      setnotificationProps({
        modal: true,
        message: "Transaction Confirmed",
        error: false,
      });

      setloading(false);
    } catch (error) {
      let mainMessage;
      console.log(error, "error==>");
      const regex = /Error Message: (.+?)\.\.$/;
      const match = regex.exec(error);

      if (match) {
        mainMessage = match[1];
      } else {
        mainMessage =
          error?.message ||
          error?.data?.message ||
          error?.response?.data?.data?.message ||
          error?.name;
      }
      setnotificationProps({
        ...notificationProps,
        modal: true,
        error: true,
        message: mainMessage,
      });
      setloading(false);
    }
  };
  const transferBackHandler = async () => {
    try {
      if (!tokenBack || tokenBack <= 0 || isNaN(tokenBack)) {
        return setnotificationProps({
          ...notificationProps,
          modal: true,
          error: true,
          message: "Enter a valid token transfer value.",
        });
      }
      setloading(true);
      let { presaleAccount, presaleTokenVault, presaleKeys } = presaleData;
      console.log(presaleData, "presaleData");
      // cont mintInfo=new Mint
      let associateAccount;
      const [
        [presalePda, bump],
        { decimals },
        { blockhash, lastValidBlockHeight },
      ] = await Promise.all([
        PublicKey.findProgramAddressSync(
          [Buffer.from(anchor.utils.bytes.utf8.encode("presale_authority"))],
          presaleProgram.programId
        ),
        getMint(connection, mint),

        connection.getLatestBlockhash("confirmed"),
      ]);
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
      const tx = await presaleProgram.methods
        .transferBackToken(new anchor.BN(tokenBack), new anchor.BN(decimals))
        .accounts({
          presaleAccount: presaleAccount,
          presaleTokenVault: presaleTokenVault,
          mint,
          presaleKeys,
          ownerTokenAccount: associateMintAccount,
          presalePda,
          owner: publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
          systemProgram: SystemProgram.programId,
        })
        .signers([])
        .transaction();
      tx.recentBlockhash = blockhash;
      tx.lastValidBlockHeight = lastValidBlockHeight;
      tx.feePayer = publicKey;
      const sign = await sendWalletTx(tx, connection, {
        signers: [],
      });
      await connection.confirmTransaction({
        signature: sign,
        blockhash,
        lastValidBlockHeight,
      });
      getData();
      setnotificationProps({
        modal: true,
        message: "Transaction Confirmed",
        error: false,
      });

      setloading(false);
    } catch (error) {
      let mainMessage;
      console.log(error, "error==>");
      const regex = /Error Message: (.+?)\.\.$/;
      const match = regex.exec(error);

      if (match) {
        mainMessage = match[1];
      } else {
        mainMessage =
          error?.message ||
          error?.data?.message ||
          error?.response?.data?.data?.message ||
          error?.name;
      }
      setnotificationProps({
        ...notificationProps,
        modal: true,
        error: true,
        message: mainMessage,
      });
      setloading(false);
    }
  };
  console.log(presaleData);
  const stages = [
    "Stage 1",
    "Stage 2",
    "Stage 3",
    "Stage 4",
    "Stage 5",
    "Stage 6",
    "Stage 7",
    "Stage 8",
    "Stage 9",
    "Stage 10",
    "Stage 11",
    "Stage 12",
    "Stage 13",
    "Stage 14",
    "Stage 15",
    "End Presale",
  ];
  return (
    <>
      <NotificationModal
        notificationProps={notificationProps}
        setnotificationProps={setnotificationProps}
      />
      <Box
        sx={{
          py: 3,
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              bgcolor: "#171518",
              border: "1px solid #504c54",
              borderRadius: "18px",
              p: { xs: 2, sm: 4 },
              textAlign: "center",
            }}
          >
            <Box>
              <Typography variant="h4" textAlign="center" color="#ffff" mb={2}>
                Admin Panel
              </Typography>
            </Box>

            <Grid
              container
              spacing={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" color="#fff">
                  Initialize Presale
                </Typography>
                <Stack direction="row" justifyContent="center">
                  <BigOrangeButton
                    loading={loading}
                    onClick={initializeHandler}
                    disabled={presaleData?.presaleAccount || loading}
                  >
                    {presaleData?.presaleAccount
                      ? "Already Initilized"
                      : "Initialize Presale"}
                  </BigOrangeButton>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" color="#fff">
                  Set Owner Accounts
                </Typography>
                <Stack direction="row" justifyContent="center">
                  <BigOrangeButton
                    loading={loading}
                    onClick={initializeKeysHandler}
                    disabled={presaleData?.presaleKeys || loading}
                  >
                    {presaleData?.presaleKeys
                      ? "Already Set"
                      : "Set Owner Accounts"}
                  </BigOrangeButton>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="h6" color="#fff">
                  Enable Claiming
                </Typography>
                <Stack direction="row" justifyContent="center">
                  <BigOrangeButton
                    loading={loading}
                    onClick={() =>
                      changeVestingHandler(
                        Number(presaleData?.vesting) == 1 ? 0 : 1
                      )
                    }
                    disabled={loading}
                  >
                    {Number(presaleData?.vesting) == 1
                      ? "Disable Claiming"
                      : "Enable Claiming"}
                  </BigOrangeButton>
                </Stack>
              </Grid>
            </Grid>
            <Typography variant="h6" color="#fff">
              Send tokens to presale token vault
            </Typography>
            <Typography variant="h6" color="#fff">
              Presale token vault Balance:{" "}
              {presaleData?.presaleTokenVaultBalance ?? 0.0} VALGET
            </Typography>
            <Grid
              container
              spacing={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item xs={12}>
                <Box
                  sx={{
                    bgcolor: "#050505",
                    border: "1px solid #504c54",
                    borderRadius: "18px",
                    px: 1,
                    py: 1,
                    textAlign: "left",
                    mb: 2,
                  }}
                >
                  <Typography
                    fontFamily="Archivo"
                    variant="h6"
                    sx={{
                      fontSize: { xs: "13px", sm: "16px" },
                    }}
                    color="#9A999A"
                    my={0}
                  >
                    Send VALGET to presale token vault
                  </Typography>
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Grid item xs={6} sm={8}>
                      <CustomizeInput
                        type="number"
                        placeholder="1"
                        inputProps={{
                          min: 0,
                        }}
                        onChange={(e) => settokenTransfer(e.target.value)}
                        value={tokenTransfer}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Stack alignItems="flex-end">
                        <Button
                          id="basic-button"
                          sx={{
                            bgcolor: "#212024",
                            borderRadius: "24px",
                            color: "white",
                            px: 2,
                            fontWeight: "bold",
                          }}
                          startIcon={<img src={bebe} width="35px" />}
                        >
                          VALGET
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="center">
                  <BigOrangeButton onClick={transferHandler} loading={loading}>
                    Transfer Tokens
                  </BigOrangeButton>
                </Stack>
              </Grid>
            </Grid>
            <Typography variant="h6" color="#fff">
              Claim tokens from presale token vault
            </Typography>
            <Typography variant="h6" color="#fff">
              Presale token vault Balance:{" "}
              {presaleData?.presaleTokenVaultBalance ?? 0.0} VALGET
            </Typography>
            <Grid
              container
              spacing={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item xs={12}>
                <Box
                  sx={{
                    bgcolor: "#050505",
                    border: "1px solid #504c54",
                    borderRadius: "18px",
                    px: 1,
                    py: 1,
                    textAlign: "left",
                    mb: 2,
                  }}
                >
                  <Typography
                    fontFamily="Archivo"
                    variant="h6"
                    sx={{
                      fontSize: { xs: "13px", sm: "16px" },
                    }}
                    color="#9A999A"
                    my={0}
                  >
                    Claim VALGET from presale token vault
                  </Typography>
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Grid item xs={6} sm={8}>
                      <CustomizeInput
                        type="number"
                        placeholder="1"
                        inputProps={{
                          min: 0,
                        }}
                        onChange={(e) => settokenBack(e.target.value)}
                        value={tokenBack}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Stack alignItems="flex-end">
                        <Button
                          id="basic-button"
                          sx={{
                            bgcolor: "#212024",
                            borderRadius: "24px",
                            color: "white",
                            px: 2,
                            fontWeight: "bold",
                          }}
                          startIcon={<img src={bebe} width="35px" />}
                        >
                          VALGET
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="center">
                  <BigOrangeButton
                    onClick={transferBackHandler}
                    loading={loading}
                  >
                    Claim Back Tokens
                  </BigOrangeButton>
                </Stack>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 3,
              }}
            >
              <Grid item xs={12}>
                <Box
                  sx={{
                    bgcolor: "#050505",
                    border: "1px solid #504c54",
                    borderRadius: "18px",
                    px: 1,
                    py: 1,
                    textAlign: "left",
                    mb: 2,
                  }}
                >
                  <Typography
                    fontFamily="Archivo"
                    variant="h6"
                    sx={{
                      fontSize: { xs: "13px", sm: "16px" },
                    }}
                    color="#9A999A"
                    my={0}
                  >
                    Modify Stages
                  </Typography>
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Grid item xs={6} sm={8}>
                      <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        sx={{
                          bgcolor: "#212024",
                          borderRadius: "24px",
                          color: "white",
                          px: 2,
                          fontWeight: "bold",
                        }}
                        endIcon={<KeyboardArrowDownIcon />}
                      >
                        {stages[activeStage]}
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                        slotProps={{
                          paper: {
                            sx: {
                              bgcolor: "#212024",
                            },
                          },
                        }}
                      >
                        <MenuItem
                          onClick={() => {
                            setactiveStage(0);
                            handleClose();
                          }}
                        >
                          <Typography
                            fontFamily="Archivo"
                            variant="h6"
                            sx={{
                              fontSize: { xs: "13px", sm: "16px" },
                            }}
                            color="#9A999A"
                            my={0}
                          >
                            Stage 1
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setactiveStage(1);
                            handleClose();
                          }}
                        >
                          <Typography
                            fontFamily="Archivo"
                            variant="h6"
                            sx={{
                              fontSize: { xs: "13px", sm: "16px" },
                            }}
                            color="#9A999A"
                            my={0}
                          >
                            Stage 2
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setactiveStage(2);
                            handleClose();
                          }}
                        >
                          <Typography
                            fontFamily="Archivo"
                            variant="h6"
                            sx={{
                              fontSize: { xs: "13px", sm: "16px" },
                            }}
                            color="#9A999A"
                            my={0}
                          >
                            Stage 3
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setactiveStage(3);
                            handleClose();
                          }}
                        >
                          <Typography
                            fontFamily="Archivo"
                            variant="h6"
                            sx={{
                              fontSize: { xs: "13px", sm: "16px" },
                            }}
                            color="#9A999A"
                            my={0}
                          >
                            Stage 4
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setactiveStage(4);
                            handleClose();
                          }}
                        >
                          <Typography
                            fontFamily="Archivo"
                            variant="h6"
                            sx={{
                              fontSize: { xs: "13px", sm: "16px" },
                            }}
                            color="#9A999A"
                            my={0}
                          >
                            Stage 5
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setactiveStage(5);
                            handleClose();
                          }}
                        >
                          <Typography
                            fontFamily="Archivo"
                            variant="h6"
                            sx={{
                              fontSize: { xs: "13px", sm: "16px" },
                            }}
                            color="#9A999A"
                            my={0}
                          >
                            End Presale
                          </Typography>
                        </MenuItem>
                      </Menu>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Stack alignItems="flex-end">
                        <Typography
                          fontFamily="Archivo"
                          variant="h6"
                          sx={{
                            fontSize: { xs: "13px", sm: "16px" },
                          }}
                          color="#9A999A"
                          my={0}
                        >
                          Stage end time
                        </Typography>
                        <input
                          type="datetime-local"
                          style={{
                            background: "#212024",
                            borderRadius: "24px",
                            fontWeight: "bold",
                            outline: "none",
                            border: "none",
                            color: "white",
                            padding: "10px",
                          }}
                          value={stageEndTime}
                          onChange={(e) =>
                            setstageEndTime(
                              moment(e.target.value).format("YYYY-MM-DDTHH:mm")
                            )
                          }
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="center">
                  <BigOrangeButton
                    onClick={changeActiveStageHandler}
                    loading={loading}
                  >
                    Set Stage
                  </BigOrangeButton>
                </Stack>
              </Grid>
            </Grid>

            <Box
              sx={{
                bgcolor: "#050505",
                border: "1px solid #504c54",
                borderRadius: "18px",
                px: 1,
                py: 1,
                textAlign: "left",
                my: 2,
              }}
            >
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                rowSpacing={1}
                columnSpacing={1}
              >
                {presaleData && (
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        bgcolor: "#050505",
                        border: "1px solid #504c54",
                        borderRadius: "18px",
                        px: 1,
                        py: 1,
                        textAlign: "left",
                      }}
                    >
                      <Typography
                        fontFamily="Archivo"
                        variant="h6"
                        textAlign="center"
                        sx={{
                          fontSize: { xs: "13px", sm: "16px" },
                        }}
                        color="#9A999A"
                        my={0}
                      >
                        Global Data
                      </Typography>
                      <Typography
                        fontFamily="Archivo"
                        variant="h6"
                        textAlign="center"
                        sx={{
                          fontSize: { xs: "13px", sm: "16px" },
                        }}
                        color="#9A999A"
                        my={0}
                      >
                        Total Token Sold :{" "}
                        {formatUnits(
                          presaleData?.soldTokens?.toString(),
                          presaleData?.decimals?.toString()
                        )}
                      </Typography>
                      <Typography
                        fontFamily="Archivo"
                        variant="h6"
                        textAlign="center"
                        sx={{
                          fontSize: { xs: "13px", sm: "16px" },
                        }}
                        color="#9A999A"
                        my={0}
                      >
                        SOL Raised :{" "}
                        {formatUnits(presaleData?.solRaised.toString(), 9)}
                      </Typography>
                      <Typography
                        fontFamily="Archivo"
                        variant="h6"
                        textAlign="center"
                        sx={{
                          fontSize: { xs: "13px", sm: "16px" },
                        }}
                        color="#9A999A"
                        my={0}
                      >
                        USDT Raised :{" "}
                        {formatUnits(presaleData?.usdtRaised.toString(), 9)}
                      </Typography>
                      <Typography
                        fontFamily="Archivo"
                        variant="h6"
                        textAlign="center"
                        sx={{
                          fontSize: { xs: "13px", sm: "16px" },
                        }}
                        color="#9A999A"
                        my={0}
                      >
                        USDC Raised :{" "}
                        {formatUnits(presaleData?.usdcRaised.toString(), 9)}
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
              <Typography
                fontFamily="Archivo"
                variant="h6"
                sx={{
                  fontSize: { xs: "13px", sm: "16px" },
                }}
                color="#9A999A"
                my={0}
              >
                Stages Info
              </Typography>
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                rowSpacing={1}
                columnSpacing={1}
              >
                {presaleData &&
                  presaleData?.stages?.map(
                    (
                      {
                        allocation,
                        soldTokens,
                        solRaised,
                        usdtRaised,
                        usdcRaised,
                      },
                      index
                    ) => (
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            bgcolor: "#050505",
                            border: `1px solid ${
                              presaleData?.activeStage === index
                                ? "orange"
                                : "#504c54"
                            }`,
                            borderRadius: "18px",
                            px: 1,
                            py: 1,
                            textAlign: "left",
                          }}
                          key={index}
                        >
                          <Typography
                            fontFamily="Archivo"
                            variant="h6"
                            textAlign="center"
                            sx={{
                              fontSize: { xs: "13px", sm: "16px" },
                            }}
                            color="#9A999A"
                            my={0}
                          >
                            {presaleData.activeStage === index && "Active"}{" "}
                            Stage {index + 1}
                          </Typography>
                          <Typography
                            fontFamily="Archivo"
                            variant="h6"
                            textAlign="center"
                            sx={{
                              fontSize: { xs: "13px", sm: "16px" },
                            }}
                            color="#9A999A"
                            my={0}
                          >
                            Allocation :{" "}
                            {formatAllocation(
                              formatUnits(
                                allocation.toString(),
                                presaleData?.decimals
                              )
                            )}
                          </Typography>
                          <Typography
                            fontFamily="Archivo"
                            variant="h6"
                            textAlign="center"
                            sx={{
                              fontSize: { xs: "13px", sm: "16px" },
                            }}
                            color="#9A999A"
                            my={0}
                          >
                            Sold Tokens :{" "}
                            {parseFloat(
                              formatUnits(
                                soldTokens.toString(),
                                presaleData?.decimals?.toString()
                              )
                            )?.toFixed(2)}
                          </Typography>
                          <Typography
                            fontFamily="Archivo"
                            variant="h6"
                            textAlign="center"
                            sx={{
                              fontSize: { xs: "13px", sm: "16px" },
                            }}
                            color="#9A999A"
                            my={0}
                          >
                            SOL Raised : {formatUnits(solRaised.toString(), 9)}
                          </Typography>
                          <Typography
                            fontFamily="Archivo"
                            variant="h6"
                            textAlign="center"
                            sx={{
                              fontSize: { xs: "13px", sm: "16px" },
                            }}
                            color="#9A999A"
                            my={0}
                          >
                            USDT Raised :{" "}
                            {formatUnits(usdtRaised.toString(), 9)}
                          </Typography>
                          <Typography
                            fontFamily="Archivo"
                            variant="h6"
                            textAlign="center"
                            sx={{
                              fontSize: { xs: "13px", sm: "16px" },
                            }}
                            color="#9A999A"
                            my={0}
                          >
                            USDC Raised :{" "}
                            {formatUnits(usdcRaised.toString(), 9)}
                          </Typography>
                        </Box>
                      </Grid>
                    )
                  )}
              </Grid>
            </Box>
            {/* <Grid item xs={12}>
              <Stack direction="row" justifyContent="center">
                <BigOrangeButton
                  onClick={deletePresaleHandler}
                  loading={loading}
                >
                  Delete Presale
                </BigOrangeButton>
              </Stack>
            </Grid> */}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default OwnerPrevilege;
