import React, { useState } from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { registerUser } from "../utilities/registerServive";

export const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate the input fields
        if (username.length <= 3) {
            setError("Username must be longer than 3 characters.");
            return;
        }
        if (password.length <= 5) {
            setError("Password must be longer than 5 characters.");
            return;
        }

        try {
            setError("");
            await registerUser(username, password);
            setSuccess("Registration successful! Redirecting to login...");

            // Redirect to login page after 2 seconds do display the success message for some time
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            setError("Failed to register. Please try again.");
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

            <Typography variant="h4" sx={{ color: "white" }}>
                Register
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

                {error && (
                    <Typography variant="body2" sx={{ color: "red", textAlign: "center" }}>
                        {error}
                    </Typography>
                )}

                {success && (
                    <Typography variant="body2" sx={{ color: "green", textAlign: "center" }}>
                        {success}
                    </Typography>
                )}

                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    InputLabelProps={{ style: { color: "white" } }} // Light label color
                    InputProps={{
                        style: { color: "white", backgroundColor: "#2e2e3e" }, // Light text and dark input background
                    }}
                />

                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    InputLabelProps={{ style: { color: "white" } }} // Light label color
                    InputProps={{
                        style: { color: "white", backgroundColor: "#2e2e3e" }, // Light text and dark input background
                    }}
                />

                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Register
                </Button>

                <Typography variant="body2" sx={{ color: "white", textAlign: "center" }}>
                    Already have an account?{" "}
                    <Link component={RouterLink} to="/login" sx={{ color: "#61dafb" }}>
                        Login here
                    </Link>
                </Typography>

            </Box>
        </Box>
    );
};