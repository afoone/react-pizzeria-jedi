import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchPizzas } from '../actions'
import { Link } from 'react-router-dom'

const PizzaList = props => {

    const { dispatch } = props;
    console.log("propiedades en PizzaList", props)
    useEffect(
        () => {
            console.log("did mount");
            dispatch(fetchPizzas())
        },
        [dispatch]
    )

    return (
        <div className="pizza-list">
            <table className="ui striped table unstackable">
                <thead>
                    <tr>
                        <th>Id</th>
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
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>{e.novelty?"Sí":"No"}</td>
                                <td>{e.price}</td>
                                <td><img src="http://soloqueso.com/wp-content/uploads/2018/11/Pizza-Margarita-1300x680.jpg" alt="" border="3" height="100" width="100"></img></td>
                                <td>
                                    <Link to={
                                        {pathname:'/pizzaId', pizza:e}
                                    }>
                                        <div>Ver</div>
                                            </Link>
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