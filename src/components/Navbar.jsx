import React from "react";
import { Link} from "react-router-dom";
import { auth } from '../config/firebase'
import { withRouter } from "react-router-dom";
import { Menu, Icon, Input, Segment, Dropdown } from "semantic-ui-react";
import { UsuarioContext } from "../context/UsuarioProvider";


const Navbar = (props) => {
  const [activeItem, setactiveItem] = React.useState("home");
  const handleItemClick = (e, { name }) => setactiveItem(name);

  const { usuario } = React.useContext(UsuarioContext);


  const cerrarSesion = () => {
    auth.signOut()
      .then(() => {
        props.history.push('/login')
      })
  }


  return (
    <div>
      <Segment inverted>
        <Menu fluid inverted pointing secondary size="huge" stackable>
          <Menu.Item>  
          <img src="/1840529_1.png"  alt='logo' />
          </Menu.Item>
       
          <Menu.Item header style={{width: 126}}></Menu.Item>
          <Menu.Item
          as={Link}
          to='/'
            name="home"
            active={activeItem === "home"}
            onClick={handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/promos"
            name="Promociones"
            active={activeItem === "Promociones"}
            onClick={handleItemClick}
          />
          {
            props.firebaseUser !== null ? (
              <React.Fragment>
                <Menu.Item
                as={Link}
                  to="/pizzas"
                  name="Nuestras Pizzas"
                  active={activeItem === "Nuestras Pizzas"}
                  onClick={handleItemClick}
                />
                {usuario.role === "admin" ? (
                  <Menu.Item
                  as={Link}
                  to="/pizzaAdd"
                  name="Crea tu Pizza"
                    active={activeItem === "Crea tu Pizza"}
                    onClick={handleItemClick}
                  >
                   
                  </Menu.Item>
                ) : null}
               
              </React.Fragment>
            ) : (null)
          }
          {" "}
          <Menu.Menu position="right">
            <Dropdown item icon="search plus" text="Buscar ">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Input
                    className="icon"
                    icon="search"
                    placeholder="Search..."
                  />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {
              props.firebaseUser !== null ? (
                <React.Fragment>
                  <Menu.Item
                    name="Log out"
                    active={activeItem === "Log out"}
                    onClick={() => cerrarSesion()}
                  >
                    <Icon name="sign-out alternate" />
                  </Menu.Item>
                  <Menu.Item
                  as={Link}
                  to="/carrito"
                    name="carrito"
                    active={activeItem === "carrito"}
                    onClick={handleItemClick}
                    icon="shopping cart"
                  />
                </React.Fragment>
              ) : (
                  <Menu.Item
                  as={Link}
                  to="/login"
                    name="login"
                    icon="user circle"
                    active={activeItem === "login"}
                    onClick={handleItemClick}
                 />
                )}
                {usuario.role === "admin" ? (
                  <Menu.Item
                  as={Link}
                  to="/admin"
                    name="admin"
                    active={activeItem === "admin"}
                    onClick={handleItemClick}
                  >
                   
                      <i className="cogs icon"></i>
                    
                  </Menu.Item>
                ) : null}
          </Menu.Menu>
        </Menu>
      </Segment>
    </div>
  );
};

export default withRouter(Navbar);

