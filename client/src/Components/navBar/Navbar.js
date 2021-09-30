import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from '../../JS/actions/user';

const Navbar = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                    </IconButton>
                    <Typography variant="h6">
                    News
                    </Typography>
                    <Button onClick={()=>{dispatch(logout());history.push("/");}} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;
