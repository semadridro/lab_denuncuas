import React, {useState, useEffect, useReducer, useContext} from 'react';
import {useAuth} from '../context/auth';
import {getDenuncias, getUser} from '../api/auth';

import {makeStyles} from '@material-ui/core/styles';
import {getIntendedUrl, getToken} from '../utils/auth';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import MaterialTable from 'material-table'


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
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Container>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <MaterialTable
                                title="Listado Denuncias "
                                columns={dataColumns}
                                data={dataRow}
                                actions={[
                                    {
                                        icon: 'visibilityIcon',
                                        tooltip: 'Detalle',
                                        onClick: (event, rowData) => alert("You saved " + rowData.name)
                                    }
                                ]}
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
