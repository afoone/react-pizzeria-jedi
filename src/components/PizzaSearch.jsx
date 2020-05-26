import React from "react";
import ModalImage from './ModalImage';
import { FiltroContext } from "../context/FiltroProvider";
import { Card, Image } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import '../css/PizzaSearch.css'

const PizzaSearch = () => {
  const { pizzasFiltradas,  pizzas, buscarPizzas} = React.useContext(FiltroContext);

  console.log("searcg", pizzasFiltradas, buscarPizzas);


 

  return (
   
    <div className='pizza-search' >
    { buscarPizzas ? null : <Redirect to='/'></Redirect> }
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
                item.novelty === true ?  <Card.Description>Novedad!! </Card.Description> :
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
      </>
    </div>
  );
};

export default PizzaSearch;
