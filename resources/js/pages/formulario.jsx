import React, {useState, useRef, Component} from 'react';
import ReactDOM from 'react-dom';
import {registroDenuncia} from '../api/auth';

import {makeStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {forgotPassword, resetPassword} from '../api/auth';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function Formulario () {

    const [submitData, setSubmitData] = useState({
        listado: {
            identificarse: '',
            nomnbreApellido: '',
            relacionCompany: '',
            relacionCompanyOtro: '',
            queHara: '',
            queHaraDetalle: '',
            TipoDenunci: '',
            TipoDenunciaOtro: '',
            IndentificarLugarHechos: '',
            IndentificarLugarHechosDetalle: '',
            IdentificarFecha: '',
            IdentificarFechaDetalle: '',
            ComoseEntero: '',
            ComoseEnteroDetalle: '',
            detalleGeneral: '',
        },
    });
    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const [showNombre, setshowNombre] = useState(false);
    const [steep, setSteep] = useState(0);
    const form = useRef(null);
    let [resetFeedback, setResetFeedback] = useState('');

    const onSubmit = async (event, submitData) => {
        console.log('guardo la data');
        console.log(submitData);
        event.preventDefault();

        let jsonData  = JSON.stringify(Object.entries(submitData.listado));


        let formData = new FormData();
        formData.append('dataJson', jsonData)

        /*try{
            let config = {
                method:'POST',
                header:{
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body: formData
            }

            console.log(formData)


            let res = await fetch('http://lab_denuncuas.test/api/denuncias/saveDate',config)

            console.log(res)

        }catch(e){
            console.log(e);
        }*/


        registroDenuncia({ dataJson: jsonData })
            .then(status => setResetFeedback(status))
            .catch(error => {
                error.json().then(({errors}) => {
                    console.log(errors);
                });
            })
    };

    return (
        <>
            <FormControl onSubmit={onSubmit} ref={form}>
                <div className="space-30">
                </div>
                <div className="row">
                    <div className="col s12">
                        <blockquote>
                            <p><b>Toda denuncia por este canal es anónima, salvo que usted decida
                                voluntariamente revelar su identidad, sin embargo, siempre se
                                mantendrá el carácter confidencial.</b></p>
                        </blockquote>
                    </div>
                    {steep == 0 ? <div className="col s12">
                        <a className="waves-effect btn btn-large btn-next btn-first z-depth-0 blue lighten-1"
                           onClick={() => {
                               console.log('STEEEP');
                               console.log(steep);
                               setSteep(1);
                           }}>Comenzar</a>
                    </div> : ''}

                    {steep == 1 ? <>
                        <div className="col s12 pregunta">
                            <h5>¿Desea Usted identificarse para efectos de su denuncia?</h5>
                        </div>

                        <FormControl className={classes.formControl}>
                            <RadioGroup aria-label="gender" name="gender1" value={submitData.listado.identificarse}
                                        onChange={(event) => {
                                            event.persist();
                                            console.log(submitData);
                                            submitData.listado.identificarse = event.target.value;
                                            setSubmitData({
                                                ...submitData,
                                                listado: {...submitData.listado, identificarse: event.target.value}
                                            });
                                            console.log(event.target.value);
                                            console.log(submitData);
                                        }}>
                                <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                <FormControlLabel value="no" control={<Radio/>} label="No"/>
                            </RadioGroup>
                        </FormControl>

                        {submitData.listado.identificarse == "si" ? <div className="col s12 respuesta">
                            <label htmlFor="first_name">Nombres y Apellidos</label>
                            <input placeholder="Nombres y Apellidos" id="first_name" type="text" className="validate"
                                   required onChange={(event) => {
                                event.persist();
                                console.log(submitData);
                                submitData.listado.nomnbreApellido = event.target.value;
                                setSubmitData({
                                    ...submitData,
                                    listado: {...submitData.listado, nomnbreApellido: event.target.value}
                                });
                                console.log(event.target.value);
                                console.log(submitData);
                            }}/>
                        </div> : ''} </> : ''}


                    {steep == 2 ? <>
                        <div className="col s12 pregunta">
                            <h5>¿Cuál es su relación con la compañía?</h5>
                        </div>
                        <FormControl className={classes.formControl}>
                            <RadioGroup aria-label="gender" name="gender1"
                                        value={submitData.listado.relacionCompany || 0}
                                        onChange={(event) => {
                                            event.persist();
                                            console.log(submitData);
                                            submitData.listado.relacionCompany = event.target.value;
                                            setSubmitData({
                                                ...submitData,
                                                listado: {...submitData.listado, relacionCompany: event.target.value}
                                            });
                                            console.log(event.target.value);
                                            console.log(submitData);
                                        }}>
                                <FormControlLabel value="1" control={<Radio/>} label="Trabjador de Emiliana"/>
                                <FormControlLabel value="2" control={<Radio/>} label="Cliente destribuidor"/>
                                <FormControlLabel value="3" control={<Radio/>} label="Cliente consumidor"/>
                                <FormControlLabel value="4" control={<Radio/>} label="Proveedor"/>
                                <FormControlLabel value="5" control={<Radio/>} label="Contratista"/>
                                <FormControlLabel value="99" control={<Radio/>} label="Otro"/>
                            </RadioGroup>
                        </FormControl>

                        {submitData.listado.relacionCompany == 99 ?
                            <div className="col s12 respuesta">
                                <div className="input-field">
                                <textarea id="textarea1" className="materialize-textarea" onChange={(event) => {
                                    event.persist();
                                    console.log(submitData);
                                    submitData.listado.relacionCompanyOtro = event.target.value;
                                    setSubmitData({
                                        ...submitData,
                                        listado: {...submitData.listado, relacionCompanyOtro: event.target.value}
                                    });
                                    console.log(event.target.value);
                                    console.log(submitData);
                                }}></textarea>
                                    <label htmlFor="textarea1">Detalles Otro</label>
                                </div>
                            </div> : ''}

                    </> : ''}

                    {steep == 3 ? <>
                        <div className="col s12 pregunta">
                            <h5>¿Qué desea hacer?</h5>
                        </div>

                        <FormControl className={classes.formControl}>
                            <RadioGroup aria-label="gender" name="gender1" value={submitData.listado.queHara}
                                        onChange={(event) => {
                                            event.persist();
                                            console.log(submitData);
                                            submitData.listado.queHara = event.target.value;
                                            setSubmitData({
                                                ...submitData,
                                                listado: {...submitData.listado, queHara: event.target.value}
                                            });
                                            console.log(event.target.value);
                                            console.log(submitData);
                                        }}>
                                <FormControlLabel value="11" control={<Radio/>}
                                                  label="Sugerencias y/o Reclamos Internos"/>
                                <FormControlLabel value="22" control={<Radio/>} label="Realizar una denuncia"/>
                            </RadioGroup>
                        </FormControl>

                        {submitData.listado.queHara == 11 ?
                            <div className="col s12 respuesta">
                                <div className="input-field">
                                <textarea id="textarea1" className="materialize-textarea" onChange={(event) => {
                                    event.persist();
                                    console.log(submitData);
                                    submitData.listado.queHaraDetalle = event.target.value;
                                    setSubmitData({
                                        ...submitData,
                                        listado: {...submitData.listado, queHaraDetalle: event.target.value}
                                    });
                                    console.log(event.target.value);
                                    console.log(submitData);
                                }}></textarea>
                                    <label htmlFor="textarea1">Descripción de la sugerencia o reclamo</label>
                                </div>
                            </div> : ''}


                    </> : ''}

                    {steep == 4 ? <>
                        <div className="col s12 pregunta">
                            <h5>Identificación del tipo de denuncia</h5>
                        </div>

                        <FormControl className={classes.formControl}>
                            <RadioGroup aria-label="gender" name="gender1" value={submitData.listado.TipoDenunci}
                                        onChange={(event) => {
                                            event.persist();
                                            console.log(submitData);
                                            submitData.listado.TipoDenunci = event.target.value;
                                            setSubmitData({
                                                ...submitData,
                                                listado: {...submitData.listado, TipoDenunci: event.target.value}
                                            });
                                            console.log(event.target.value);
                                            console.log(submitData);
                                        }}>
                                <FormControlLabel value="1" control={<Radio/>}
                                                  label="Aspectos contables y de auditoria"/>
                                <FormControlLabel value="2" control={<Radio/>} label="Confidencialidad"/>
                                <FormControlLabel value="3" control={<Radio/>} label="Conflicto de interés"/>
                                <FormControlLabel value="4" control={<Radio/>}
                                                  label="Apropiación indebida y/o desvío de recursos"/>
                                <FormControlLabel value="5" control={<Radio/>} label="Protección del medio ambiente"/>
                                <FormControlLabel value="6" control={<Radio/>}
                                                  label="Falsificación de contratos, registros o informes"/>
                                <FormControlLabel value="7" control={<Radio/>}
                                                  label="Cohecho - Soborno a funcionario público"/>
                                <FormControlLabel value="8" control={<Radio/>}
                                                  label="Cohecho - Soborno entre privados"/>
                                <FormControlLabel value="9" control={<Radio/>} label="Corrupción"/>
                                <FormControlLabel value="10" control={<Radio/>} label="Compra de especies robadas"/>
                                <FormControlLabel value="11" control={<Radio/>}
                                                  label="Mal uso de dineros de la empresa (tarjetas de créditos, fondos fijos, etc.)"/>
                                <FormControlLabel value="12" control={<Radio/>}
                                                  label="Actuaciones relacionadas con contratistas"/>
                                <FormControlLabel value="13" control={<Radio/>} label="Represalias, discriminación"/>
                                <FormControlLabel value="14" control={<Radio/>} label="Seguridad en el trabajo"/>
                                <FormControlLabel value="15" control={<Radio/>}
                                                  label="Infracciones relacionadas con valores o títulos"/>
                                <FormControlLabel value="16" control={<Radio/>} label="Acoso sexual"/>
                                <FormControlLabel value="17" control={<Radio/>} label="Acoso laboral"/>
                                <FormControlLabel value="19" control={<Radio/>} label="Otros"/>
                            </RadioGroup>
                        </FormControl>


                        {submitData.listado.TipoDenunci == 19 ?
                            <div className="col s12 respuesta">
                                <div className="input-field">
                                <textarea id="textarea1" className="materialize-textarea" onChange={(event) => {
                                    event.persist();
                                    console.log(submitData);
                                    submitData.listado.TipoDenunciaOtro = event.target.value;
                                    setSubmitData({
                                        ...submitData,
                                        listado: {...submitData.listado, TipoDenunciaOtro: event.target.value}
                                    });
                                    console.log(event.target.value);
                                    console.log(submitData);
                                }}></textarea>
                                    <label htmlFor="textarea1">Indicar</label>
                                </div>
                            </div> : ''}

                    </> : ''}


                    {steep == 5 ? <>
                        <div className="col s12 pregunta">
                            <h5>¿Puede indicar donde sucedieron los hechos de su denuncia?</h5>
                        </div>

                        <FormControl className={classes.formControl}>
                            <RadioGroup aria-label="gender" name="gender1"
                                        value={submitData.listado.IndentificarLugarHechos}
                                        onChange={(event) => {
                                            event.persist();
                                            console.log(submitData);
                                            submitData.listado.IndentificarLugarHechos = event.target.value;
                                            setSubmitData({
                                                ...submitData,
                                                listado: {
                                                    ...submitData.listado,
                                                    IndentificarLugarHechos: event.target.value
                                                }
                                            });
                                            console.log(event.target.value);
                                            console.log(submitData);
                                        }}>
                                <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                <FormControlLabel value="no" control={<Radio/>} label="No"/>
                            </RadioGroup>
                        </FormControl>

                        {submitData.listado.IndentificarLugarHechos == 'si' ?
                            <div className="col s12 respuesta">
                                <div className="input-field">
                                <textarea id="textarea1" className="materialize-textarea" onChange={(event) => {
                                    event.persist();
                                    console.log(submitData);
                                    submitData.listado.IndentificarLugarHechosDetalle = event.target.value;
                                    setSubmitData({
                                        ...submitData,
                                        listado: {
                                            ...submitData.listado,
                                            IndentificarLugarHechosDetalle: event.target.value
                                        }
                                    });
                                    console.log(event.target.value);
                                    console.log(submitData);
                                }}></textarea>
                                    <label htmlFor="textarea1">Nombrar lugar o licación donde sucedieron los
                                        hechos</label>
                                </div>
                            </div> : ''}
                    </> : ''}


                    {steep == 6 ? <>
                        <div className="col s12 pregunta">
                            <h5>¿Puede indicar cuando (fecha exacta o aproximada) sucedieron los hechos de su
                                denuncia?</h5>
                        </div>

                        <FormControl className={classes.formControl}>
                            <RadioGroup aria-label="gender" name="gender1" value={submitData.listado.IdentificarFecha}
                                        onChange={(event) => {
                                            event.persist();
                                            console.log(submitData);
                                            submitData.listado.IdentificarFecha = event.target.value;
                                            setSubmitData({
                                                ...submitData,
                                                listado: {...submitData.listado, IdentificarFecha: event.target.value}
                                            });
                                            console.log(event.target.value);
                                            console.log(submitData);
                                        }}>
                                <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                <FormControlLabel value="no" control={<Radio/>} label="No"/>
                            </RadioGroup>
                        </FormControl>

                        {submitData.listado.IdentificarFecha == 'si' ?
                            <div className="col s12 respuesta">
                                <div className="input-field">
                                <textarea id="textarea1" className="materialize-textarea" onChange={(event) => {
                                    event.persist();
                                    console.log(submitData);
                                    submitData.listado.IdentificarFechaDetalle = event.target.value;
                                    setSubmitData({
                                        ...submitData,
                                        listado: {...submitData.listado, IdentificarFechaDetalle: event.target.value}
                                    });
                                    console.log(event.target.value);
                                    console.log(submitData);
                                }}></textarea>
                                    <label htmlFor="textarea1">Indicar fecha exacta o aproximada de ocurrencia de los
                                        hechos denunciados</label>
                                </div>
                            </div> : ''}
                    </> : ''}


                    {steep == 7 ? <>
                        <div className="col s12 pregunta">
                            <h5>¿Cómo se enteró de los hechos que está denunciando?</h5>
                        </div>

                        <FormControl className={classes.formControl}>
                            <RadioGroup aria-label="gender" name="gender1" value={submitData.listado.ComoseEntero}
                                        onChange={(event) => {
                                            event.persist();
                                            console.log(submitData);
                                            submitData.listado.ComoseEntero = event.target.value;
                                            setSubmitData({
                                                ...submitData,
                                                listado: {...submitData.listado, ComoseEntero: event.target.value}
                                            });
                                            console.log(event.target.value);
                                            console.log(submitData);
                                        }}>
                                <FormControlLabel value="1" control={<Radio/>} label="Me sucedió a mi"/>
                                <FormControlLabel value="2" control={<Radio/>} label="Lo observé"/>
                                <FormControlLabel value="3" control={<Radio/>} label="Lo escuché"/>
                                <FormControlLabel value="4" control={<Radio/>}
                                                  label="Un compañero de trabajo me lo comentó"/>
                                <FormControlLabel value="6" control={<Radio/>}
                                                  label="Encontré accidentalmente un informe o archivo"/>
                                <FormControlLabel value="7" control={<Radio/>} label="La deduje"/>
                                <FormControlLabel value="99" control={<Radio/>} label="Otra"/>
                            </RadioGroup>
                        </FormControl>

                        {submitData.listado.ComoseEntero == 99 ?
                            <div className="col s12 respuesta">
                                <div className="input-field">
                                <textarea id="textarea1" className="materialize-textarea" onChange={(event) => {
                                    event.persist();
                                    console.log(submitData);
                                    submitData.listado.ComoseEnteroDetalle = event.target.value;
                                    setSubmitData({
                                        ...submitData,
                                        listado: {...submitData.listado, ComoseEnteroDetalle: event.target.value}
                                    });
                                    console.log(event.target.value);
                                    console.log(submitData);
                                }}></textarea>
                                    <label htmlFor="textarea1">Indicar</label>
                                </div>
                            </div> : ''}
                    </> : ''}


                    {steep == 8 ? <>
                        <div className="col s12 pregunta">
                            <h5>Suministre todos los detalles adicionales relacionados con la presunta
                                infracción que tenga conocimiento, y en general cualquier otra
                                información que pueda ser valiosa en la evaluación y resolución final de
                                esta situación (obligatoria) </h5>
                        </div>
                        <div className="col s12 respuesta">
                            <div className="input-field">
                                <textarea id="textarea1" className="materialize-textarea" onChange={(event) => {
                                    event.persist();
                                    console.log(submitData);
                                    submitData.listado.detalleGeneral = event.target.value;
                                    setSubmitData({
                                        ...submitData,
                                        listado: {...submitData.listado, detalleGeneral: event.target.value}
                                    });
                                    console.log(event.target.value);
                                    console.log(submitData);
                                }}></textarea>
                                <label htmlFor="textarea1">Detalles</label>
                            </div>
                        </div>
                    </> : ''}

                    {steep == 9 ? <>
                        <div className="col s12 pregunta">
                            <h5>Si dispone de algún documento, fotografía o archivo que apoye su informe, por favor
                                súbalo al sistema</h5>
                        </div>
                        <div className="file-field input-field">
                            <div className="btn">
                                <span>Adjuntar archivo</span>
                                <input type="file"/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text"/>
                            </div>
                        </div>
                    </> : ''}


                    {steep > 0 ? <>
                        <div className="col s3 m2">
                            <a className={steep > 1 ? 'waves-effect btn btn-large btn-next btn-volver red lighten-2' : 'waves-effect btn btn-large btn-next btn-volver red lighten-2 disabled'}
                               onClick={() => {
                                   console.log('next paso');
                                   console.log(steep);
                                   setSteep(parseInt(steep - 1));
                               }}> <i className="fas fa-long-arrow-alt-left"></i></a>
                        </div>
                        <div className="col s9 m10">
                            <a className="waves-effect btn btn-large z-depth-0 lighten-2 color-next" onClick={() => {
                                console.log('next paso');
                                console.log(steep);
                                submitData.listado.queHara == 11 || steep > 8 ? onSubmit(event, submitData) : setSteep(parseInt(steep + 1));
                            }}>Continuar</a>
                        </div>
                    </> : ''}

                </div>
            </FormControl>
        </>
    );
}
