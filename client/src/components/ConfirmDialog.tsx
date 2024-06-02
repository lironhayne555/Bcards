import { Box, Button, Modal, Typography } from "@mui/material";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onConfirm: () => void;
}
function ConfirmDialog({
  isOpen,
  onClose,
  title,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          paddingInline: "50px",
          display: "flex",
          gap: "10px",
          borderRadius: "6px",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.paper",
          boxShadow: 24,
          overflow: "auto", // Enable scrolling
          minHeight: "100px",
          maxHeight: "80vh", // Limit max height to 80% of viewport height
        }}
      >
        <Typography fontWeight={"bold"}>{title}</Typography>
        <Box sx={{ display: "flex", gap: "30px" }}>
          <Button onClick={onConfirm} variant="contained">
            Confirm
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ConfirmDialog;
