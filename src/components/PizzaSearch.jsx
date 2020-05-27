import React, { Fragment } from "react";
import ModalImage from './ModalImage';
import { FiltroContext } from "../context/FiltroProvider";
import { Card, Image, Message, Icon } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import '../css/PizzaSearch.css'
import {
  removeArrayDuplicates
} from "../context/constants";


import PromoPage from "../pages/PromoPage"

const PizzaSearch = () => {
  const {
    pizzasFiltradas,
    ingredientes_Pizzas,
    buscarPizzas,
    setBuscarPizzas
  } = React.useContext(FiltroContext);

  console.log("ingredientes buscados", ingredientes_Pizzas);
  console.log("search", pizzasFiltradas);
  console.log("buscarPizzas", buscarPizzas);


  const [singleIngredientFilter, setSingleIngredientFilter] = React.useState([]);
  const [singlePizzasFilter, setSinglePizzasFilter] = React.useState([]);
  const [singleProductCart, setSingleProductCart] = React.useState([]);

  React.useEffect(() => {
      
     

    const allIngredientsId = removeArrayDuplicates(ingredientes_Pizzas);
    const allPizzasId = removeArrayDuplicates(pizzasFiltradas);

    const allProductsId = allPizzasId.concat(allIngredientsId)
    const arrayFinalSearch = removeArrayDuplicates(allProductsId);


    setSingleProductCart(arrayFinalSearch)
    setSingleIngredientFilter(allIngredientsId);
    setSinglePizzasFilter(allPizzasId)
  }, [ingredientes_Pizzas, pizzasFiltradas]);

  // console.log('array ingredients sin duplicados', singleIngredientFilter)
  //console.log('array pizzas sin duplicados', singlePizzasFilter)
  console.log('array busqueda sin duplicados', singleProductCart)

  return (

    <div className='pizza-search' >
      {buscarPizzas ? null : <Redirect to='/'></Redirect>}
      {ingredientes_Pizzas.length > 0 || pizzasFiltradas.length > 0 ? null :
        (
          <Fragment>

            <div className='mensaje'>
              <Message negative>
                <Message.Header >
                  Lo sentimos mucho no hay resultados de su busqueda<Icon name="frown outline" size="large" />
                </Message.Header>
                <p><strong>Pruebe con otra busqueda o mire nuestras Pizzas y Promociones</strong></p>
              </Message>
            </div>

            <PromoPage />
          </Fragment>
        )
      }

      {singleProductCart.map((item, index) => (

        <div className='search-card'>
          <Card className='tarjeta-pizza' key={index}>
            <Image src={item.image} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{item.name}</Card.Header>
              <Card.Meta>{item.price} €</Card.Meta>
              {item.novelty === true ? (
                <Card.Description><p>Novedad!!</p></Card.Description>
              ) : (
                  <Card.Description>
                    Prueba nuestras pizzas clasicas
                  </Card.Description>
                )}
            </Card.Content>
            <Card.Content extra>
              <a>
                <ModalImage 
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  id={item.id}
                  ingredientes={item.ingredientes}
                ></ModalImage>
               
              </a>
            </Card.Content>
          </Card>
        </div>

      ))}


    </div>
  );
};

export default PizzaSearch;
