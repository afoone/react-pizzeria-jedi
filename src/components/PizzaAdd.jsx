import React, { Component } from 'react'
import '../css/PizzaAdd.css'
import { Image, Checkbox } from 'semantic-ui-react'
import { db } from '../config/firebase'
import MultiSelect from "react-multi-select-component";
import { Link} from "react-router-dom";

export class PizzaAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            image: "",
            price: '',
            novelty: false,
            ingredientes: [],
            redirect: false
        }
    }
    
   

    ImageExampleLink = () => (
        <Image
            src={this.state.image}
            as='a'
            size='medium'
            href='http://google.com'
            target='_blank'
        />
    )

    CheckboxExampleToggle = () => <Checkbox toggle onChange={this.onNoveltyChange} />

    onNameChange = e => {
        this.setState(
            {
                name: e.target.value 
            }
        )
    }
    onPriceChange = e => {
        this.setState(
            {
                price: e.target.value
            }
        )
    }
    onImageChange = e => {
        this.setState(
            {
                image: e.target.value
            }
        )
    }
    onNoveltyChange = e => {
        this.setState(
            {
                novelty: !this.state.novelty

            }
        )
    }

    oningredienteChange = (e) => {
        this.setState({
            ingredientes: e
        })

    }

    onSubmitClick = e => {
        e.preventDefault();

        const pizzas = {
            name: this.state.name,
            image: this.state.image,
            price: this.state.price,
            novelty: this.state.novelty,
            ingredientes: this.state.ingredientes

        }

        db.collection("pizzas").add(pizzas).then(
            res => {
                console.log('grabado correctamente')
            }

        )
    }
  

    render() {

        return (
            <div className='pizza-add'>
                <form className="ui form">
                    <div className="field">
                        <label>Nombre de Pizza</label>
                        <input placeholder="Nombre de pizza..."
                            onChange={this.onNameChange}
                            value={this.state.name}
                        />

                    </div>
                    <div className="field">
                        <label>Precio</label>
                        <input placeholder="Precio..."
                            onChange={this.onPriceChange}
                            value={this.state.price}
                        />
                    </div>

                    <div className='novedad-ingrediente'>

                        <h4>Novedad</h4>
                        <this.CheckboxExampleToggle />
                        <Link to="/ingrediente">Añade nuevo ingrediente</Link>
                        <br></br>
                        <h4 className='ingrediente-select'>ingredientes</h4>
                        <br></br>
                        <div className='select-ingrediente'  >
                            <MultiSelect
                                options={this.props.ingredientesList}
                                value={this.state.ingredientes}
                                onChange={this.oningredienteChange}
                                labelledBy={"Select"}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label>uRL de La imagen</label>
                        <input plceholder="URL de la Imagen..."
                            onChange={this.onImageChange}
                            value={this.state.image}
                        />
                    </div>
                    <div>
                        <this.ImageExampleLink></this.ImageExampleLink>
                    </div>
                </form>
                <button onClick={this.onSubmitClick}  
                  type="submit" className="ui button">Guardar</button>
            </div>
        )
    }
}

export default PizzaAdd
