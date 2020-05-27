import React from "react";
import { Button, Header, Image, Modal, Icon } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import { UsuarioContext } from "../context/UsuarioProvider";
import '../css/ModalImage.css'

const ModalImage = ({id, image, name, price, ingredientes }) => {

    const { agregarProducto} = React.useContext(
        UsuarioContext
      );

  return (
    <Modal trigger={<Button>Ver</Button>} centered={false}>
      <Modal.Header>
        Comprar ahora
        <Button
          animated="vertical"
          onClick={() => agregarProducto(id, name)}
        >
          <Button.Content hidden>Shop</Button.Content>
          <Button.Content visible>
            <Icon name="shop" />
          </Button.Content>
        </Button>
      </Modal.Header>
      <Modal.Content image>
        <Image wrapped size="large" src={image} />
        <Modal.Description>
          <Header>{name}</Header>
          {
            ingredientes.map((ingrediente, index) => {
              return <p key={index}>{ingrediente.label}</p> 
            })

          }
          <p>
           
          </p>
          <p>{price} €</p>
        </Modal.Description>
      </Modal.Content>
      <ToastContainer
      position="bottom-left"
      autoClose={4000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange={false}
      draggable
      pauseOnHover={false}
    ></ToastContainer>
    </Modal>
  );
};

export default ModalImage;
