import React, { useEffect, Fragment } from "react";
import Formulario from './formulario';
import BuscoDenuncia from './buscoCodigo';

import M from "materialize-css/dist/js/materialize.min.js";
import Header from './header';
import Footer from './Footer';

export default function Deuncias () {

    useEffect(() => {
        // Init Tabs Materialize JS
        let tabs = document.querySelectorAll(".tabs");
        M.Tabs.init(tabs);
    });

  return (<>
    <div>
        <Header/>

        <div className="container">
            <div className="section">

                <div className="row">
                    <div className="col s12 m12">
                        <div className="card-panel card-mod card-up z-depth-4">
                            <div className="row">
                                <h1 className="center-align">DENUNCIAS ANÓNIMAS</h1>
                                <div className="space-50"></div>

                                <p>Viñedos Emiliana S.A. y Filiales han implementado a través de su sitio web un sistema
                                    sencillo y eficiente de reporte de denuncias anónimas, sugerencias y/o reclamos.</p>
                                <p>De esta forma empleados, clientes, proveedores, accionistas y terceros pueden comunicar a
                                la Compañía, con carácter confidencial, respecto a la comisión de delitos contemplados en
                                la Ley 20.393, además de otros temas y delitos relacionados con actividades que pueden
                                implicar irregularidades, uso inadecuado de bienes o recursos de la Compañía, conductas
                                abusivas de ésta, violaciones al ordenamiento jurídico vigente o de nuestras políticas
                                corporativas. Si usted desea realizar una denuncia, le recomendamos suministrar todos los
                                detalles relacionados con la presunta infracción, inclusive las ubicaciones de los testigos y
                                cualquier otra información que pueda ser valiosa en la evaluación y resolución final de esta
                                    situación.</p>

                                <p>Adicionalmente se ha incorporado la opción de que a través de este canal se pueda hacer
                                llegar a la empresa cualquier sugerencia o reclamo del personal interno y/o colaboradores
                                externos con el objetivo de informar a la Administración de situaciones que a su entender
                                deben ser mejoradas o abordadas por la Compañía y que sean de interés tanto para los
                                trabajadores como para el entorno y comunidad donde Viñedos Emiliana S.A. y sus Filiales
                                desarrollan sus actividades administrativas, agrícolas, productivas, y comerciales.</p>

                                <p>Le sugerimos que antes de hacer su denuncia, sugerencia y/o reclamos, lea nuestro
                                <b> “Procedimiento de Denuncias Anónimas, sugerencias y/o reclamos de Viñedos
                                    Emiliana S.A. y Filiales” </b></p>

                                <div className="space-50"></div>
                                <a className="waves-effect btn btn-large btn-descarga z-depth-0"
                                   href={"doc/Procedimiento de Denuncias Anónimas, Sugerencias o Reclamos de Viñedos Emiliana S.A. y Filiales.pdf"}
                                download={"Procedimiento de Denuncias Anónimas, Sugerencias o Reclamos de Viñedos Emiliana S.A. y Filiales.pdf"}>Procedimiento de
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
                                    <BuscoDenuncia />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>


        <Footer />
    </div>
      </>
  );
};
