import React, { Component } from 'react'
<<<<<<< HEAD
import { Sidebar, Segment, Menu, Responsive, Visibility, Container, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}



export class DesktopContainer extends Component {
    state = {}

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    render() {
        const { fixed } = this.state;

        return (
            <Responsive
                getWidth={getWidth}
                maxWidth={Responsive.onlyTablet.minWidth}
            >
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment
                        inverted
                        textAlign='center'
                        style={{ minHeight: 700, padding: '1em 0em' }}
                        vertical
                    >
                        <Menu
                            fixed={fixed ? 'top' : null}
                            inverted={!fixed}
                            pointing={!fixed}
                            secondary={!fixed}
                            size='large'
                        >
                            <Container>
                                <Menu.Item as={Link} to='/'>Home</Menu.Item>
                                <Menu.Item as='a'>Work</Menu.Item>
                                <Menu.Item as='a'>Company</Menu.Item>
                            </Container>
                        </Menu>
                    </Segment>
                </Visibility>
            </Responsive>
        )
    }
}

class MobileContainer extends Component {
    state = {}

    handleSidebarHide = () => this.setState({ sidebarOpened: false })
    handleToggle = () => this.setState({ sidebarOpened: true })

    render() {

        const { sidebarOpened } = this.state;

        return (
            <Responsive
                as={Sidebar.Pushable}
                getWidth={getWidth}
                maxWidth={Responsive.onlyMobile.maxWidth}
            >
                <Sidebar
                    as={Menu}
                    animation='push'
                    inverted
                    onHide={this.handleSidebarHide}
                    vertical
                    visible={sidebarOpened}
                >
                    <Menu.Item as={Link} to='/'>Home</Menu.Item>
                    <Menu.Item as='a'>Work</Menu.Item>
                    <Menu.Item as='a'>Company</Menu.Item>

                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarOpened}>
                    <Segment
                        inverted
                        textAlign='center'
                        style={{ minHeight: 350, padding: '1em 0em' }}
                        vertical
                    >
                        <Container>
                            <Menu inverted pointing secondary size='large'>
                                <Menu.Item onClick={this.handleToggle}>
                                    <Icon name='sidebar' />
                                </Menu.Item>
                                <Menu.Item position='right'>
                                    <Button as='a' inverted>
                                        Log in
                                     </Button>
                                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                                        Sign Up
                                    </Button>
                                </Menu.Item>
                            </Menu>
                        </Container>
                    </Segment>
                </Sidebar.Pusher>
            </Responsive>
=======
import { Sidebar, Segment, Menu } from 'semantic-ui-react'




export class AlternateNavbar extends Component {
    constructor(props){
        super(props);
        this.state={
            visible:true
        }
    }

    render() {
        return (
            <Sidebar.Pushable as={Segment} >
                <Sidebar
                    as={Menu}
                    icon='labeled'
                    inverted
                    onHide={null}
                    vertical
                    visible={this.state.visible}
                    width='thin'
                >

                </Sidebar>
            </Sidebar.Pushable>
>>>>>>> develop
        )
    }
}

<<<<<<< HEAD
const AlternateNavbar = () => (
    <div>
      <DesktopContainer></DesktopContainer>
      <MobileContainer></MobileContainer>
    </div>
  )
  
=======
>>>>>>> develop
export default AlternateNavbar
