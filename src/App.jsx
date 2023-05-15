import React, {useState} from 'react';
import ItemTabla from './ItemTabla';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

function App() {

  const dataProvincias = [
    { id: 1, nombre: "Buenos Aires"},
    { id: 2, nombre: "Cordoba"},
    { id: 3, nombre: "Misiones"},
    { id: 4, nombre: "Mendoza"},
    { id: 5, nombre: "Salta"},
    { id: 6, nombre: "Jujuy"},
  ];

  const [data, setData] = useState(dataProvincias);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);


  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState({
    id: '',
    nombre: '',
  });

  const seleccionarProvincia = (elemento, caso) => {
    setProvinciaSeleccionada(elemento);
    (caso==='Editar') ? setModalEditar(true) : setModalEliminar(true);
  }

  const handleChange = e => {
    const {name, value} = e.target;
    setProvinciaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const editar = () => {
    let dataNueva = data;
    dataNueva.map(provincia => { 
      if(provincia.id === provinciaSeleccionada.id) {
        provincia.nombre = provinciaSeleccionada.nombre;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar = () => {
    setData(data.filter(provincia => provincia.id !== provinciaSeleccionada.id));
    setModalEliminar(false);
  }

  return (
    <div className = "App">
      <h2 className = "title">Listado Provincias de Argentina (2023)</h2>
      <table className = "table table-bordered">
        <thead>
          <tr className = "table-danger">
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className = "table-warning">
          {data.map((elemento, i) =>(
            <ItemTabla key={i} elemento={elemento} seleccionarProvincia={seleccionarProvincia}/>
          ))
          }
        </tbody>
      </table>

      <Modal isOpen = {modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Provincia</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className = "form-group">
            <label>ID</label>
            <input
              className = "form-control"
              readOnly
              type = "text"
              name = "id"
              value = {provinciaSeleccionada && provinciaSeleccionada.id}
            />
            <br />

            <label>Provincia</label>
            <input
              className = "form-control"
              type = "text"
              name = "nombre"
              value = {provinciaSeleccionada && provinciaSeleccionada.nombre}
              onChange = {handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className = "btn btn-info" onClick={() => editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>


      <Modal isOpen = {modalEliminar}>
        <ModalBody>
          ¿Estás Seguro que deseas eliminar la provincia {provinciaSeleccionada && provinciaSeleccionada.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className = "btn btn-danger" onClick={() => eliminar()}>
            Sí
          </button>
          <button
            className = "btn btn-secondary"
            onClick={() => setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
