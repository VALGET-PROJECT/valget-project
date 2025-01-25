import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import moment from "moment";

export default function Timer({ expiryTimestamp }) {
  const calculateTimeLeft = () => {
    const difference = moment.unix(expiryTimestamp).diff(moment(), "seconds");

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (60 * 60 * 24)),
        hours: Math.floor((difference / (60 * 60)) % 24),
        minutes: Math.floor((difference / 60) % 60),
        seconds: Math.floor(difference % 60),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });
  let { days, hours, minutes, seconds } = timeLeft;
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap:'wrap',
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        py:'30px'
      }}
    >
      {/* cashbull timer  box 1*/}

      <Box sx={{background:'#1A1A2E66',py:1,px:'25px',mx:'10px',borderRadius:'10px'}}>
        <Typography
         sx={{
          fontSize: '16px',
          lineHeight: "30px",
          color: "#FFF",
          letterSpacing: "1px",
          fontWeight: 500,
          position: "relative",
          zIndex: 2,
          fontFamily: "Archivo",
          
        }}>Days</Typography>
        <Typography
          sx={{
            fontSize: '28px',
            lineHeight: "40px",
            color: "#FFF",
            letterSpacing: "1px",
            fontWeight: 500,
            position: "relative",
            zIndex: 2,
            fontFamily: "Archivo",
            
          }}
        >
          {days < 10 ? `0${days}` : days} 
        </Typography>
      </Box>
      {/* cashbull timer  box 2*/}
      <Box sx={{background:'#1A1A2E66',py:1,px:'25px',mx:'10px',borderRadius:'10px'}}>
      <Typography
         sx={{
          fontSize: '16px',
          lineHeight: "30px",
          color: "#FFF",
          letterSpacing: "1px",
          fontWeight: 500,
          position: "relative",
          zIndex: 2,
          fontFamily: "Archivo",
          
        }}>Hour</Typography>
        <Typography
          sx={{
            fontSize: '28px',
            lineHeight: "40px",
            color: "#FFF",
            letterSpacing: "1px",
            fontWeight: 500,
            position: "relative",
            zIndex: 2,
            fontFamily: "Archivo",
          }}
        >
          {hours < 10 ? `0${hours}` : hours} 
        </Typography>
      </Box>
      {/* cashbull timer  box 3*/}
      <Box sx={{background:'#1A1A2E66',py:1,px:'25px',mx:'10px',borderRadius:'10px'}}>
      <Typography
         sx={{
          fontSize: '16px',
          lineHeight: "30px",
          color: "#FFF",
          letterSpacing: "1px",
          fontWeight: 500,
          position: "relative",
          zIndex: 2,
          fontFamily: "Archivo",
          
        }}>Min</Typography>
        <Typography
          sx={{
            fontSize: '28px',
            lineHeight: "40px",
            color: "#FFF",
            letterSpacing: "1px",
            fontWeight: 500,
            position: "relative",
            zIndex: 2,
            fontFamily: "Archivo",
          }}
        >
          {minutes < 10 ? `0${minutes}` : minutes} 
        </Typography>
      </Box>

      <Box sx={{background:'#1A1A2E66',py:1,px:'25px',mx:'10px',borderRadius:'10px'}}>
      <Typography
         sx={{
          fontSize: '16px',
          lineHeight: "30px",
          color: "#FFF",
          letterSpacing: "1px",
          fontWeight: 500,
          position: "relative",
          zIndex: 2,
          fontFamily: "Archivo",
          
        }}>Sec</Typography>
        <Typography
          sx={{
            fontSize: '28px',
            lineHeight: "40px",
            color: "#FFF",
            letterSpacing: "1px",
            fontWeight: 500,
            position: "relative",
            zIndex: 2,
            fontFamily: "Archivo",
          }}
        >
          {seconds < 10 ? `0${seconds}` : seconds}
        </Typography>
      </Box>
    </Box>
  );
}
