import React from "react";
import { Link} from "react-router-dom";
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
          <img src="http://localhost:3000/1840529_1.png" width='' alt='' />
          </Menu.Item>
       
          <Menu.Item header>Pizza JeDi</Menu.Item>
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
                <Menu.Item
                as={Link}
                to="/pizzaAdd"
                  name="Crea tu Pizza"
                  active={activeItem === "Crea tu Pizza"}
                  onClick={handleItemClick}
                />
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
                    name="login"
                    active={activeItem === "login"}
                    onClick={handleItemClick}
                  >
                    <Icon name="user circle" />
                    <Link to="/login">Login</Link>
                  </Menu.Item>
                )}
          </Menu.Menu>
        </Menu>
      </Segment>
    </div>
  );
};

export default withRouter(Navbar);

