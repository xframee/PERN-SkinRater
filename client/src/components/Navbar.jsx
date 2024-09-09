import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import siteLogo from '../images/csraterlogo.png';

export const NavBar = () => {
    return (
        <AppBar position='static' color='primary'>
            <Toolbar>
                <IconButton size='large' edge='start' aria-label='logo' component={RouterLink} to="/">
                    <img src={siteLogo} alt='site logo' style={{ width: '50px', height: 'auto' }} />
                </IconButton>
                <Typography variant='h6' sx={{ flexGrow: 1 }} textAlign="left">
                    CS SKIN RATER
                </Typography>
                <Stack direction='row' spacing={2}>
                    <Button color='inherit' component={RouterLink} to="/path1">Item 1</Button>
                    <Button color='inherit' component={RouterLink} to="/path2">Item 2</Button>
                    <Button color='inherit' component={RouterLink} to="/path3">Item 3</Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};