import React, { useState, useEffect } from 'react';
import {Link as RouterLink} from 'react-router-dom'
import { makeStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import AccountCircle from '@material-ui/icons/AccountCircle';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import InputBase from '@material-ui/core/InputBase';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import {Links} from './nav/links'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: '3em',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    navHeader: {
        padding: '0.25em 0',
        textAlign: 'center',
        backgroundColor: '#666',
        color: '#EEE',
    },
    list: {
        width: 250,
    },
    offset: theme.mixins.toolbar,
}));

export default function Header() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [userName, setUserName] = useState('fasternCEO')
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleChange = event => {
        setAuth(event.target.checked);
    };
    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [side]: open });
    };
    const sideList = side => {
        let listItems = [];
        for (let each in Links){
            let category = Links[each];
            let catLinks = []
            catLinks.push(
                <Typography variant="h6" gutterBottom className={classes.navHeader}>
                    {each}
                </Typography>
            )
            for (let cat in category){
                catLinks.push(
                    <ListItem button key={cat} component={RouterLink} to={category[cat]}>
                      <ListItemText primary={cat} />
                    </ListItem>
                )
            }
            listItems.push(
                <List style={{padding:0}}>
                  {catLinks}
                </List>
            )
        }
        return (
            <div
                className={classes.list}
                role="presentation"
                onClick={toggleDrawer(side, false)}
                onKeyDown={toggleDrawer(side, false)}
            >
                { listItems}
            </div>
        )
    };
    // The second Toolbar tag is there to offset body content due to the fixed position of app bar
    return (
        <div className={classes.root}>
            <AppBar position="sticky" variant="dense" style={{ margin: 0 }}>
                <Toolbar variant="dense">
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
                        <MenuIcon  />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                        FASTER/\/
                    </Typography>
                    {auth && (
                        <div>

                            <Button
                                variant="contained"
                                color=""
                                onClick={handleMenu}
                                startIcon={<AccountCircle />}
                                >
                                { userName }
                            </Button>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                keepMounted
                                transformOrigin={{
                                    vertical: -45,
                                    horizontal: -25,
                                }}
                                open={open}
                                onClose={handleClose}
                                >
                                <MenuItem onClick={handleClose}><a href=''>Logout</a></MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <div className={classes.offset} />
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
        </div>
    );
}
