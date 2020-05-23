import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchPizzas } from '../actions'
import { Link } from 'react-router-dom'
import { db } from '../config/firebase'
import { UsuarioContext } from "../context/UsuarioProvider";




const PizzaList = props => {


    const { usuario} = React.useContext(
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

    const onBorrarClicked = id => {
        console.log("elemento a borrar", id)
        db.collection("pizzas").doc(id).delete().then(
            res => {
                console.log(res)

            }
        ).then(dispatch(fetchPizzas()))
    }

    return (
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
                                <td>{e.price}</td>
                                <td><img src={e.image} alt="" border="3" height="100" width="100"></img></td>
                                <td>
                                    <Link to={`/pizzaId/${e.id}`}>vER</Link>{" "}
                                    {usuario.role==="admin"?
                                    <><Link to={`/pizzaedit/${e.id}`}>Editar</Link>{" "}
                                    <a href="#lista" onClick={() => onBorrarClicked(e.id)}>Borrar</a></>:""}
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </table>
        </div>
    )
}


function mapStateToProps(state) {
    return {
        pizzas: state.pizzas
    }
}

export default connect(mapStateToProps)(PizzaList)