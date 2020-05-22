import React, { Component } from 'react'
import '../css/PizzaAdd.css'
import { db } from '../config/firebase'

export class IngredienteAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: "",
            value: ""
        }
    }


    onNameChange = e => {
        const nombre = e.target.value
        this.setState(
            {
                label: nombre
            }
        )
    }
    onPrecioChange = e => {
        const nombre = e.target.value
        this.setState(
            {
                value: nombre
            }
        )
    }


    onSubmitClick = e => {
        e.preventDefault();

        const ingrediente = {
            label: this.state.label,
            value: this.state.value
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
                        value={this.state.value}
                    />

                </div>
                </form>
                <button onClick={this.onSubmitClick}  
                  type="submit" className="ui button">Guardar</button>
            </div>
        )
    }
}

export default IngredienteAdd
