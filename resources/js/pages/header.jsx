import React, {useEffect, Fragment} from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

export default function Header () {
    useEffect(() => {
        // Init Tabs Materialize JS
        let parallax = document.querySelectorAll(".parallax");
        M.Parallax.init(parallax);
    });

    return (
        <>
            <div id="index-banner" className="parallax-container">
                <div className="section no-pad-bot">
                    <div className="container ">
                        <div className="row center ">
                            <img className="logo" src="img/emiliana-logo.png"/>
                        </div>


                    </div>
                </div>
                <div className="parallax"><img src="img/background1.jpg" alt="Unsplashed background img 1"/></div>
            </div>
        </>
    );
}
