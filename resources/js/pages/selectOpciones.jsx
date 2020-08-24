import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class SelectOpciones extends Component {
    componentDidUpdate() {
        M.AutoInit();
    }
    render () {
        return (
            <>
                <select onChange={(event) => {
                    event.persist();
                    console.log(submitData)
                    submitData.listado.relacionCompany = event.target.value
                    setSubmitData({
                        ...submitData,
                        listado: {...submitData.listado, relacionCompany: event.target.value}
                    } )
                    console.log(event.target.value);
                    console.log(submitData)
                }}>
                    <option>Seleccione</option>
                    <option value="1">Trabjador de Emiliana</option>
                    <option value="2">Cliente destribuidos</option>
                    <option value="3">Cliente consumidor</option>
                    <option value="4">Proveedor</option>
                    <option value="5">Contratista</option>
                    <option value="0">Otro</option>
                </select>
            </>
        );
    }
}

export default SelectOpciones;
