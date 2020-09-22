import React, {useState, useRef, Component} from 'react';
import ReactDOM from 'react-dom';
import {getDenunciaCodigo} from '../api/auth';

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

export default function BuscoDenuncia () {

    const [codigo, setcodigo] = useState('');
    const [detalle, setDetalle] = useState(false);
    const [dataRow, setDataRows] = useState([]);

    const handlerSearch = () => {
        console.log('busco Codigo');

        if (codigo != '') {
            getDenunciaCodigo({codigo: codigo}).then((data) => {
                console.log(data);
                setDataRows(data);
            });

        }
    };

    return (
        <>
            <div className="space-30"></div>
            <div className="row center">

                <div className="col s12">
                    <p><b>Puede ingresar a continuación el código de su denuncia para obtener el
                        estado de avance.</b></p>
                </div>
                <div className="space-30"></div>
                <div className="input-field col s12 fix">
                    <input id="first_name" type="text" className="validate"
                           onChange={(event) => {
                               event.persist();
                               setcodigo(event.target.value);
                           }}
                    />
                    <label htmlFor="first_name">Código de seguimiento</label>
                    <div className="space-30"></div>
                    <a className="waves-effect btn btn-large btn-next btn-first z-depth-0 blue lighten-1"
                       onClick={() => handlerSearch()}>Consultar</a>
                </div>

                <div className="space-30"></div>
                <div className="col s12">
                    <p><b>El estado de su denuncia es el siguiente.</b></p>
                </div>
                {dataRow != "" && dataRow != null?
                <div className="col s12">
                    <table>
                        <tbody>
                        <tr className="border-top">
                            <td className="min-width-table desc">Código de denuncia</td>
                            <td> {dataRow.codigoReg}</td>

                        </tr>
                        <tr>
                            <td className="desc">Fecha de solicitud realizada</td>
                            <td>{dataRow.created_at}</td>
                        </tr>
                        <tr>
                            <td className="desc">Estado</td>
                            <td>{(dataRow.id_estado == 1 || dataRow.id_estado) == 0? <p>En Proceso</p> : dataRow.id_estado == 2 ? <p>Concluida</p> : dataRow.id_estado == 3 ? <p>Su denuncia se ha identificado cómo spam, inténtalo nuevamente.</p> : ''}</td>
                        </tr>
                        <tr>
                            <td className="desc">Mensaje</td>
                            <td>{dataRow.respuesta}</td>
                        </tr>
                        </tbody>
                    </table>
                </div> : codigo != "" && dataRow == null?<div className="col s12">
                        <Alert variant="filled" severity="warning">
                            Código <b>{codigo} consutado sin registros</b>
                        </Alert>
                    </div> : '' }
            </div>
        </>
    );
}
