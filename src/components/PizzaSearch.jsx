import React from "react";
import ModalImage from './ModalImage';
import { FiltroContext } from "../context/FiltroProvider";
import { Card, Image, Message, Icon } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import '../css/PizzaSearch.css'
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


  return (

    <div className='pizza-search' >
      {buscarPizzas ? null : <Redirect to='/'></Redirect>}
      {ingredientes_Pizzas.length > 0 || pizzasFiltradas.length > 0 ? null :
        (
          <>
            <Message negative>
              <Message.Header>
                Lo sentimos mucho no hay resultados de su busqueda<Icon name="frown outline" size="large" />
              </Message.Header>
              <p><strong>Pruebe con otra busqueda o mire nuestras Pizzas y Promociones</strong></p>
            </Message>
            <PromoPage />
          </>
        )
      }
      <>
        {pizzasFiltradas.map((item, index) => (
          <>
            <div>
              <Card className='tarjeta-pizza'>
                <Image src={item.image} wrapped ui={false} />
                <Card.Content >
                  <Card.Header >{item.name}</Card.Header>
                  <Card.Meta>{item.price} €</Card.Meta>
                  {
                    item.novelty === true ? <Card.Description>Novedad!! </Card.Description> :
                      <Card.Description>Prueba nuestras pizzas clasicas</Card.Description>
                  }

                </Card.Content>
                <Card.Content extra>
                  <>
                    <ModalImage image={item.image} name={item.name} price={item.price} id={item.id}></ModalImage>

                  </>
                </Card.Content>
              </Card>
            </div>
          </>
        ))}
        {ingredientes_Pizzas.map((item, index) => (
          <Card key={index}>
            <Image src={item.image} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{item.name}</Card.Header>
              <Card.Meta>{item.price} €</Card.Meta>
              {item.novelty === true ? (
                <Card.Description>Novedad!! </Card.Description>
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
                ></ModalImage>
                <Icon name="zoom-in" size="large" />
              </a>
            </Card.Content>
          </Card>
        ))}
      </>
    </div>
  );
};

export default PizzaSearch;
