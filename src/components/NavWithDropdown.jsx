import React, { useState, useContext } from 'react'
import { Menu, Dropdown, Responsive, Input, Icon } from 'semantic-ui-react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import logoNave from '../css/images/logoNave.webp';
import { UsuarioContext } from '../context/UsuarioProvider';
import { FiltroContext } from "../context/FiltroProvider";
import { auth } from '../config/firebase'

const NavWithDropdown = (props) => {

    const [activeItem, setActiveItem] = useState('home');
    const [busqueda, setBusqueda] = useState('');

    const { usuario, productsCart } = useContext(UsuarioContext);
    const { setBuscarPizzas, setConsultar, consultar } = useContext(FiltroContext);


    const handleItemClick = (e, { name }) => setActiveItem(name);

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
                   // name="tu carrito"
                    active={activeItem === "tu carrito"}
                    onClick={handleItemClick}
                    icon="cart arrow down"
                    color={'red'}

                />
            ) : (
                    <Menu.Item
                        as={Link}
                        to="/carrito"
                     //   name="carrito"
                        active={activeItem === "carrito"}
                        onClick={handleItemClick}
                        icon="shopping cart"

                    />
                )
        )
    }


    return (
        <Responsive as='segment' inverted maxWidth={1200}>
            <Menu attached='top' inverted>
                <Dropdown item icon='sidebar'>
                    <Dropdown.Menu>
                        <Dropdown.Item ><img src={logoNave} alt='logo' /></Dropdown.Item>
                        <Dropdown.Item as={Link} to='/'
                            active={activeItem === "home"}
                            onClick={handleItemClick}
                        >
                            Home
                            </Dropdown.Item>
                        <Dropdown.Item
                            as={Link}
                            to="/promos"
                            active={activeItem === "Promociones"}
                            onClick={handleItemClick}
                            onChange={() => setBusqueda('')}
                        >
                            Promociones
                            </Dropdown.Item>
                        {
                            props.firebaseUser !== null ?
                                <Dropdown.Item
                                    as={Link}
                                    to="/pizzas"
                                    active={activeItem === "Nuestras Pizzas"}
                                    onClick={handleItemClick}
                                >
                                    Nuestras Pizzas
                                </Dropdown.Item> : null
                        }
                        {
                            usuario.role === 'admin' ?
                                <Dropdown.Item
                                    as={Link}
                                    to="/pizzaAdd"
                                    active={activeItem === "Crea tu Pizza"}
                                    onClick={handleItemClick}
                                >
                                    Crea tu Pizza
                                    </Dropdown.Item> : null
                        }
                        <Dropdown.Item></Dropdown.Item>

                    </Dropdown.Menu>

                </Dropdown>
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

    )
}




export default withRouter(NavWithDropdown); 
