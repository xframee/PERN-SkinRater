import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material';
import siteLogo from '../images/csraterlogo.png';

export const NavBar = () => {
    return (
        <AppBar position='static' color='primary'>
            <Toolbar>
                <IconButton size='large' edge='start' aria-label='logo'>
                    <img src={siteLogo} alt='site logo' style={{ width: '50px', height: 'auto' }} />
                </IconButton>
                <Typography variant='h6' sx={{ flexGrow: 1 }} textAlign="left">
                    CS SKIN RATER
                </Typography>
                <Stack direction='row' spacing={2}>
                    <Button color='inherit'>Item 1</Button>
                    <Button color='inherit'>Item 2</Button>
                    <Button color='inherit'>Item 3</Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};