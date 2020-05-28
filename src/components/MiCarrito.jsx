import React, { Fragment } from "react";
import { UsuarioContext } from "../context/UsuarioProvider";
import {
  STORAGE,
  removeArrayDuplicates,
  removeItemArray,
  countDuplicatesItemArray,
} from "../context/constants";
import { Button, Icon, Card } from "semantic-ui-react";
import "./miCarrito.css";

const MiCarrito = ({ user }) => {
  const {
    usuario,
    products,
    productsCart,
    cargarProductos,
    carritodataBase,
  } = React.useContext(UsuarioContext);
  // console.log('usuario que viene de context', usuario.uid)
  // console.log('usuario que viene de props', user.uid)

  const [singleProductCart, setSingleProductCart] = React.useState([]);
  const [cartTotalPrice, setcartTotalPrice] = React.useState(0);
  const [productMiCart, setProductMiCart] = React.useState([{}]);

  React.useEffect(() => {
    const allProductsId = removeArrayDuplicates(productsCart);
    // console.log('array sin duplicados', allProductsId)
    setSingleProductCart(allProductsId);
  }, [productsCart]);

  React.useEffect(() => {
    const productData = [];
    let totalPrice = 0;
    const allProductsId = removeArrayDuplicates(productsCart);
    //console.log('array total carrito', allProductsId)
    allProductsId.forEach((productId) => {
      const quantity = countDuplicatesItemArray(productId, productsCart);
      const productValue = {
        id: productId,
        quantity: quantity,
      };
      productData.push(productValue);
    });
    // console.log('array total carrito', productData) !loading &&
    // console.log('productos a recdorrer', products, productData)
    if (products) {
      const arrayMiCarrito = [];
      products.forEach((product) => {
        productData.forEach((item) => {
          if (product.id === item.id) {
            const totalValue = product.price * item.quantity;
            totalPrice = totalPrice + totalValue;
            arrayMiCarrito.push(product);
          }
        });
      });
      setProductMiCart(arrayMiCarrito);
    }

    setcartTotalPrice(totalPrice);
  }, [productsCart, products]);

  // vaciar carrito
  const emptyCart = () => {
    localStorage.removeItem(STORAGE);
    cargarProductos();
  };

  // añadir elemento al carrito
  const incrementCount = (id) => {
    const arrayItemsCard = productsCart;
    arrayItemsCard.push(id);
    localStorage.setItem(STORAGE, arrayItemsCard);
    cargarProductos();
  };

  // quitar elemento al carrito
  const descentCount = (id) => {
    const arrayItemsCard = productsCart;
    // console.log("id", id);
    const result = removeItemArray(arrayItemsCard, id.toString());
    localStorage.setItem(STORAGE, result);
    cargarProductos();
  };

  // componentes de orden superior

  const CartHeader = ({ emptyCart }) => {
    return (
      <div className="cartHeader">
        <div>
          <h1>
            <strong>Mi Carrito</strong>
          </h1>

          <Button variant="link" onClick={emptyCart}>
            Vaciar-
            <Icon name="trash alternate outline"></Icon>
          </Button>
        </div>
      </div>
    );
  };

  const CartFooter = ({
    cartTotalPrice,
    productMiCart,
    user,
    productsCart,
    carritodataBase,
  }) => {
  //  console.log("productos de mi carrito", productMiCart, user.uid, cartTotalPrice, productsCart );
      
    return (
      <div className="cart-content-footer">
        <div>
          <h3>Total aproximado:</h3>
         
          <h4>
            <strong> {cartTotalPrice.toFixed(2)} € </strong>
          </h4>
        </div>
        <Button
          onClick={() =>
            carritodataBase(productMiCart, user, cartTotalPrice, productsCart)
          }
        >
          Tramitar pedido
        </Button>
      </div>
    );
  };

  const CartProducts = ({
    products,
    productsCart,
    itemId,
    incrementCount,
    descentCount,
  }) => {
    // console.log("productos en mi cart", products, productsCart, itemId);
    // console.log("equals en mi cart", products, itemId);

    if (products) {
      return products.map((element, index) => {
        
       // console.log("repetidos", element.id, itemId);
        if (element.id === itemId) {
          const quantity = productsCart.filter((item) => item === element.id);
        //  console.log("quantity", quantity);
          return (
            <RenderProduct
              key={index}
              element={element}
              quantity={quantity}
              incrementCount={incrementCount}
              descentCount={descentCount}
            ></RenderProduct>
          );
        }
      });
    }
  };

  const RenderProduct = ({
    quantity,
    element,
    incrementCount,
    descentCount,
  }) => {
    const fecha = new Date().toLocaleDateString();
  //  console.log("element", element.ingredientes);
    return (
      <Fragment>
        <Card>
          <Card.Content>
            <Card.Meta floated="right">{fecha}</Card.Meta>

            <Card.Header>
              <strong>{element.name}</strong>
            </Card.Header>
            <Card.Meta>{element.price} €/ud</Card.Meta>

            <Card.Description>
              Ingredientes:{" "}
              {element.ingredientes.map((ingrediente) => {
                return ingrediente.label + " , ";
              })}
            </Card.Description>

            <Card.Description>
              En el carro: <strong>{quantity.length} ud</strong>
            </Card.Description>
          </Card.Content>
          <Card image={element.image} header={element.name} />
          <Card.Content extra>
            <div className="ui two buttons">
              <Button
                basic
                color="green"
                onClick={() => incrementCount(element.id)}
              >
                +
              </Button>
              <Button
                basic
                color="red"
                onClick={() => descentCount(element.id)}
              >
                -
              </Button>
            </div>
          </Card.Content>
        </Card>
      </Fragment>
    );
  };

  return (
    <div className="miCarrito">
      <CartHeader emptyCart={emptyCart}></CartHeader>
      {productsCart.length > 0 ? (
        <div className="cart-content-products">
          <Card.Group>
            {singleProductCart.map((itemId, index) => (
              <CartProducts
                className="product-card"
                style={{ display: "flex" }}
                key={index}
                products={products}
                productsCart={productsCart}
                itemId={itemId}
                incrementCount={incrementCount}
                descentCount={descentCount}
              ></CartProducts>
            ))}
          </Card.Group>
        </div>
      ) : (
        <Fragment>
          
          <h4>
          <Icon name="arrow alternate circle right" />
          No hay productos en tu carrito
          <Icon name="frown outline" size="large" />
          <Icon name="clipboard list" />
          <Icon name="exclamation triangle" />
          </h4>
          
          
        </Fragment>
      )}
      <CartFooter
        cartTotalPrice={cartTotalPrice}
        carritodataBase={carritodataBase}
        productMiCart={productMiCart}
        user={user}
        productsCart={productsCart}
      ></CartFooter>
    </div>
  );
};

export default MiCarrito;
