import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import siteLogo from '../images/csraterlogo.png';
import UserMenu from "./UserMenu";
import { useUser } from "../context/UserContext";

export const NavBar = () => {
    const { user, logout, loading } = useUser();

    return (
        <AppBar position='static' sx={{ bgcolor: 'primary.dark' }}>
            <Toolbar>
                <IconButton size='large' edge='start' aria-label='logo' component={RouterLink} to="/">
                    <img src={siteLogo} alt='site logo' style={{ width: '75px', height: 'auto' }} />
                </IconButton>
                <Typography variant='h6' sx={{ flexGrow: 1 }} textAlign="left">
                    SKINBOXD
                </Typography>
                <Stack direction='row' spacing={2}>
                    <Button color='inherit' component={RouterLink} to="/skins">All Skins</Button>
                    <Button color='inherit' component={RouterLink} to="/path2">Rate</Button>

                    {!loading && (
                        user ? (
                            <UserMenu userId={user.userId} username={user.username} onLogout={logout} />
                        ) : (
                            <>
                                <Button color="inherit" component={RouterLink} to="/login">
                                    Login
                                </Button>
                            </>
                        )
                    )}

                </Stack>
            </Toolbar>
        </AppBar>
    );
};