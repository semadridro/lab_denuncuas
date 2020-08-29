import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useAuth} from '../../context/auth';
import {login} from '../../api/auth';
import {getIntendedUrl} from '../../utils/auth';
import useInputValue from '../../components/input-value';
import Header from '../header';
import Footer from '../Footer';

export default function Login () {
    let {setCurrentUser, setToken} = useAuth();
    let history = useHistory();
    let email = useInputValue('email');
    let password = useInputValue('password');

    const handleSubmit = e => {
        e.preventDefault();

        login({
            email: email.value,
            password: password.value
        }).then(({user, token}) => {
            setToken(token);
            setCurrentUser(user);
            history.push(getIntendedUrl());
        }).catch(error => {
            error.json().then(({errors}) => email.parseServerError(errors));
        });
    };

    return (
        <>
            <Header/>

            <div className="container">
                <div className="section">
                    <div className="row">
                        <div className="col s12 m8 offset-m2">
                            <div className="card-panel card-mod card-up z-depth-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <h1 className="center-align">INGRESO DENUNCIAS ANÓNIMAS</h1>
                                        <div className="space-50"></div>
                                        <div className="input-field col s12">
                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                className={'validate'}
                                                required
                                                autoFocus
                                                {...email.bind}
                                            />

                                            {email.error && <p className="text-red-500 text-xs pt-2">{email.error}</p>}
                                            <label>Usuario</label>
                                        </div>
                                        <div className="input-field col s12">
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                className="validate"
                                                required
                                                {...password.bind}
                                            />
                                            <label>Password</label>
                                        </div>
                                        <div className="input-field col s6">
                                            <a className="olvidepass" href="#">Olvidé mi contraseña</a>
                                        </div>
                                        <div className="input-field col s6">
                                            <button type="submit" className="waves-effect btn btn-large btn-next btn-first z-depth-0 blue lighten-1">Entrar</button>
                                        </div>
                                        <div className="space-50"></div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/*
                <form onSubmit={handleSubmit}
                      method="POST">
                    <div className="mb-4 mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className={`appearance-none border rounded w-full py-1 px-3 text-grey-darker bg-gray-100 ${email.error ? 'border-red-500' : ''}`}
                            required
                            autoFocus
                            {...email.bind}
                        />

                        {email.error && <p className="text-red-500 text-xs pt-2">{email.error}</p>}
                    </div>

                    <div className="mb-3">
                        <label className="block text-gray-700 text-sm font-bold mb-1"
                               htmlFor="password"> Password </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="appearance-none border rounded w-full py-1 px-3 text-grey-darker bg-gray-100"
                            required
                            {...password.bind}
                        />
                    </div>

                    <div className="mb-3 flex justify-end">
                        <Link to="/forgot-password" className="text-sm underline text-gray-600 font-bold">Forget
                            password?</Link>
                    </div>

                    <div className="mb-3">
                        <button type="submit"
                                className="border rounded px-3 py-2 text-white bg-indigo-500 w-full font-bold">
                            Sign in
                        </button>
                    </div>
                </form>
                ;*/}

            <Footer/>;
        </>
    )
        ;
};
