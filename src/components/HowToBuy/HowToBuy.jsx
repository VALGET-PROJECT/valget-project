import React from "react";
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
  Divider,
} from "@mui/material";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import hlogo from "../../assets/hlogo.png";
import CopyrightIcon from "@mui/icons-material/Copyright";
import bg from '../../assets/bg2.jpg';

export default function HowToBuy() {
  return (
    <>
      {" "}
      <Box sx={{
          //  backgroundImage: `url(${bg})`,
           backgroundSize: 'cover',
           backgroundRepeat: 'no-repeat',
           height: '100vh',
           opacity: 0.7
        }}>

      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Stack direction="row" spacing={2} justifyContent="center" my={6}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Archivo",
              fontWeight: 600,
              color: "white",
              fontSize: { xs: "30px", sm: "40px" },
            }}
          >
            HOW TO
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
            BUY
          </Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          my={6}
        >
          <Stack
            sx={{
              background: "linear-gradient(90deg, #91EB4A 0%, #13CFDE 100%)",
              width: "30px",
              height: "30px",
              borderRadius: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Archivo",
                fontWeight: 600,
                color: "white",
                textAlign: "center",
                p: 1,
              }}
            >
              1
            </Typography>
          </Stack>
          <Typography
            fontFamily="Archivo"
            variant="h6"
            fontWeight="bold"
            sx={{
              backgroundImage:
                "linear-gradient(90deg, #91EB4A 0%, #13CFDE 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
            my={0}
          >
            Connect your wallet
          </Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          my={6}
        >
          <Stack
            sx={{
              border: "1px solid #504c54",
              borderRadius: "100%",
              width: "40px",
              height: "40px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PhoneIphoneIcon sx={{ color: "white" }} />
          </Stack>
          <Typography
            fontFamily="Archivo"
            variant="h6"
            color="white"
            fontWeight="bold"
            my={0}
          >
            Mobile
          </Typography>
        </Stack>
        <Typography
          fontFamily="Archivo"
          variant="h6"
          color="white"
          textAlign="center"
          my={0}
        >
          Open "Phantom" or "Solflare" on your phone, visit our website using
          the integrated browser and click connect. Select the app from "Connect
          Wallet" and click "Approve".
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          my={6}
        >
          <Stack
            sx={{
              border: "1px solid #504c54",
              borderRadius: "100%",
              width: "40px",
              height: "40px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DesktopWindowsIcon sx={{ color: "white" }} />
          </Stack>
          <Typography
            fontFamily="Archivo"
            variant="h6"
            color="white"
            fontWeight="bold"
            my={0}
          >
            Desktop
          </Typography>
        </Stack>
        <Typography
          fontFamily="Archivo"
          variant="h6"
          color="white"
          textAlign="center"
          my={0}
        >
          Open your "Google Chrome" browser, click "Connect Wallet" and approve
          in your "Phantom" extension.
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          my={6}
        >
          <Stack
            sx={{
              background: "linear-gradient(90deg, #91EB4A 0%, #13CFDE 100%)",
              width: "30px",
              height: "30px",
              borderRadius: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Archivo",
                fontWeight: 600,
                color: "white",
                textAlign: "center",
                p: 1,
              }}
            >
              2
            </Typography>
          </Stack>
          <Typography
            fontFamily="Archivo"
            variant="h6"
            fontWeight="bold"
            sx={{
              backgroundImage:
                "linear-gradient(90deg, #00FF99 0%, #13CFDE 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
            my={0}
          >
            Select payment method
          </Typography>
        </Stack>
        <Typography
          fontFamily="Archivo"
          variant="h6"
          color="white"
          textAlign="center"
          my={0}
        >
          Select your method of purchase (USDT or SOLT) and input the amount of
          currency you want to spend or the amount of tokens you want to
          receive. Finally, press the "Buy Now" button and accept the
          transaction in your chosen wallet.
        </Typography>
      </Container>
      </Box>
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Grid container alignItems="flex-start" sx={{ mb: 8 }}>
          <Grid item xs={12} sm={6}>
            <Box
              py={1}
              textAlign={{ xs: "center", sm: "left"  ,}}

              component={"a"}
              href="https://bebe-coin.xyz"
              target="_blank"
              sx={{display:'flex',justifyContent:{xs:'center',sm:'flex-start'},alignItems:'flex-start',mt:{xs:"400px",sm:'1px'}}}
            >
              <img src={hlogo} width="130px" alt="pic" />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box py={1} textAlign={{ xs: "center", sm: "left" }}>
              <Stack
                direction="column"
                spacing={2}
                alignItems={{ xs: "center", sm: "flex-end" }}
                sx={{mt:{xs:'0px',sm:'1'}}}
              >
                <Stack
                  justifyContent="flex-start"
                  className="animatedElement"
                  height="30px"
                  overflow="hidden"
                  mb={2}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Archivo",
                      color: "#00FF99",
                      textDecoration: "none",
                      fontWeight: 400,
                    }}
                    component="a"
                    href="https://valget-project.com/"
                    target="_blank"
                    my={0}
                    className="footer-link"
                  >
                    Website
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Archivo",
                      color: "#00FF99",
                      textDecoration: "none",
                      fontWeight: 400,
                    }}
                    component="a"
                    href="https://valget-project.com/"
                    target="_blank"
                    my={0}
                    className="footer-link"
                  >
                    Website
                  </Typography>
                </Stack>
                <Stack
                  justifyContent="flex-start"
                  className="animatedElement"
                  height="30px"
                  mb={2}
                  overflow="hidden"
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Archivo",
                      color: "white",
                      textDecoration: "none",
                      fontWeight: 400,
                    }}
                    component="a"
                    href="https://valget-project.com/"
                    target="_blank"
                    my={0}
                    className="footer-link"
                  >
                    Twitter
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Archivo",
                      color: "white",
                      textDecoration: "none",
                      fontWeight: 400,
                    }}
                    component="a"
                    href="https://valget-project.com/"
                    target="_blank"
                    my={0}
                    className="footer-link"
                  >
                    Twitter
                  </Typography>
                </Stack>
                <Stack
                  justifyContent="flex-start"
                  className="animatedElement"
                  height="30px"
                  overflow="hidden"
                  mb={2}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Archivo",
                      color: "white",
                      textDecoration: "none",
                      fontWeight: 400,
                    }}
                    component="a"
                    href="https://valget-project.com/"
                    target="_blank"
                    my={0}
                    className="footer-link"
                  >
                    Telegram
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Archivo",
                      color: "white",
                      textDecoration: "none",
                      fontWeight: 400,
                    }}
                    component="a"
                    href="https://valget-project.com/"
                    target="_blank"
                    my={0}
                    className="footer-link"
                  >
                    Telegram
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ borderColor: "#00FF99" }} />
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          mt={3}
        >
          <CopyrightIcon sx={{ color: "white" }} />
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Archivo",
              color: "white",
              
              py: 2,
              fontSize: { xs: "15px", sm: "18px" },
              fontWeight: 400,
            }}
          >
            2024 ValGet. All Rights Reserved.
          </Typography>
        </Stack>
      </Container>
    </>
  );
}
