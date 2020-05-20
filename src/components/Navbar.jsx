import React from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from '../config/firebase'
import { withRouter } from "react-router-dom";
import { Menu, Icon, Input, Segment, Dropdown } from "semantic-ui-react";



const Navbar = (props) => {
  const [activeItem, setactiveItem] = React.useState("home");
  const handleItemClick = (e, { name }) => setactiveItem(name);




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
            <img src="https://react.semantic-ui.com/logo.png" />
          </Menu.Item>
          <Menu.Item header>PiZZa JeDi</Menu.Item>
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={handleItemClick}
          >
            <NavLink to="/">Home</NavLink>
          </Menu.Item>
          <Menu.Item
            name="Promociones"
            active={activeItem === "Promociones"}
            onClick={handleItemClick}
          >
            <NavLink to="/promos">Promociones</NavLink>
          </Menu.Item>
          { 
            props.firebaseUser !== null ? (
            <>
              <Menu.Item
                to="/pizzas"
                name="Nuestras Pizzas"
                active={activeItem === "Nuestras Pizzas"}
                onClick={handleItemClick}
              >
                <NavLink to="/pizzas">Pizzas Listado</NavLink>
              </Menu.Item>

              <Menu.Item
                name="Crea tu Pizza"
                active={activeItem === "Crea tu Pizza"}
                onClick={handleItemClick}
              >
                <NavLink to="/pizzaId">Crea Tu Pizza</NavLink>
              </Menu.Item>
            </>
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
              <>
                <Menu.Item
                  name="Log out"
                  active={activeItem === "Log out"}
                  onClick={() => cerrarSesion()}
                >
                  <Icon name="sign-out alternate" />
                </Menu.Item>
                <Menu.Item
                  name="carrito"
                  active={activeItem === "carrito"}
                  onClick={handleItemClick}
                >
                  <NavLink to="/carrito">
                    <Icon name="shopping cart" />
                  </NavLink>
                </Menu.Item>
              </>
            ) : (
              <Menu.Item
                name="login"
                active={activeItem === "login"}
                onClick={handleItemClick}
              >
                <Icon name="user circle" />
                <NavLink to="/login">Login</NavLink>
              </Menu.Item>
            )}
          </Menu.Menu>
        </Menu>
      </Segment>
    </div>
  );
};

export default withRouter(Navbar);

