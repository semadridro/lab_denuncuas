import React from 'react';

export default function Footer () {

    return (
        <>
            <footer className="page-footer color">

                <div className="row">
                    <div className="col l3 s12 center">
                        <img className="logo" src="img/emiliana-logo.png"/>
                    </div>
                    <div className="col l3 s12 offset-l3">
                        <ul>
                            <li><a href="tel:+56223539130" target="_blank"><i className="fas fa-phone-alt"></i> +562 2
                                353 9130</a></li>
                            <li><a href="mailto:contacto@emiliana.cl" target="_blank"><i
                                className="fas fa-envelope"></i> contacto@emiliana.cl</a></li>
                            <li><a href="https://goo.gl/maps/RbhWYpgc2cEAh5QT7" target="_blank"><i
                                className="fas fa-map-marker-alt"></i><p className="direccion"> Edificio WTC Avenida
                                Nueva Tajamar 481 Of. 905. Torre Sur. Las Condes. Santiago. Chile</p></a></li>
                        </ul>
                    </div>
                    <div className="col l3 s12">
                        <ul>
                            <li><a href="https://www.facebook.com/EmilianaOrganicWines" target="_blank"><i
                                className="fab fa-facebook-square"></i> /EmilianaOrganicWines</a></li>
                            <li><a href="https://twitter.com/VinosEmiliana" target="_blank"><i
                                className="fab fa-twitter"></i> @VinosEmiliana</a></li>
                            <li><a href="https://www.pinterest.cl/winesemiliana/boards/" target="_blank"><i
                                className="fab fa-pinterest"></i> /winesemiliana</a></li>
                            <li><a href="https://www.instagram.com/emilianaorganic/" target="_blank"><i
                                className="fab fa-instagram"></i> @EmilianaOrganic</a></li>
                        </ul>
                    </div>
                </div>

            </footer>
        </>
);
}
