import React from 'react'
import { Segment, Header, Grid, GridColumn } from 'semantic-ui-react'

const CommentsList = (props) => {
    //console.log('props', props)

    return (
        <React.Fragment>
            <Header as='h2'>Comentarios</Header>
            <Segment.Group raised>
            
            {
                props.comments.map(
                    (item, index) =>
                        <Segment key={index}>
                            <Grid  >
                                <Grid.Row columns={10}>
                                    <Grid.Column floated='left'>
                                        <p>{item.user}</p>
                                    </Grid.Column>
                                    <Grid.Column floated='right'>
                                        <p>{item.score}</p>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <GridColumn>
                                        <p>{item.date}</p>
                                    </GridColumn>
                                </Grid.Row>
                                <Grid.Row>
                                    <GridColumn>
                                        <p>{item.comment}</p>
                                    </GridColumn>
                                </Grid.Row>
                            </Grid>
                        </Segment>

                )
            }
        </Segment.Group>
        </React.Fragment>
    )
}

export default CommentsList
