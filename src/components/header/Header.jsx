import {
  Box,
  Container,
  IconButton,
  TextField,
  Typography,
  Stack,
  Grid,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import hlogo from "../../assets/hlogo.png";
const Header = () => {
  const [textCopied, setTextCopied] = useState(false);
  const match = useMediaQuery("(max-width:900px)");

  return (
    <>
      <Box
        sx={{
          background: "linear-gradient(180deg, #3E165C 0%, #1A1A2E 100%)",

          p: 1,
        }}
      >
        <Container maxWidth="xl">
          <Typography
            fontFamily="Archivo"
            variant="h5"
            color="#fff"
            p={2}
            mb={0}
            textAlign="center"
            fontSize={{ xs: "14px", sm: "18px" }}
          >
            🚀 Share your{" "}
            <span style={{ fontWeight: "bold" }}>referral link</span> and earn
            10% commission from any sales
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="xl">
        <Grid container alignItems="center">
          <Grid item xs={12} sm={match ? 3 : 4.3}>
            <Box
              py={1}
              textAlign={{ xs: "center", sm: "left" }}
              component={"a"}
              href="https://bebe-coin.xyz"
              target="_blank"
            >
              <img src={hlogo} width="130px" alt="pic" />
            </Box>
          </Grid>
          <Grid item xs={12} sm={match ? 9 : 7.7}>
            <Box py={1} textAlign={{ xs: "center", sm: "left" }}>
              <Stack
                direction="row"
                spacing={2}
                justifyContent={{ xs: "center", sm: "flex-start" }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: "Archivo",
                    fontWeight: 600,
                    color: "white",
                    fontSize: { xs: "35px", sm: "50px" },
                  }}
                >
                  ValGet

                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: "35px", sm: "50px" },
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
                  PRESALE
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Header;
