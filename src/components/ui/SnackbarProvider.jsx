import { useState } from "react";
import { SnackbarContext } from "../../context/SnackbarContext";
import AppSnackbar from "../ui/snackbar";

export function SnackbarProvider({ children }) {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "sucess",
    });

    function showSnackbar(message, severity = "success") {
        setSnackbar({
            open: true,
            message,
            severity,
        });
    }

    function closeSnackbar() {
        setSnackbar((current) => ({
            ...current,
            open: false,
        }));
    }

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <AppSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={closeSnackbar}
            />
        </SnackbarContext.Provider>
    );
}
