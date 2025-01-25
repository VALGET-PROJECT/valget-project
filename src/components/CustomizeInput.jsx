import { TextField, styled } from "@mui/material";

export const CustomizeInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& label.Mui-focused": {
    color: "white",
    fontFamily: ["DM Sans", "sans-serif"].join(","),
  },
  "& label": {
    color: "white",
    fontFamily: ["DM Sans", "sans-serif"].join(","),
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "transparent", // Remove underline after focus
  },
  "& .MuiOutlinedInput-root": {
    border: "none", // Remove border entirely
    outline: "none", 
    fontSize: "18px", // Font size adjustment
    height: "45px", 
    width:'100%',// Height adjustment
    color: "#fff",
    backgroundColor: "#323244", // Background color remains
    "& fieldset": {
      border: "none", // Ensure no border for fieldset
    },
    "&:hover fieldset": {
      border: "none", // Remove border on hover
    },
    "&:active fieldset": {
      border: "none", // Remove border on active state
    },
    "&.Mui-focused fieldset": {
      border: "none", // Remove border on focus
    },
    "&.Mui-disabled": {
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none", // Ensure no border in disabled state
      },
    },
  },
}));



