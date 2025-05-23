import React, { useState } from "react";
import { TextField, Button, Box, Typography, Link, Alert } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                navigate("/"); // Redirect to home
            } else {
                setError(data.error || "Login failed. Please try again.");
            }
        } catch (err) {
            console.error("Error during login:", err);
            setError("An unexpected error occurred. Please try again.");
        }
    };

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
            {error && (
                <Typography variant="body2" sx={{ color: "red", textAlign: "center" }}>
                    <Alert severity="error">{error}</Alert>
                </Typography>
            )}

            <Typography variant="h4" sx={{ color: "white" }}>
                Login
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: "100%",
                    maxWidth: 400,
                }}
            >
                <form onSubmit={handleLogin}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        InputLabelProps={{ style: { color: "white" } }}
                        InputProps={{
                            style: { color: "white", backgroundColor: "#2e2e3e" },
                        }}
                        margin="normal"
                    />

                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputLabelProps={{ style: { color: "white" } }}
                        InputProps={{
                            style: { color: "white", backgroundColor: "#2e2e3e" },
                        }}
                        margin="normal"
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </form>

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