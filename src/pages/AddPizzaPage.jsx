import React, { Component } from 'react'
import PizzaAdd from '../components/PizzaAdd'
import { db } from '../config/firebase';


export class AddPizzaPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
            ingredientesList:[],
          
        }
    }

    componentDidMount(){
        db.collection("ingredientes").get().then(
            res => {
                this.setState(
                    {
                        ingredientesList: res.docs.map(
                            item => {
                                return {
                                    id: item.id,
                                    label: item.data().label,
                                    value: item.data().value,
                                    price: item.data().price
                                }
                            }
                        )
                      }
                    )
                })
            }
    render() {
        console.log('despues R',this.state.ingredientesList)
        
   
        return (

            <PizzaAdd ingredientesList={this.state.ingredientesList}></PizzaAdd>

        )
    }
}

export default AddPizzaPage
