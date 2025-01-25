import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
export default function ({ notificationProps, setnotificationProps }) {
  const handleClose = () => {
    setnotificationProps({ ...notificationProps, modal: false });
  };

  return (
    <Dialog
      open={notificationProps?.modal}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          bgcolor: "#171518",
          border: "1px solid #504c54",
          borderRadius: "18px",
          p: 1,
        },
      }}
    >
      <Stack direction="row" justifyContent="flex-end">
        <IconButton onClick={handleClose}>
          <CloseIcon sx={{ color: "white", fontWeight: "bold" }} />
        </IconButton>
      </Stack>
      <Box p={3}>
        <DialogTitle
          id="alert-dialog-title"
          fontFamily="Archivo"
          sx={{
            textAlign: "center",
            color: notificationProps?.error ? "#FF0101" : "#1ed404",
          }}
          variant="h3"
          lineHeight="2rem"
          fontSize="24px"
        >
          {notificationProps?.error
            ? "Operation Failed!"
            : "Congratulations! Success!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ textAlign: "center" }}
          >
            <Typography
              variant="h4"
              py={3}
              color="white"
              fontFamily="Archivo"
              fontSize="18px"
            >
              {notificationProps?.message}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          {notificationProps?.error ? (
            <Button
              sx={{
                fontWeight: 400,
                fontFamily: "Archivo",
                textTransform: "capitalize",
                backgroundColor: "#FF0101",
                color: "#ffffff",
                fontSize: "16px",
                borderRadius: "47px",
                width: "331px",
                height: "39px",
                boxShadow: "0px 4px 19px rgba(0, 0, 0, 0.65)",
                "&:hover": {
                  backgroundColor: "#FF0101a1",
                },
              }}
              onClick={handleClose}
              pt={3}
            >
              Try Again
            </Button>
          ) : (
            notificationProps?.buttonTitle && (
              <Button
                sx={{
                  fontWeight: 400,
                  fontFamily: "Archivo",
                  textTransform: "capitalize",
                  backgroundColor: "#1ed404",
                  color: "#ffffff",
                  fontSize: "16px",
                  borderRadius: "47px",
                  width: "331px",
                  height: "39px",
                  boxShadow: "0px 4px 19px rgba(0, 0, 0, 0.65)",
                  "&:hover": {
                    backgroundColor: "#1ed404a1",
                  },
                }}
                onClick={() => {
                  handleClose();
                }}
                pt={3}
              >
                {notificationProps?.buttonTitle}
              </Button>
            )
          )}
        </DialogActions>
      </Box>
    </Dialog>
  );
}
