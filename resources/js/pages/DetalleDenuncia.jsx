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
}));

export default function DetalleDenuncia (props) {
    console.log("props")
    console.log(props)
    console.log(props.match.params.id)

    const classes = useStyles();
    const id_denuncia = props.match.params.id;
    const [dataRow, setDataRows] = useState([]);
    const [dataAdicional, setDataAdicional] = useState([]);

    const fetchDenuncias = (id_denuncia) => {

        let formData = new FormData();
        formData.append('id_denuncia', id_denuncia);

        return getDetalleDenuncia({id_denuncia: id_denuncia})
    };

    useEffect(() => {
        fetchDenuncias(id_denuncia).then((data) => {
            console.log(data);
            setDataRows(data);
            setDataAdicional(JSON.parse(data.dataJson))
        });
    }, []);

    return (
        <>
            <Container>
                {console.log("dataRow")}
                {console.log(dataRow)}
                {console.log(dataAdicional)}
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item m={8} xs={8}>
                            <Paper className={classes.paper} elevation={3}>
                                <Typography className={classes.title}>
                                    Denuncia
                                </Typography>


                                <table className={"highlight"}>
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


                            </Paper>
                        </Grid>
                        <Grid item m={4} xs={4}>
                            <Paper className={classes.paper} elevation={3}>xs=4</Paper>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
    );
}
