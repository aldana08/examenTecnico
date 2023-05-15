import React from 'react'

export default function Item({elemento, seleccionarProvincia}) {;
    return (
        <>
             <tr>
              <td>{elemento.id}</td>
                <td>{elemento.nombre}</td>
                <td><button className="btn btn-info" onClick={() => seleccionarProvincia(elemento, 'Editar')}> Editar </button> {"   "} 
                <button className="btn btn-danger" onClick={() => seleccionarProvincia(elemento, 'Eliminar')}> Eliminar </button></td>
             </tr>
        </>
    )
}