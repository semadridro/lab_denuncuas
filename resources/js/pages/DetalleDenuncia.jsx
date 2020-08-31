import React, {useState, useEffect, useReducer, useContext} from 'react';
import {useAuth} from '../context/auth';
import {getDetalleDenuncia, postChangeDenuncia, postChangeStatus,getUser} from '../api/auth';

import { browserHistory } from 'react-router'

import {makeStyles} from '@material-ui/core/styles';
import {getIntendedUrl, getToken} from '../utils/auth';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import AutorenewIcon from '@material-ui/icons/Autorenew';
import BlockIcon from '@material-ui/icons/Block';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        maxHeight: 600,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function DetalleDenuncia (props) {
    console.log('props');
    console.log(props);
    console.log(props.match.params.id);


    const classes = useStyles();
    const id_denuncia = props.match.params.id;
    const [dataRow, setDataRows] = useState([]);
    const [dataAdicional, setDataAdicional] = useState([]);

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const fetchDenuncias = (id_denuncia) => {

        let formData = new FormData();
        formData.append('id_denuncia', id_denuncia);

        return getDetalleDenuncia({id_denuncia: id_denuncia});
    };

    useEffect(() => {
        fetchDenuncias(id_denuncia).then((data) => {
            console.log(data);
            setDataRows(data);
            setDataAdicional(JSON.parse(data.dataJson));
        });
    }, []);

    const [state, setState] = React.useState({
        Estado: dataRow.id_estado ? dataRow.id_estado : 0,
        name: 'Pendiente',
    });

    const [submitData, setSubmitData] = useState({
        listado: {
            id_denuncia: id_denuncia,
            id_estado: dataRow.id_estado ? dataRow.id_estado : 0,
            mensaje: '',
        },
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });

        setSubmitData({
            ...submitData,
            listado: {
                ...submitData.listado,
                id_estado: event.target.value
            }
        });
    };

    const handlerSubmit = () => {

        console.log(submitData);
        setOpen(true);

        let jsonData = JSON.stringify(submitData);
        postChangeDenuncia({datos: jsonData})
            .then((data) => {
                console.log(data);
                /*setDataRows(data);
                setDataAdicional(JSON.parse(data.dataJson));*/
            })
            .catch(error => {
                error.json().then(({errors}) => {
                    console.log(errors);
                });
            });
        props.history.goBack()
    };


    const handlerChangeStatus = (id_estado) => {
        setOpen(true);

        let tempData = {
            id_estado: id_estado,
            id_denuncia: id_denuncia
        };

        let jsonData = JSON.stringify(tempData);

        postChangeStatus({datos: jsonData})
            .then((data) => {
                console.log(data);
                //props.history.goBack()
                /*setDataRows(data);
                setDataAdicional(JSON.parse(data.dataJson));*/
            })
            .catch(error => {
                error.json().then(({errors}) => {
                    console.log(errors);
                });
            });

        props.history.goBack()

    }

    return (
        <>
            <Container>
                {console.log('dataRow')}
                {console.log(dataRow)}
                {console.log(dataAdicional)}
                <div className={classes.root}>
                    <Grid container spacing={3} direction="row" ustify="center">
                        <Grid item xs={8}>
                            <Paper className={classes.paper} elevation={3}>
                                <Grid container spacing={3} direction="row" ustify="center">
                                    <Grid item xs={12}>
                                        <Typography variant="h5" gutterBottom>
                                            <Button color="primary" onClick={() => props.history.goBack()}> <ArrowBackIosIcon /></Button>  Denuncia
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>

                                        <table className={'highlight'}>
                                            <tbody>
                                            <tr>
                                                <td>Número seguimiento</td>
                                                <td>{dataRow.codigoReg}</td>
                                            </tr>
                                            <tr>
                                                <td>Nombre Denunciante</td>
                                                <td>{dataAdicional.nomnbreApellido}</td>
                                            </tr>
                                            <tr>
                                                <td>Relación con la compañia</td>
                                                <td>{dataAdicional.relacionCompany}</td>
                                            </tr>
                                            <tr>
                                                <td>Tipo de denuncia</td>
                                                <td>{dataRow.tipo_denuncia}</td>
                                            </tr>
                                            <tr>
                                                <td>Personas comprometidas</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Detalles Adicionaes</td>
                                                <td>{dataRow.mensaje}</td>
                                            </tr>
                                            <tr>
                                                <td>Documentos Adjuntos</td>
                                                <td></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </Grid>
                                </Grid>
                                {dataRow.id_estado == 0 || dataRow.id_estado == null ?
                                <Grid
                                    container
                                    direction="row"
                                    justify="flex-end"
                                    alignItems="center"
                                >
                                    <Button variant="contained" color="primary" onClick={() => handlerChangeStatus(1)}>
                                        <AutorenewIcon /> Procesar
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={() => handlerChangeStatus(3)}>
                                        <BlockIcon />
                                    </Button>

                                </Grid> : '' }

                            </Paper>
                        </Grid>
                        {dataRow.id_estado == 1 ? <Grid item m={4} xs={4}>
                            <Paper className={classes.paper} elevation={3}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" gutterBottom>
                                            Mensaje
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            className={classes.formControl}
                                            id="standard-multiline-static"
                                            label="Escribe un mensaje a la persona"
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            onChange={(event) => {
                                                event.persist();
                                                submitData.listado.mensaje = event.target.value;
                                                setSubmitData({
                                                    ...submitData,
                                                    listado: {
                                                        ...submitData.listado,
                                                        mensaje: event.target.value
                                                    }
                                                });
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="flex-end"
                                        alignItems="center"
                                    >
                                        <Button variant="contained" color="primary" onClick={handlerSubmit}>
                                            <CheckBoxIcon /> Concluir
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Paper>
                        </Grid> : ''}
                        {dataRow.id_estado == 2 ? <Grid item m={4} xs={4}>
                            <Paper className={classes.paper} elevation={3}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" gutterBottom>
                                            Mensaje enviado a denunciantes
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" gutterBottom>
                                            {dataRow.respuesta}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid> : ''}
                    </Grid>
                </div>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} key={"top" + "center"}>
                    <Alert onClose={handleClose} severity="success">
                        Cambio realizado con éxito
                    </Alert>
                </Snackbar>
            </Container>
        </>
    );
}
