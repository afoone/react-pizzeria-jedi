import React, { Component } from 'react'
import '../css/PizzaAdd.css'
import { Dropdown, Image, Checkbox } from 'semantic-ui-react'
import { db } from '../config/firebase'


const options = [
    { key: 'Tomate', text: 'Tomate', value: 'Tomate' },
    { key: 'lechuga', text: 'lechuga', value: 'lechuga' },
    { key: 'Queso', text: 'Queso', value: 'Queso' },
    { key: 'Beacon', text: 'Beacon', value: 'Beacon' },

]





const CheckboxExampleToggle = () => <Checkbox toggle />

const ImageExampleLink = () => (
    <Image
        src='https://res.cloudinary.com/teepublic/image/private/s--HAbB7O3b--/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_42332c,e_outline:48/co_42332c,e_outline:inner_fill:48/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1503352207/production/designs/1840529_1.jpg'
        as='a'
        size='medium'
        href='http://google.com'
        target='_blank'
    />
)



export class PizzaAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            image: "",
            price: '',
            novelty: false,
            ingrediente:'',
            redirect: false
        }
    }
  

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

    oningredienteChange = (e, value) => {
        
               console.log('options',e, value)
                
            
        
    }

    onSubmitClick = e => {
        e.preventDefault();
      
        const pizzas = {
            name: this.state.name,
            image: this.state.image,
            price: this.state.price,
            novelty: this.state.novelty,

        }
       
            db.collection("pizzas").add(pizzas).then(
                res =>{
                 
                }
                  
            )
        }

    render() {
        console.log('state',this.state)
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
                    
                   <CheckboxExampleToggle  ></CheckboxExampleToggle>
                
                    <div className='select-ingrediente'  >

                    <Dropdown
                      placeholder='Ingredientes...' 
                      fluid multiple selection options={options}
                      
                      onClick={(e, {value})=>this.oningredienteChange(options)}
                      />
                    </div>

                    <div className="field">
                        <label>URL de la Imagen</label>
                        <input placeholder="URL de la Imagen..."
                        onChange={this.onImageChange}
                        value={this.state.image}
                        />
                        </div>
                    <div>
                        <ImageExampleLink></ImageExampleLink>
                    </div>
                </form>
                <button onClick={this.onSubmitClick} type="submit" className="ui button">Guardar</button>
            </div>
        )
    }
}

export default PizzaAdd
