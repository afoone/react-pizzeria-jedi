import React from 'react'
// import { UsuarioContext } from "../context/UsuarioProvider";




const MiCarrito = ({user}) => {
    
// const {  usuario, productos, cargarProductos, agregarProductos } = React.useContext(UsuarioContext);

// console.log('usuario que viene de context', usuario.uid)
console.log('usuario que viene de props', user.uid)


    return (
        <div>
            <h1>Mi Carrito</h1>
        </div>
    )
}

export default MiCarrito

