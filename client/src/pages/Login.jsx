import React from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const Login = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
                gap: 2,
                padding: 6,
            }}
        >

            <Typography variant="h4" sx={{ color: "white" }}>
                Login
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: "100%",
                    maxWidth: 400, // Limit the width of the input fields
                }}
            >
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ style: { color: "white" } }} // Light label color
                    InputProps={{
                        style: { color: "white", backgroundColor: "#2e2e3e" }, // Light text and dark input background
                    }}
                />

                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ style: { color: "white" } }} // Light label color
                    InputProps={{
                        style: { color: "white", backgroundColor: "#2e2e3e" }, // Light text and dark input background
                    }}
                />

                <Button variant="contained" color="primary">
                    Login
                </Button>

                <Typography variant="body2" sx={{ color: "white", textAlign: "center" }}>
                    Don't have an account?{" "}
                    <Link component={RouterLink} to="/register" sx={{ color: "#61dafb" }}>
                        Register here
                    </Link>
                </Typography>

            </Box>
        </Box>
    );
};