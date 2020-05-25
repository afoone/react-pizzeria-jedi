import React, { Component } from 'react'
import '../css/PizzaAdd.css'
import { db } from '../config/firebase'
import { Button } from 'semantic-ui-react'
import { Link} from "react-router-dom";
export class IngredienteAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: "",
            value: "",
            price: 0
        }
    }


    onNameChange = e => {
        const nombre = e.target.value
        this.setState(
            {
                label: nombre,
                value: nombre
            }
        )
    }
    onPrecioChange = e => {
        const nombre = e.target.value
        this.setState(
            {
                price: nombre
            }
        )
    }


    onSubmitClick = e => {
        e.preventDefault();

        const ingrediente = {
            label: this.state.label,
            value: this.state.value,
            price: this.state.price
        }

        db.collection("ingredientes").add(ingrediente).then(
            res => {
                console.log('ingrediente grabado correctamente')
            }

        )
    }


    render() {
        return (
            <div className='pizza-add'>
                <form className="ui form">
                    <div className="field">
                        <label>Nombre del ingrediente</label>
                        <input placeholder="Nombre ingrediente"
                            onChange={this.onNameChange}
                            value={this.state.label}
                        />
                        <label>Precio del ingrediente</label>
                        <input type='number' placeholder="Precio ingrediente"
                            onChange={this.onPrecioChange}
                            value={this.state.price}
                        />

                    </div>
                </form>
                <button onClick={this.onSubmitClick}
                    type="submit" className="ui button">Guardar</button>
                <Link to="/pizzaAdd">
                    <Button>
                        <p>Volver</p>
                    </Button>
                </Link>
            </div>
        )
    }
}

export default IngredienteAdd
