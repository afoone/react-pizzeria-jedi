import React, { Component } from 'react'
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
        )
    }
}

export default AlternateNavbar
