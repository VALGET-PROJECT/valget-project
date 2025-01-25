import React, { useState } from "react";
import { 
  AppBar, 
  Toolbar, 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Divider 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BitcoinIcon from "@mui/icons-material/CurrencyBitcoin"; // Placeholder icon for Bitcoin

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navLinks = ["Home", "Sub-Platforms", "Presale", "Blogs", "Contact"];

  // Ticker items (example data)
  const tickerItems = Array(10).fill({
    name: "Bitcoin",
    price: "66951",
    change: "+3.75% (+4.98%)",
  });

  return (
    <Box>
      {/* Top Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#1A1B2B" }}>
        <Toolbar>
          {/* Logo */}
          <Box display="flex" alignItems="center" flexGrow={1}>
            <Box
              component="img"
              src="/hlogo.png" // Replace with your logo
              alt="/hlogo.png"
              sx={{ height: 60, marginRight: 2 }}
            />
          </Box>

          {/* Desktop Links */}
          <Box 
            sx={{ 
              display: { xs: "none", md: "flex" }, 
              alignItems: "center", 
              gap: 3,
              backdropFilter: "blur(38px)",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundImage: "url('/NavMenubar.png')",
              backgroundPosition: "100% 100%",
              borderRadius: "10px",
              backgroundRepeat:'no-repeat',
              p: 0.7,
            }}
          >
            {navLinks.map((link) => (
              <Button 
                key={link} 
                sx={{ color: "white", textTransform: "none", fontSize: "16px" }}
              >
                {link}
              </Button>
            ))}
          </Box>

          {/* Buttons (Mobile and Desktop) */}
          <Box sx={{ display: { lg: 'none', xs: 'block' } }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#0163ED",
                color: "white",
                textTransform: "none",
                "&:hover": { backgroundColor: "#0056c8" },
              }}
            >
              Buy Valget
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                textTransform: "none",
                "&:hover": { borderColor: "#0163ED", color: "#0163ED" },
              }}
            >
              Valget-FAQ
            </Button>
          </Box>

          {/* Hamburger Menu Icon for Mobile */}
          <IconButton 
            sx={{ display: { xs: "block", md: "none" }, color: "white" }} 
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Navigation */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <Box
          sx={{
            width: 250,
            backgroundColor: "#1A1B2B",
            height: "100%",
            color: "white",
          }}
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          <List>
            {navLinks.map((link, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemText primary={link} sx={{ color: "white" }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ borderColor: "white" }} />
          <Box sx={{ padding: 2 }}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#0163ED",
                color: "white",
                textTransform: "none",
                "&:hover": { backgroundColor: "#0056c8" },
              }}
            >
              Buy Valget
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                color: "white",
                borderColor: "white",
                textTransform: "none",
                marginTop: 1,
                "&:hover": { borderColor: "#0163ED", color: "#0163ED" },
              }}
            >
              Valget-FAQ
            </Button>
          </Box>
        </Box>
      </Drawer>


    </Box>
  );
};

export default Navbar;
