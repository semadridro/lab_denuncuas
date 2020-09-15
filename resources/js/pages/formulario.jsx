import React, {useState, useRef, Component} from 'react';
import ReactDOM from 'react-dom';
import {registroDenuncia} from '../api/auth';

import {makeStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';

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

    const [codigo, setcodigo] = useState(Math.random().toString(36).slice(2));
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
            IdentificarPersonas: '',
            IdentificarPersonasDetalle: '',
            IndentificarLugarHechos: '',
            IndentificarLugarHechosDetalle: '',
            IdentificarFecha: '',
            IdentificarFechaDetalle: '',
            ComoseEntero: '',
            ComoseEnteroDetalle: '',
            detalleGeneral: '',
        },
        codigo: codigo,
        files : ''
    });
    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const [showNombre, setshowNombre] = useState(false);
    const [statusBtn, setstatusBtn] = useState(true);
    const [loading, setloading] = useState(false);

    const [steep, setSteep] = useState(0);
    const form = useRef(null);
    const [resetFeedback, setResetFeedback] = useState('');
    const [files, setFiles] = useState();

    const onSubmit = async (event, submitData) => {
        setloading(true);
        console.log('guardo la data');
        console.log(submitData);
        event.preventDefault();
        setcodigo(Math.random().toString(36).slice(2));

        let jsonData = JSON.stringify(submitData);
        console.log(jsonData)

        let formData = new FormData();

        /*console.log("files.current")
        console.log(files)
        for (let i = 0; i < files.length; i++) {
            console.log(files[i])
            formData.append('file' + i, files[i]);
        }*/

        formData.append('dataJson', JSON.stringify(submitData));

        console.log(formData)

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

        registroDenuncia({dataJson: jsonData})
            .then(status => {
                console.log('status.status');
                console.log(status);
                setResetFeedback(status);
                let stCodigo = status;
                setcodigo(status)
                console.log('stCodigo');
                console.log(stCodigo);
                console.log(resetFeedback);
                console.log(codigo);
                console.log(status);
            })
            .catch(error => {
                error.json().then(({errors}) => {
                    console.log(errors);
                });
            });
    };

    {/*  <div className="col s12"><LinearProgress/> Denuncia realiza con éxito, el código asignado es <b>{Math.random().toString(36).slice(2)}</b></div> : resetFeedback != '' ?*/
    }
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
                    {loading ? <div className="col s12">
                        <Alert variant="filled" severity="success">
                            Denuncia realiza con éxito, el código asignado es <b>{codigo}</b>
                        </Alert>
                    </div> : <>

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
                                <RadioGroup aria-label="gender" name="gender1"
                                            value={submitData.listado.identificarse}
                                            onChange={(event) => {
                                                event.persist();
                                                console.log(submitData);
                                                setstatusBtn(false)
                                                submitData.listado.identificarse = event.target.value;
                                                setSubmitData({
                                                    ...submitData,
                                                    listado: {
                                                        ...submitData.listado,
                                                        identificarse: event.target.value
                                                    }
                                                });
                                                console.log(event.target.value);
                                                console.log(submitData);
                                            }}>
                                    <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                    <FormControlLabel value="no" control={<Radio/>} label="No"/>
                                </RadioGroup>
                            </FormControl>

                            {submitData.listado.identificarse == 'si' ? <div className="col s12 respuesta">
                                <label htmlFor="first_name">Nombres y Apellidos</label>
                                <input placeholder="Nombres y Apellidos" id="first_name" type="text"
                                       className="validate"
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
                                                setstatusBtn(false)
                                                submitData.listado.relacionCompany = event.target.value;
                                                setSubmitData({
                                                    ...submitData,
                                                    listado: {
                                                        ...submitData.listado,
                                                        relacionCompany: event.target.value
                                                    }
                                                });
                                                console.log(event.target.value);
                                                console.log(submitData);
                                            }}>
                                    <FormControlLabel value="Trabjador de Emiliana" control={<Radio/>}
                                                      label="Trabjador de Emiliana"/>
                                    <FormControlLabel value="Cliente destribuidor" control={<Radio/>}
                                                      label="Cliente destribuidor"/>
                                    <FormControlLabel value="Cliente consumidor" control={<Radio/>}
                                                      label="Cliente consumidor"/>
                                    <FormControlLabel value="Proveedor" control={<Radio/>} label="Proveedor"/>
                                    <FormControlLabel value="Contratista" control={<Radio/>} label="Contratista"/>
                                    <FormControlLabel value="Otro" control={<Radio/>} label="Otro"/>
                                </RadioGroup>
                            </FormControl>

                            {submitData.listado.relacionCompany == 'Otro' ?
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
                                                setstatusBtn(false)
                                                submitData.listado.queHara = event.target.value;
                                                setSubmitData({
                                                    ...submitData,
                                                    listado: {...submitData.listado, queHara: event.target.value}
                                                });
                                                console.log(event.target.value);
                                                console.log(submitData);
                                            }}>
                                    <FormControlLabel value="Sugerencias y/o Reclamos Internos" control={<Radio/>}
                                                      label="Sugerencias y/o Reclamos Internos"/>
                                    <FormControlLabel value="Realizar una denuncia" control={<Radio/>}
                                                      label="Realizar una denuncia"/>
                                </RadioGroup>
                            </FormControl>

                            {submitData.listado.queHara == 'Sugerencias y/o Reclamos Internos' ?
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
                                <RadioGroup aria-label="gender" name="gender1"
                                            value={submitData.listado.TipoDenunci}
                                            onChange={(event) => {
                                                event.persist();
                                                console.log(submitData);
                                                setstatusBtn(false)
                                                submitData.listado.TipoDenunci = event.target.value;
                                                setSubmitData({
                                                    ...submitData,
                                                    listado: {
                                                        ...submitData.listado,
                                                        TipoDenunci: event.target.value
                                                    }
                                                });
                                                console.log(event.target.value);
                                                console.log(submitData);
                                            }}>
                                    <FormControlLabel value="Aspectos contables y de auditoria" control={<Radio/>}
                                                      label="Aspectos contables y de auditoria"/>
                                    <FormControlLabel value="Confidencialidad" control={<Radio/>}
                                                      label="Confidencialidad"/>
                                    <FormControlLabel value="Conflicto de interés" control={<Radio/>}
                                                      label="Conflicto de interés"/>
                                    <FormControlLabel value="Apropiación indebida y/o desvío de recursos"
                                                      control={<Radio/>}
                                                      label="Apropiación indebida y/o desvío de recursos"/>
                                    <FormControlLabel value="Protección del medio ambiente" control={<Radio/>}
                                                      label="Protección del medio ambiente"/>
                                    <FormControlLabel value="Falsificación de contratos, registros o informes"
                                                      control={<Radio/>}
                                                      label="Falsificación de contratos, registros o informes"/>
                                    <FormControlLabel value="Cohecho - Soborno a funcionario público" control={<Radio/>}
                                                      label="Cohecho - Soborno a funcionario público"/>
                                    <FormControlLabel value="Cohecho - Soborno entre privados" control={<Radio/>}
                                                      label="Cohecho - Soborno entre privados"/>
                                    <FormControlLabel value="Corrupción" control={<Radio/>} label="Corrupción"/>
                                    <FormControlLabel value="Compra de especies robadas" control={<Radio/>}
                                                      label="Compra de especies robadas"/>
                                    <FormControlLabel
                                        value="Mal uso de dineros de la empresa (tarjetas de créditos, fondos fijos, etc.)"
                                        control={<Radio/>}
                                        label="Mal uso de dineros de la empresa (tarjetas de créditos, fondos fijos, etc.)"/>
                                    <FormControlLabel value="Actuaciones relacionadas con contratistas"
                                                      control={<Radio/>}
                                                      label="Actuaciones relacionadas con contratistas"/>
                                    <FormControlLabel value="Represalias, discriminación" control={<Radio/>}
                                                      label="Represalias, discriminación"/>
                                    <FormControlLabel value="Seguridad en el trabajo" control={<Radio/>}
                                                      label="Seguridad en el trabajo"/>
                                    <FormControlLabel value="Infracciones relacionadas con valores o títulos"
                                                      control={<Radio/>}
                                                      label="Infracciones relacionadas con valores o títulos"/>
                                    <FormControlLabel value="Acoso sexual" control={<Radio/>} label="Acoso sexual"/>
                                    <FormControlLabel value="Acoso laboral" control={<Radio/>} label="Acoso laboral"/>
                                    <FormControlLabel value="Otros" control={<Radio/>} label="Otros"/>
                                </RadioGroup>
                            </FormControl>


                            {submitData.listado.TipoDenunci == 'Otros' ?
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
                                <h5>¿Puede identificar a las personas involucradas en la denuncia?</h5>
                            </div>

                            <FormControl className={classes.formControl}>
                                <RadioGroup aria-label="gender" name="gender1"
                                            value={submitData.listado.IdentificarPersonas}
                                            onChange={(event) => {
                                                event.persist();
                                                console.log(submitData);
                                                setstatusBtn(false)
                                                submitData.listado.IdentificarPersonas = event.target.value;
                                                setSubmitData({
                                                    ...submitData,
                                                    listado: {
                                                        ...submitData.listado,
                                                        IdentificarPersonas: event.target.value
                                                    }
                                                });
                                                console.log(event.target.value);
                                                console.log(submitData);
                                            }}>
                                    <FormControlLabel value="si" control={<Radio/>} label="Si"/>
                                    <FormControlLabel value="no" control={<Radio/>} label="No"/>
                                </RadioGroup>
                            </FormControl>

                            {submitData.listado.IdentificarPersonas == 'si' ?
                                <div className="col s12 respuesta">
                                    <div className="input-field">
                                <textarea id="textarea1" className="materialize-textarea" onChange={(event) => {
                                    event.persist();
                                    console.log(submitData);
                                    submitData.listado.IdentificarPersonasDetalle = event.target.value;
                                    setSubmitData({
                                        ...submitData,
                                        listado: {...submitData.listado, IdentificarPersonasDetalle: event.target.value}
                                    });
                                    console.log(event.target.value);
                                    console.log(submitData);
                                }}></textarea>
                                        <label htmlFor="textarea1">Indicar fecha exacta o aproximada de ocurrencia
                                            de
                                            los
                                            hechos denunciados</label>
                                    </div>
                                </div> : ''}
                        </> : ''}


                        {steep == 6 ? <>
                            <div className="col s12 pregunta">
                                <h5>¿Puede identificar donde sucedieron los hechos de su denuncia?</h5>
                            </div>

                            <FormControl className={classes.formControl}>
                                <RadioGroup aria-label="gender" name="gender1"
                                            value={submitData.listado.IndentificarLugarHechos}
                                            onChange={(event) => {
                                                event.persist();
                                                console.log(submitData);
                                                setstatusBtn(false)
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
                                <textarea id="textarea1" className="materialize-textarea"
                                          onChange={(event) => {
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
                                        <label htmlFor="textarea1">Nombre de los involucrados y cargos si los supiese</label>
                                    </div>
                                </div> : ''}
                        </> : ''}

                        {steep == 7 ? <>
                            <div className="col s12 pregunta">
                                <h5>¿Puede indicar cuando (fecha exacta o aproximada) sucedieron los hechos de su
                                    denuncia?</h5>
                            </div>

                            <FormControl className={classes.formControl}>
                                <RadioGroup aria-label="gender" name="gender1"
                                            value={submitData.listado.IdentificarFecha}
                                            onChange={(event) => {
                                                event.persist();
                                                console.log(submitData);
                                                setstatusBtn(false)
                                                submitData.listado.IdentificarFecha = event.target.value;
                                                setSubmitData({
                                                    ...submitData,
                                                    listado: {
                                                        ...submitData.listado,
                                                        IdentificarFecha: event.target.value
                                                    }
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
                                        <label htmlFor="textarea1">Indicar fecha exacta o aproximada de ocurrencia
                                            de
                                            los
                                            hechos denunciados</label>
                                    </div>
                                </div> : ''}
                        </> : ''}


                        {steep == 8 ? <>
                            <div className="col s12 pregunta">
                                <h5>¿Cómo se enteró de los hechos que está denunciando?</h5>
                            </div>

                            <FormControl className={classes.formControl}>
                                <RadioGroup aria-label="gender" name="gender1"
                                            value={submitData.listado.ComoseEntero}
                                            onChange={(event) => {
                                                event.persist();
                                                console.log(submitData);
                                                setstatusBtn(false)
                                                submitData.listado.ComoseEntero = event.target.value;
                                                setSubmitData({
                                                    ...submitData,
                                                    listado: {
                                                        ...submitData.listado,
                                                        ComoseEntero: event.target.value
                                                    }
                                                });
                                                console.log(event.target.value);
                                                console.log(submitData);
                                            }}>
                                    <FormControlLabel value="Me sucedió a mi" control={<Radio/>}
                                                      label="Me sucedió a mi"/>
                                    <FormControlLabel value="Lo observé" control={<Radio/>} label="Lo observé"/>
                                    <FormControlLabel value="Lo escuché" control={<Radio/>} label="Lo escuché"/>
                                    <FormControlLabel value="Un compañero de trabajo me lo comentó" control={<Radio/>}
                                                      label="Un compañero de trabajo me lo comentó"/>
                                    <FormControlLabel value="Encontré accidentalmente un informe o archivo"
                                                      control={<Radio/>}
                                                      label="Encontré accidentalmente un informe o archivo"/>
                                    <FormControlLabel value="La deduje" control={<Radio/>} label="La deduje"/>
                                    <FormControlLabel value="Otra" control={<Radio/>} label="Otra"/>
                                </RadioGroup>
                            </FormControl>

                            {submitData.listado.ComoseEntero == 'Otra' ?
                                <div className="col s12 respuesta">
                                    <div className="input-field">
                                <textarea id="textarea1" className="materialize-textarea" onChange={(event) => {
                                    event.persist();
                                    console.log(submitData);
                                    setstatusBtn(false)
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


                        {steep == 9 ? <>
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
                                    setstatusBtn(false)
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

                        {steep == 10 ? <>
                            <div className="col s12 pregunta">
                                <h5>Si dispone de algún documento, fotografía o archivo que apoye su informe, por
                                    favor
                                    súbalo al sistema</h5>
                            </div>
                            <div className="file-field input-field">
                                <div className="btn">
                                    <span>Adjuntar archivo</span>
                                    <input type="file" onChange={(event) => {
                                        event.preventDefault()
                                        console.log("ARCHIVOS")
                                        console.log(event.target.files)
                                        setFiles(event.target.files)
                                        setSubmitData({
                                            ...submitData,
                                            files: event.target.files
                                        });
                                    }}/>
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text"/>
                                </div>
                            </div>
                        </> : ''}


                        {steep > 0 ? <>
                            <div className="col s3 m2">
                                <button type={"button"} className={steep > 1 ? 'waves-effect btn btn-large btn-next btn-volver red lighten-2' : 'waves-effect btn btn-large btn-next btn-volver red lighten-2 disabled'}
                                   onClick={() => {
                                       console.log('next paso');
                                       console.log(steep);
                                       setSteep(parseInt(steep - 1));
                                   }}> <i className="fas fa-long-arrow-alt-left"></i></button>
                            </div>
                            <div className="col s9 m10">
                                <button type={"button"} disabled={steep > 9 ? false : statusBtn} className="waves-effect btn btn-large z-depth-0 lighten-2 color-next"
                                   onClick={() => {
                                       console.log('next paso');
                                       console.log(steep);
                                       console.log("bloqueo btn")
                                       setstatusBtn(true);
                                       submitData.listado.queHara == 'Sugerencias y/o Reclamos Internos' || steep > 9 ? onSubmit(event, submitData) : setSteep(parseInt(steep + 1));
                                   }}>Continuar</button>
                            </div>
                        </> : ''}
                    </>}

                </div>
            </FormControl>
        </>
    );
}
