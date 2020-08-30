import React, {useState, useEffect, useReducer, useContext} from 'react';
import {useAuth} from '../context/auth';
import {getDetalleDenuncia, getUser} from '../api/auth';

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

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

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
        Estado: 0,
        name: 'Pendiente',
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    return (
        <>
            <Container>
                {console.log('dataRow')}
                {console.log(dataRow)}
                {console.log(dataAdicional)}
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item m={8} xs={8}>
                            <Paper className={classes.paper} elevation={3}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" gutterBottom>
                                            Denuncia
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
                                                <td>{dataRow.tip_denuncia}</td>
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

                            </Paper>
                        </Grid>
                        <Grid item m={4} xs={4}>
                            <Paper className={classes.paper} elevation={3}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" gutterBottom>
                                            Acciones
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <InputLabel htmlFor="outlined-age-native-simple">Estado</InputLabel>
                                            <Select
                                                native
                                                value={state.Estado}
                                                onChange={handleChange}
                                                label="Estado"
                                                inputProps={{
                                                    name: 'Estado',
                                                    id: 'outlined-age-native-simple',
                                                }}
                                            >
                                                <option aria-label="None" value="" />
                                                <option value={0}>Pendiente</option>
                                                <option value={1}>Procesando</option>
                                                <option value={2}>Concluidas</option>
                                                <option value={3}>Spam</option>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            className={classes.formControl}
                                            id="standard-multiline-static"
                                            label="Escibe un mensaje a la persona"
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" color="primary">
                                            Guardar
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
);
}
