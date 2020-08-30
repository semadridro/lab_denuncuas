import React, {useState, useEffect, useReducer, useContext} from 'react';
import {useAuth} from '../context/auth';
import {getDenuncias, getUser} from '../api/auth';
import {Link} from "react-router-dom";

import {makeStyles} from '@material-ui/core/styles';
import {getIntendedUrl, getToken} from '../utils/auth';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import MaterialTable from 'material-table'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import WatchLaterIcon from '@material-ui/icons/WatchLater';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import BlockIcon from '@material-ui/icons/Block';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import VisibilityIcon from '@material-ui/icons/Visibility';


function createData (name, code, population, size) {
    const density = population / size;
    return {name, code, population, size, density};
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
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Home () {

    const [dataRow, setDataRows] = useState([]);
    const [dataColumns, setDataColums] = useState([
        { title: 'N° Seguimiento', field: 'codigo' },
        { title: 'Fecha', field: 'fecha' },
        { title: 'Tipo', field: 'tipo' },
        { title: 'Mensaje', field: 'mensaje' },
        {
            title: 'Detalle',
            field: 'detalle',
            render: rowData => <Link  to={'/detalle/' + rowData.id}><VisibilityIcon/></Link>
        },
    ])

    const fetchData = () => {
        return getToken()
            ? getDenuncias()
            : Promise.resolve(null);
    };

    useEffect(() => {
        fetchData().then((data) => {
            console.log(data);
            setDataRows(data)
        });
    }, []);


    const classes = useStyles();
    const [value, setValue] = React.useState('Pendientes');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Container>
                <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
                    <BottomNavigationAction label="Pendientes" value="Pendientes" icon={<WatchLaterIcon />} />
                    <BottomNavigationAction label="Procesando" value="Procesando" icon={<AutorenewIcon />} />
                    <BottomNavigationAction label="Concluidas" value="Concluidas" icon={<CheckBoxIcon />} />
                    <BottomNavigationAction label="Spam" value="Spam" icon={<BlockIcon />} />
                </BottomNavigation>

                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <MaterialTable
                                title="Listado Denuncias "
                                columns={dataColumns}
                                data={dataRow}
                                options={{
                                    search: false,
                                    toolbar: false,
                                    actionsColumnIndex: -1
                                }}
                                localization={{
                                    body: {
                                        editTooltip: 'Editar',
                                        deleteTooltip: 'Borrar',
                                        editRow: {
                                            deleteText: '¿Estás seguro de eliminar este documento?',
                                            cancelTooltip: 'No',
                                            saveTooltip: 'Si',
                                        }
                                    },
                                    header: {
                                        actions: ''
                                    },

                                }}
                            />
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
    );
}
