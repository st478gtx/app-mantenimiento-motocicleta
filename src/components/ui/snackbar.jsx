import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function AppSnackbar({ open, message, severity, onClose }) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={3500}
            onClose={onClose}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
        >
            <Alert
                onClose={onClose}
                severity={severity}
                variant="filled"
                elevation={6}
                sx={{ width: "100%" }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}
