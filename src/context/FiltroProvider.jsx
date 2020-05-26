import React from 'react'
import { db } from "../config/firebase";
import {Link} from 'react-router-dom'

export const FiltroContext = React.createContext();





const FiltroProvider = (props) => {

    const [pizzas, setPizzas] = React.useState([])


    React.useEffect(() => {

        db.collection("pizzas").get()
        .then(
            res => {
               // console.log("listado de Pizzas", res.docs)
               const resultado = res.docs.map(
                item => {
                    const data = item.data();
                    return {
                        id: item.id,
                        image: data.image,
                        name: data.name,
                        novelty: data.novelty,
                        price: data.price,
                        ingredientes: data.ingredientes
                    }
                }
              )
       //  console.log('Listado de Pizzas', resultado)
            setPizzas(resultado)
           // setError('succes')
            }        
        )
        .catch(
          console.log('hay un error')
         // setError("error")
          );
     // console.log("listado de Pizzas", pizzas)
    
   
    
    }, []);
    



const ListadoIngredientes = (pizzas) => {

    
        const arrayIngredientes = [];
        pizzas.forEach((pizza) => {
          pizza.ingredientes.forEach((ingrediente) => {
          
              arrayIngredientes.push(ingrediente);
            })
          })
        return arrayIngredientes



}







    const [pizzasFiltradas, setPizzasFiltradas] = React.useState([{}]);


    const [buscarPizzas, setBuscarPizzas] = React.useState('')
    //console.log('buscar pizzas', buscarPizzas)
    const [consultar, setConsultar] = React.useState(false)
    //console.log('consultar', consultar)
    
React.useEffect(() => {
  //  console.log("listado de Pizzas", pizzas)
   // console.log('buscar pizzas', buscarPizzas.toUpperCase())
   // console.log('consultar', consultar)

    const ingredientesPizza =  ListadoIngredientes(pizzas)
    console.log('ingredientes', ingredientesPizza)


  if (consultar){

 
  const Filtradas = pizzas.filter(
        e => (e.name.toUpperCase().includes(buscarPizzas.toUpperCase() ) ) )
            
   
   console.log('pizzasfiltradas', Filtradas)
{/**

const Filtradas_por_Ingredientes = pizzas.filter(e => (
    (e.ingredientes.forEach(ingrediente => 
        console.log(ingrediente.label.toUpperCase().includes(buscarPizzas.toUpperCase())) 
      //  (ingrediente.label.toUpperCase().includes(buscarPizzas.toUpperCase()))
        ))
   )) 
       

*/}
   
       
  
   setPizzasFiltradas(Filtradas)

 // console.log('pizzasfiltradas', pizzasFiltradas)


}

}, [buscarPizzas])


    return (
        <FiltroContext.Provider
        value={{
           pizzas,
           setBuscarPizzas,
           consultar,
           setConsultar,
           pizzasFiltradas           
          }}>
            {props.children}
        </FiltroContext.Provider>
    )
}

export default FiltroProvider
