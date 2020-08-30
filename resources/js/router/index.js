import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Denuncias from '../pages/welcome';
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import ForgotPassword from '../pages/auth/forgot-password';
import ResetPassword from '../pages/auth/reset-password';
import NotFound from '../pages/404';
import Home from '../pages/home';
import DetalleDenuncia from '../pages/DetalleDenuncia';
import Profile from '../pages/profile';
import AuthRoute from './auth-route';
import GuestRoute from './guest-route';
import {useAuth} from '../context/auth';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

function App () {
    const classes = useStyles();

    let {initializing} = useAuth();
    return (
        initializing
            ? <div className={classes.root}>
                <LinearProgress/>
            </div>
            : <Router>
                <div>
                    <Switch>
                        <GuestRoute exact path="/" component={Denuncias} title="Denuncia Anónima - Viña Emiliana"/>
                        <GuestRoute path="/register" component={Register} title="register"/>
                        <GuestRoute path="/login" component={Login} title="Login"/>
                        <GuestRoute path="/forgot-password" component={ForgotPassword} title="forgot password"/>
                        <GuestRoute path="/password/reset/:token" component={ResetPassword} title="reset password"/>
                        <AuthRoute path="/home" component={Home} title="Denuncia Anónima Admin"/>
                        <AuthRoute path="/detalle/:id" component={DetalleDenuncia} title="Detalle Denuncia"/>
                        <AuthRoute path="/profile/:id" component={Profile} title="profile"/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </Router>
    );
};

export default App;
