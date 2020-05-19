import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchPizzas } from '../actions'

const PizzaList = props => {

    const { dispatch } = props;
    console.log("propiedades en PizzaList",props)
    useEffect(
        () => {
            console.log("did mount");
            dispatch(fetchPizzas())
        },
        [dispatch]
    )

    return (
        <div className="pizza-list">
            {props.pizzas.map(
                item => <div> {item.id} {item.name}</div>
            )}
        </div>
    )
}


function mapStateToProps(state) {
    return {
        pizzas: state.pizzas
    }
}

export default connect(mapStateToProps)(PizzaList)