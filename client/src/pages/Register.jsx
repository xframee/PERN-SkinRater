import React, {useState} from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { registerUser } from "../utilities/registerServive";

export const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await registerUser(username, password);
            navigate("/login");

        } catch (error) {
            
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