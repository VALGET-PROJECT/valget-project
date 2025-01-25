import React from 'react';
import { Box, Container, Typography, Link, TextField, Button, Stack, IconButton } from '@mui/material';
import { Facebook, Twitter, YouTube, Telegram, Email, ArrowForward } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
  component="footer"
  sx={{
    bgcolor: '#1a1b2b',
    color: 'white',
    py: 4,
  }}
>
  <Box sx={{width:'50%',height:'2px',background:'#666674',margin:'auto',display:"block" , mb:'20px'}}></Box>
  <Container maxWidth="lg">
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'center', md: 'flex-start' },
        gap: 4,
      }}
    >
      {/* Left side with logo and social icons */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: { xs: 'center', md: 'flex-start' },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Box
          component="img"
          src="/hlogo.png"
          alt="Logo"
          sx={{ width: 80, height: 80 }}
        />
        <Stack direction="row" spacing={1}>
          <Box sx={{backgroundImage:'linear-gradient(225deg, #007BFF 14.89%, #933FFE 85.85%)',p:'2px',borderRadius:'5px'}}>
          <IconButton color="inherit" aria-label="Facebook" sx={{background:'#1A1A2E',borderRadius:'0px',width:'30px',height:'30px'}}>
            <Facebook />
          </IconButton>
          </Box>
          <Box sx={{backgroundImage:'linear-gradient(225deg, #007BFF 14.89%, #933FFE 85.85%)',p:'2px',borderRadius:'5px'}}>
          <IconButton color="inherit" aria-label="Twitter"  sx={{background:'#1A1A2E',borderRadius:'0px',width:'30px',height:'30px'}}>
            <Twitter />
          </IconButton>
          </Box>
          <Box sx={{backgroundImage:'linear-gradient(225deg, #007BFF 14.89%, #933FFE 85.85%)',p:'2px',borderRadius:'5px'}}>

          <IconButton color="inherit" aria-label="YouTube"  sx={{background:'#1A1A2E',borderRadius:'0px',width:'30px',height:'30px'}}>
            <YouTube />
          </IconButton>
          </Box>
          <Box sx={{backgroundImage:'linear-gradient(225deg, #007BFF 14.89%, #933FFE 85.85%)',p:'2px',borderRadius:'5px'}}>

          <IconButton color="inherit" aria-label="Telegram"  sx={{background:'#1A1A2E',borderRadius:'0px',width:'30px',height:'30px'}}>
            <Telegram />
          </IconButton>
          </Box>
        </Stack>
        <Typography
          variant="body2"
          sx={{ display: 'flex', alignItems: 'center', gap: 1 ,fontFamily:'DM Sans'}}
        >
          <Email sx={{ fontSize: 20 }} />
          valget.project2024@gmail.com
        </Typography>
      </Box>

      {/* Middle section with quick links */}
      <Box
        sx={{
          alignItems: { xs: 'center', md: 'flex-start' },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography variant="h6" gutterBottom fontFamily={'Sofia Sans'}>
          Quick Links
        </Typography>
        <Stack spacing={1}>
          <Link href="#" color="inherit" underline="hover" style={{fontFamily:'DM Sans'}}>
            Home
          </Link>
          <Link href="#" color="inherit" underline="hover" style={{fontFamily:'DM Sans'}}>
            Sub-Platforms
          </Link>
          <Link href="#" color="inherit" underline="hover" style={{fontFamily:'DM Sans'}}>
            Blogs
          </Link>
          <Link href="#" color="inherit" underline="hover" style={{fontFamily:'DM Sans'}}>
            Contact
          </Link>
        </Stack>
      </Box>

      {/* Right section with newsletter */}
      <Box
        sx={{
          maxWidth: 300,
          alignItems: { xs: 'center', md: 'flex-start' },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography variant="h6" gutterBottom fontFamily={'Sofia Sans'}>
          Receive transmissions
        </Typography>
        <Typography variant="body2" gutterBottom fontFamily={'DM Sans'}>
          Unsubscribe at any time. Privacy policy
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: 'center' ,position:'relative'}}>
          <TextField
            size="small"
            placeholder="Your email"
            variant="outlined"
            sx={{
              fontFamily:'DM Sans',
              flex: 1,
              width:'100%',
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                '& fieldset': {
                },
                '&:hover fieldset': {
                },
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              minWidth: 'unset',
              backgroundColor: 'transparent',
              boxShadow:'0',
              position:'absolute',
              right:'0',
              height:'100%',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <ArrowForward />
          </Button>
        </Box>
      </Box>
    </Box>

    {/* Bottom section with copyright and legal links */}
    <Box
      sx={{
        mt: 4,
        pt: 2,
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'center', sm: 'flex-start' },
        textAlign: { xs: 'center', sm: 'left' },
        gap: 2,
      }}
    >
      <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" fontFamily={'DM Sans'}>
        © 2024 ValGet Project. All Rights Reserved.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Link href="#" color="inherit" variant="body2" underline="hover" fontFamily={'Sofia Sans'}>
          Download Privacy Policy
        </Link>
        <Link href="#" color="inherit" variant="body2" underline="hover" fontFamily={'Sofia Sans'}>
          Download Legal Mentions
        </Link>
      </Box>
    </Box>
  </Container>
</Box>

  );
};

export default Footer;