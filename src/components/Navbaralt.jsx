import React, { Component } from 'react'
import { auth } from '../config/firebase'

import { Sidebar, Menu, Container, Responsive, Icon, Segment, Dropdown, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

 



const NavBarMobile = (props) => {

   
    console.log('mobile', props)

    return (

        <Sidebar.Pushable >
            <Sidebar
                as={Menu}
                animation='push'
                icon='labeled'
                inverted
                vertical
                visible={props.visible}
            >

                <Menu.Item as='a'><Icon name='home' />Home</Menu.Item>
                <Menu.Item as='a'><Icon name='gamepad' />Games</Menu.Item>
                <Menu.Item as='a'><Icon name='camera' />Channels</Menu.Item>
            </Sidebar>
            <Sidebar.Pusher
                onClick={props.onPusherClick}
                style={{ minHeight: '100vh' }}
            >
                {props.children}
            </Sidebar.Pusher>

        </Sidebar.Pushable>
    );
}

const NavBarDesktop = (props) => {

    const [activeItem, setactiveItem] = React.useState("home");
    const handleItemClick = (e, { name }) => setactiveItem(name);

    return (
        <Menu fixed='top' inverted>
            <Menu.Item>
                <img src="http://localhost:3000/1840529_1.png" alt='logo' />
            </Menu.Item>

            <Menu.Item header style={{ width: 126 }}></Menu.Item>
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
                                onClick={null}
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
            </Menu.Menu>
        </Menu>
    );
}


const NavBarChildren = ({ children }) => (
    <Container style={{ marginTop: "5em" }}>{children}</Container>
);



export class NavbarAlt extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: null
        }
    }

    handlePusher = () => {
        const { visible } = this.state;
        if (visible) this.setState({ visible: false })
    }

    handleToggle = () => this.setState({ visible: !this.state.visible });

    render() {
        console.log('navbar props', this.props)
        return (
            <div>
                <Responsive {...Responsive.onlyMobile}>
                    <Menu fixed='top' inverted>
                        <Menu.Item icon='sidebar' onClick={this.handleToggle} />
                    </Menu>

                    <NavBarMobile
                        onToggle={this.handleToggle}
                        visible={this.state.visible}
                    >
                        <NavBarChildren>{this.props.children}</NavBarChildren>
                    </NavBarMobile>
                </Responsive>
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <NavBarDesktop />
                    <NavBarChildren>{this.props.children}</NavBarChildren>
                </Responsive>
            </div>
        )
    }
}

export default NavbarAlt

