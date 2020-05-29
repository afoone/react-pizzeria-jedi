import React from "react";
import { Link, Redirect } from "react-router-dom";
import { auth } from '../config/firebase'
import { withRouter } from "react-router-dom";
import { Menu, Icon, Input, Responsive } from "semantic-ui-react";
import { UsuarioContext } from "../context/UsuarioProvider";
import { FiltroContext } from "../context/FiltroProvider";
import logoNave from '../css/images/logoNave.webp';
import '../css/Navbar.css'



const Navbar = (props) => {
  const [activeItem, setactiveItem] = React.useState("home");
  const handleItemClick = (e, { name }) => setactiveItem(name);

  const { usuario, productsCart } = React.useContext(UsuarioContext);
  const { setBuscarPizzas, setConsultar, consultar } = React.useContext(FiltroContext);

  const [busqueda, setBusqueda] = React.useState("");

  const obtenerDatosBusqueda = (e) => {
    //console.log(e.target.value)
    setBusqueda(e.target.value);
    setConsultar(false)
  };

  const cerrarSesion = () => {
    auth.signOut()
      .then(() => {
        props.history.push('/login')
      })
  }

  const RenderProduct = () => {
    return (
      productsCart.length > 0 ? (
        <Menu.Item
          as={Link}
          to="/carrito"
          active={activeItem === "tu carrito"}
          onClick={handleItemClick}
          color={'red'}
          icon='cart arrow down'
          name={productsCart.length}
        />
      ) : (
          <Menu.Item
            as={Link}
            to="/carrito"
            active={activeItem === "carrito"}
            onClick={handleItemClick}
            icon="shopping cart"

          />
        )
    )
  }


  return (
    <Responsive minWidth={1200} className='barra-nav'>
      <Menu inverted stackable style={{ backgroundColor: '#1b1c1d', fontSize: '1.5em' }} >
        <Menu.Menu>
          <Menu.Item>
          <img src={logoNave} alt='logo' className='nav-logo'/>
          </Menu.Item>

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
            onChange={() => setBusqueda('')}
          />
          {
            props.firebaseUser !== null ?
              <Menu.Item
                as={Link}
                to="/pizzas"
                active={activeItem === "Nuestras Pizzas"}
                onClick={handleItemClick}
              >
                Nuestras Pizzas
                  </Menu.Item> : null
          }
          {
            usuario.role === 'admin' ?
              <Menu.Item
                as={Link}
                to="/pizzaAdd"
                active={activeItem === "Crea tu Pizza"}
                onClick={handleItemClick}
              >
                Crea tu Pizza
                      </Menu.Item> : null
          }

        </Menu.Menu>
        <Menu.Menu position="right">
          <Menu.Item >
            <form onSubmit={e => {
              e.preventDefault();
              setBuscarPizzas(busqueda);
              setBusqueda('');
              setConsultar(true);
            }}>
              <Input className="icon ui focus input" placeholder="Search..." name="busqueda" value={busqueda} onChange={obtenerDatosBusqueda} />
            </form>
          </Menu.Item>
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

                <RenderProduct></RenderProduct>
                <Menu.Item
                as={Link}
                to="/perfil"
                name="admin"
                onClick={handleItemClick}
              >
                <img
                  src={usuario.photoURL}
                  alt="foto"
                  width="67%"
                  className="edita-perfil"
                />
              </Menu.Item>
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
            
        </Menu.Menu>
      </Menu>
      {consultar === true ? <Redirect to='/pizzaSearch' ></Redirect> : null}
    </Responsive>
  );
};

export default withRouter(Navbar);

