import React, {useState, useEffect, useReducer, useContext} from 'react';
import {useAuth} from '../context/auth';
import {getDenuncias, getDetalleDenuncia, getUser, postChangeDenuncia} from '../api/auth';
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

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


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

export default function Home (props) {

    const [estado, setEstado] = useState(0);
    const [dataRow, setDataRows] = useState([]);
    const [dataRowTodo, setDataRowsTodo] = useState([]);
    const [dataRow1, setDataRows1] = useState([]);
    const [dataRow2, setDataRows2] = useState([]);
    const [dataRow3, setDataRows3] = useState([]);
    const [dataColumns, setDataColums] = useState([
        { title: 'N° Seguimiento', field: 'codigo' },
        { title: 'Fecha', field: 'fecha' },
        { title: 'Tipo', field: 'tipo' },
        { title: 'Mensaje', field: 'mensaje' },
        {
            title: 'Detalle',
            field: 'detalle',
            render: rowData => <Link to={'/detalle/' + rowData.id}><VisibilityIcon/></Link>
        },
    ])

    const fetchData = () => {
        return getDenuncias({id_estado: estado});
    };

    useEffect(() => {
        fetchData().then((data) => {
            console.log(data);
            setDataRowsTodo(data);
            setDataRows(data);
        });
    }, []);


    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setEstado(newValue)
        //setDataRows([])
        console.log(newValue)

        getDenuncias({id_estado: newValue})
            .then((data) => {
                console.log(data);
                setDataRows(data);
            })
            .catch(error => {
                error.json().then(({errors}) => {
                    console.log(errors);
                });
            });
    };

    const changeState = (id_estado) => {
        setDataRows([])
        console.log(newValue)
        setEstado(newValue)
    }

    return (
        <>
            <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
                <BottomNavigationAction label="Pendientes" value={0} icon={<WatchLaterIcon />} />
                <BottomNavigationAction label="Procesando" value={1} icon={<AutorenewIcon />} />
                <BottomNavigationAction label="Concluidas" value={2} icon={<CheckBoxIcon />} />
                <BottomNavigationAction label="Spam" value={3} icon={<BlockIcon />} />
            </BottomNavigation>
            <Container>

                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                            <TableContainer component={Paper} elevation={5} className={'padinginfofix'}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>N° Seguimiento</TableCell>
                                            <TableCell >Fecha</TableCell>
                                            <TableCell >Tipo</TableCell>
                                            <TableCell >Mensaje</TableCell>
                                            <TableCell align="right">Detalle</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {dataRow.map((row) => (
                                            <TableRow key={row.name}>
                                                <TableCell component="th" scope="row">
                                                    {row.codigo}
                                                </TableCell>
                                                <TableCell >{row.fecha}</TableCell>
                                                <TableCell >{row.tipo}</TableCell>
                                                <TableCell className={'truncar'}>{row.mensaje}</TableCell>
                                                <TableCell align="right"><Link to={'/detalle/' + row.id}><VisibilityIcon/></Link></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
    );
}
