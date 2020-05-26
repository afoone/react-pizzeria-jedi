import React from 'react'
import { db } from "../config/firebase";


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
  
   
    
    }, [setPizzas]);
    











const [pizzasFiltradas, setPizzasFiltradas] = React.useState([{}]);


const [buscarPizzas, setBuscarPizzas] = React.useState('')
//console.log('buscar pizzas', buscarPizzas)
const [consultar, setConsultar] = React.useState(false)
//console.log('consultar', consultar)

const [ingredientes_Pizzas, setIngredientes_Pizzas] = React.useState([{}])

React.useEffect(() => {




if (consultar){


const Filtradas = pizzas.filter(

    e => (e.name.toUpperCase().includes(buscarPizzas.toUpperCase() ) ) )
        

console.log('pizzasfiltradas', Filtradas)


 const array = []
 pizzas.filter(e => (

 (e.ingredientes.forEach(ingrediente =>{ 
  
  if(ingrediente.label.toUpperCase().includes(buscarPizzas.toUpperCase()) === true) {
     console.log( ingrediente.label, e)
     array.push(e)
   //  setBuscaPizzas([...buscaPizzas, e])
     console.log('array',array)
  }

  }))

) 
)


setIngredientes_Pizzas(array)
//console.log('nuevas pizzars',  buscaPizzas)

setPizzasFiltradas(Filtradas)
//console.log('nuevas pizzars',  pizzasFiltradas)



}

}, [buscarPizzas])


return (
    <FiltroContext.Provider
    value={{
       pizzas,
       setBuscarPizzas,
       buscarPizzas,
       consultar,
       setConsultar,
       pizzasFiltradas ,
       setIngredientes_Pizzas,
       ingredientes_Pizzas  
      }}>
        {props.children}
    </FiltroContext.Provider>
)
}

export default  FiltroProvider
