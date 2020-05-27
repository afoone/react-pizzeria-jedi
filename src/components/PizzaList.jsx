import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchPizzas, deletePizza } from '../actions'
import { Link } from 'react-router-dom'
import { db } from '../config/firebase'
import { UsuarioContext } from "../context/UsuarioProvider";
import '../css/PizzaList.css'
import { Button, Icon } from 'semantic-ui-react'
import { ToastContainer } from "react-toastify";



const PizzaList = props => {
    if (localStorage.length !== 0) localStorage.removeItem("pizza")

    const { usuario, agregarProducto} = React.useContext(
        UsuarioContext
      );
    console.log("usu", usuario.role)
    

    const { dispatch } = props;
    //console.log("propiedades en PizzaList", props)
    useEffect(
        () => {
            console.log("did mount");
            dispatch(fetchPizzas())
        },
        [dispatch]
    )

    const onBorrarClicked = pizza => {
        dispatch(deletePizza(pizza))
    }

    return (
        <>
        <div id="lista" className="pizza-list">
            <table className="ui striped table unstackable">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Novedad</th>
                        <th>Precio</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {
                        props.pizzas.map(
                            e => <tr key={e.id}>
                                <td>{e.name}</td>
                                <td>{e.novelty ? "Sí" : "No"}</td>
                                <td>{e.price} €</td>
                                <td><img src={e.image} alt="" border="3" height="100" width="100"></img></td>
                                <td>
                                    <Link to={`/pizzaId/${e.id}`}>vER</Link>{" "}
                                    {usuario.role==="admin"?
                                    <><Link to={`/pizzaedit/${e.id}`}>Editar</Link>{" "}
                                    <a href="#lista" onClick={() => onBorrarClicked(e)}>Borrar</a></>:""}
                                    
                                    <Button animated='vertical' onClick={() => agregarProducto(e.id, e.name)}>
                                         <Button.Content hidden>Shop</Button.Content>
                                                <Button.Content visible>
                                            <Icon name='shop' />
                                        </Button.Content>
                                    </Button>
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </table>
        </div>
        <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange={false}
        draggable
        pauseOnHover={false}
      ></ToastContainer>
      </>
    )
}


function mapStateToProps(state) {
    return {
        pizzas: state.pizzas
    }
}

export default connect(mapStateToProps)(PizzaList)