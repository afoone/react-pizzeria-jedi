import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchPizzasPromo } from '../actions'
import { Link } from 'react-router-dom'
import { db } from '../config/firebase'
import { UsuarioContext } from "../context/UsuarioProvider";
import '../css/PizzaList.css'
import { Button, Icon } from 'semantic-ui-react'
import { ToastContainer } from "react-toastify";
import "../css/Promo.css"



const PromoPage = props => {
    if (localStorage.length !== 0) localStorage.removeItem("pizza")

    const { usuario, agregarProducto } = React.useContext(
        UsuarioContext
    );
    console.log("usu", usuario.role)


    const { dispatch } = props;
    //console.log("propiedades en PizzaList", props)
    useEffect(
        () => {
            console.log("did mount");
            dispatch(fetchPizzasPromo())
        },
        [dispatch]
    )

    const onBorrarClicked = id => {
        console.log("elemento a borrar", id)
        db.collection("pizzas").doc(id).delete().then(
            res => {
                console.log(res)

            }
        ).then(dispatch(fetchPizzasPromo()))
    }

    return (
        <div className="tarjeta">

            {
                props.pizzas.map(
                    e =>
                    <div>
                        <div className="ui card">
                            <div className="image">
                                <img src={e.image} />
                            </div>
                            <div className="content">
                                <a className="header">{e.name}</a>
                                <div className="meta">
                                    <span className="date">{e.price}{" "}€</span>
                                </div>
                                <div className="description">
                                    En promoción limitada
                                        <br />
                                    <Link to={`/pizzaId/${e.id}`}>vER{" "}</Link>
                                    <Button animated='vertical' onClick={() => agregarProducto(e.id, e.name)}>
                                        <Button.Content hidden>Shop</Button.Content>
                                        <Button.Content visible>
                                            <Icon name='shop' />
                                        </Button.Content>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        </div>

                )
            }
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
        </div>
    )
}


function mapStateToProps(state) {
    return {
        pizzas: state.pizzas
    }
}

export default connect(mapStateToProps)(PromoPage)