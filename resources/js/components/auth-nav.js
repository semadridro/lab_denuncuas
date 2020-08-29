import React, {useState} from 'react';
import {NavLink, Link, useHistory} from 'react-router-dom';
import {useAuth} from '../context/auth';
import {setIntendedUrl} from '../utils/auth';

import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import WatchLaterIcon from '@material-ui/icons/WatchLater';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import BlockIcon from '@material-ui/icons/Block';
import CircularProgress from '@material-ui/core/CircularProgress';
import AutorenewIcon from '@material-ui/icons/Autorenew';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function AuthNav () {

    const classes = useStyles();
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let {setCurrentUser, setToken, currentUser} = useAuth();
    let history = useHistory();
    let [hideMobileNav, setHideMobileNav] = useState(true);

    const toggleMobileNav = () => setHideMobileNav(prevState => !prevState);
    const closeMobileNav = () => setHideMobileNav(true);

    const handleLogout = () => {
        setCurrentUser(null);
        setToken(null);
        history.push('/');
        setIntendedUrl(null);
    };

    return (
        <>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <LiveHelpIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Denuncias Anónimas
                        </Typography>
                        <Button type={"button"} color="inherit" onClick={handleLogout}> {currentUser.name}</Button>
                    </Toolbar>
                </AppBar>

                <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
                    <BottomNavigationAction label="Pendientes" value="Pendientes" icon={<WatchLaterIcon />} />
                    <BottomNavigationAction label="Procesando" value="Procesando" icon={<AutorenewIcon />} />
                    <BottomNavigationAction label="Concluidas" value="Concluidas" icon={<CheckBoxIcon />} />
                    <BottomNavigationAction label="Spam" value="Spam" icon={<BlockIcon />} />
                </BottomNavigation>

            </div>
    {/*
        <div className="auth-nav flex flex-row h-16 border-b border-grey-light">
            <div className="container flex-col lg:flex-row px-2 mx-auto flex items-center justify-between">
                <div className="left flex justify-between w-full lg:w-auto flex-1 lg:flex-initial">
                    <ul className="list-reset flex items-center">
                        <li>
                            <NavLink
                                to="/home"
                                activeClassName="font-bold"
                                className="text-gray-800 no-underline text-indigo">Laravel React SPA
                            </NavLink>
                        </li>
                    </ul>

                    <div
                        onClick={toggleMobileNav}
                        id="sidebar-open"
                        className='z-50 flex px-6 items-center lg:hidden text-gray-700'>

            <span className={`svg-full ${!hideMobileNav ? 'mobile-nav-show' : ''}`}>
                MENU &nbsp;
                <svg className="fill-current" role="button" xmlns="http://www.w3.org/2000/svg" width="35" height="12"
                     viewBox="0 0 35 12">
                <rect width="35" height="2"></rect>
                <rect y="5" width="24" height="2"></rect>
                <rect y="10" width="14" height="2"></rect>
              </svg>
            </span>
                    </div>
                </div>

                <div
                    className={`right lg:flex pt-8 lg:pt-0 right fixed lg:relative bg-white w-full lg:w-auto h-screen lg:h-auto ${hideMobileNav ? 'mobile-hidden' : ''}`}>
                    <ul className="mt-8 py-8 lg:py-0 lg:mt-0 list-reset flex items-center flex-col lg:flex-row">
                        <li
                            onClick={closeMobileNav}
                            className="px-4 py-3 lg:py-0">
                            <NavLink
                                to='/home'
                                className="capitalize text-2xl font-bold lg:text-sm lg:font-light text-gray-700 underline lg:no-underline">
                                Home
                            </NavLink>
                        </li>
                        <li
                            onClick={closeMobileNav}
                            className="px-4 py-3 lg:py-0">
                            <NavLink
                                to='/home'
                                className="capitalize text-2xl font-bold lg:text-sm lg:font-light text-gray-700 underline lg:no-underline">
                                Messages
                            </NavLink>
                        </li>

                        <li
                            onClick={closeMobileNav}
                            className="px-4 py-3 lg:py-0">
                            <NavLink
                                to='/home'
                                className="capitalize text-2xl font-bold lg:text-sm lg:font-light text-gray-700 underline lg:no-underline">
                                Notifications
                            </NavLink>
                        </li>

                        <li
                            onClick={closeMobileNav}
                            className="px-4 py-3 lg:py-0">
                            <NavLink
                                to={`/profile/${currentUser.id}`}
                                className="text-2xl font-bold lg:text-sm lg:font-light capitalize text-sm text-gray-700 underline lg:no-underline">
                                {currentUser.name}
                            </NavLink>
                        </li>
                        <li
                            onClick={handleLogout}
                            className="px-4 py-3 lg:py-0">
                            <Link
                                to="/logout"
                                className="capitalize text-2xl font-bold lg:text-sm lg:font-light text-gray-700 underline lg:no-underline">
                                Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;*/  }

        </>
    );
}

export default AuthNav;
