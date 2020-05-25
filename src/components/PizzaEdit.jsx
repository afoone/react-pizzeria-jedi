import React, { Component } from 'react'
import '../css/PizzaAdd.css'
import { Image, Checkbox } from 'semantic-ui-react'
import { db } from '../config/firebase'
import MultiSelect from "react-multi-select-component"
import { Link } from "react-router-dom"

export class PizzaEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            price: "",
            image: "",
            novelty: false,
            redirect: false,
            ingredientes: [],
            ingredientesL: []
        }
    }


    componentDidMount() {
        db.collection("pizzas").doc(this.props.match.params.id).get().then(
            res =>
                this.setState({
                    name: res.data().name,
                    price: res.data().price,
                    image: res.data().image,
                    novelty: res.data().novelty,
                    ingredientes: res.data().ingredientes
                })
        ).then(
            db.collection("ingredientes").get().then(
                res => {
                    console.log("component did mount", res)
                    const elementos = res.docs.map(
                        item => {
                            const data = item.data();
                            return {
                                id: item.id,
                                label: data.label,
                                value: data.value,
                                price: data.price
                            }
                        }
                    )
                    this.setState({
                        ingredientesL: elementos
                    })
                    console.log("ingredientes", this.state.ingredientesL)
                }
            ))
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

    CheckboxExampleToggle = () => <Checkbox toggle checked={this.state.novelty} onChange={this.onNoveltyChange} />

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

        db.collection("pizzas").doc(this.props.match.params.id).set(pizzas).then(
            res => {
                console.log('pizza editada correctamente')
                this.setState({
                    redirect: true
                })
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
                        <Link className='link-ingredientes' to="/ingrediente">Añade nuevo ingrediente</Link>
                        <br></br>
                        <h4 className='ingrediente-select'>ingredientes</h4>
                        <br></br>
                        <div className='select-ingrediente'  >
                            <MultiSelect
                                options={this.state.ingredientesL}
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

export default PizzaEdit
