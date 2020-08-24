import React, { useEffect, Fragment } from "react";
import Formulario from './formulario';

import M from "materialize-css/dist/js/materialize.min.js";

export default function Deuncias () {

    useEffect(() => {
        // Init Tabs Materialize JS
        let tabs = document.querySelectorAll(".tabs");
        M.Tabs.init(tabs);
    });

  return (<>
    <div>
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


        <div className="container">
            <div className="section">

                <div className="row">
                    <div className="col s12 m12">
                        <div className="card-panel card-mod card-up z-depth-4">
                            <div className="row">
                                <h1 className="center-align">DENUNCIAS ANÓNIMAS</h1>
                                <div className="space-50"></div>
                                <p>Viña Emiliana ha implementado a través de su sitio web un sistema sencillo y
                                    eficiente de reporte de denuncias anónimas.</p>

                                <p>De esta forma empleados, clientes, proveedores, accionistas y terceros pueden hacer
                                    una denuncia anónima, con carácter de confidencial, con respecto a temas
                                    relacionados con la contabilidad, fraudes, salvaguarda de activos, asuntos de
                                    auditoría o cualquier otro relacionado con el control interno de la Compañía.</p>

                                <p>Suministre todos los detalles relacionados con la presunta infracción, inclusive las
                                    ubicaciones de los testigos y cualquier otra información que pueda ser valiosa en la
                                    evaluación y resolución final de esta situación. Antes de hacer su denuncia le
                                    recomendamos leer el “Procedimiento de Denuncias Anónimas de Viña Emiliana”</p>
                                <div className="space-50"></div>
                                <a className="waves-effect btn btn-large btn-descarga z-depth-0">Procedimiento de
                                    Denuncias Anónimas de Viña Emiliana <i className="fas fa-download"></i></a>
                                <div className="space-50"></div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <ul className="tabs tabs-fixed-width z-depth-0">
                                        <li className="tab col s3"><a className="active" href="#formdenuncias">FORMULARIO
                                            DE DENUNCIAS</a></li>
                                        <li className="tab col s3"><a href="#formseguimiento">SEGUIMIENTO DE
                                            DENUNCIA</a></li>

                                    </ul>
                                </div>
                                <div id="formdenuncias" className="col s12">
                                    <Formulario />
                                </div>

                                <div id="formseguimiento" className="col s12">
                                    <div className="space-30"></div>
                                    <div className="row center">

                                        <div className="col s12">
                                            <p><b>Puede ingresar a continuación el código de su denuncia para obtener el
                                                estado de avance.</b></p>
                                        </div>
                                        <div className="space-30"></div>
                                        <div className="input-field col s12 fix">
                                            <input id="first_name" type="text" className="validate"/>
                                                <label htmlFor="first_name">Código de seguimiento</label>
                                                <div className="space-30"></div>
                                                <a className="waves-effect btn btn-large btn-next btn-first z-depth-0 blue lighten-1">Consultar</a>
                                        </div>

                                        <div className="space-30"></div>
                                        <div className="col s12">
                                            <p><b>El estado de su denuncia es el siguiente.</b></p>
                                        </div>
                                        <div className="col s12">
                                            <table>
                                                <tbody>
                                                <tr className="border-top">
                                                    <td className="min-width-table desc">Código de denuncia</td>
                                                    <td> RAYU-6U7P-T34P</td>

                                                </tr>
                                                <tr>
                                                    <td className="desc">Fecha de solicitud realizada</td>
                                                    <td>26/06/2020 09:16 pm</td>
                                                </tr>
                                                <tr>
                                                    <td className="desc">Estado</td>
                                                    <td>Procesando</td>
                                                </tr>
                                                <tr>
                                                    <td className="desc">Mensaje</td>
                                                    <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                                                        blandit augue lacus, eu efficitur purus euismod ut. Praesent
                                                        viverra nisl vel lorem posuere convallis. Duis sit amet tempor
                                                        arcu, vitae porta purus.
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>


        <footer className="page-footer color">

            <div className="row">
                <div className="col l3 s12 center">
                    <img className="logo" src="img/emiliana-logo.png"/>
                </div>
                <div className="col l3 s12 offset-l3">
                    <ul>
                        <li><a href="tel:+56223539130" target="_blank"><i className="fas fa-phone-alt"></i> +562 2 353
                            9130</a></li>
                        <li><a href="mailto:contacto@emiliana.cl" target="_blank"><i
                            className="fas fa-envelope"></i> contacto@emiliana.cl</a></li>
                        <li><a href="https://goo.gl/maps/RbhWYpgc2cEAh5QT7" target="_blank"><i
                            className="fas fa-map-marker-alt"></i><p className="direccion"> Edificio WTC Avenida Nueva
                            Tajamar 481 Of. 905. Torre Sur. Las Condes. Santiago. Chile</p></a></li>
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
    </div>
      </>
  );
};
