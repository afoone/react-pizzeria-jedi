import React from 'react'
import { Segment, Header, Grid, GridColumn, Label, Container, Rating } from 'semantic-ui-react'
import '../css/CommentList.css'

const CommentsList = (props) => {

    return (
        <React.Fragment>
            <Header as='h2'>Comentarios</Header>
            <Container style={{ overflowY: 'scroll', height: '25rem' }}>
                <Segment raised className='comentarios' >
                    {props.comments.map(
                        (item, index) =>
                            <div key={index} className='lista-comentarios'>
                                <Grid >
                                    <Grid.Row columns={3}>
                                        <Grid.Column >
                                            <Label>user:</Label>  {item.user}
                                        </Grid.Column>
                                        <Grid.Column>
                                        </Grid.Column>
                                        <Grid.Column textAlign='right'>
                                            <Rating icon='star' rating={item.score} maxRating={5} />
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <GridColumn >
                                            <Label  >Fecha:</Label> {item.date}
                                        </GridColumn>
                                    </Grid.Row>
                                    <Grid.Row className='comentario'>
                                        <GridColumn>
                                            <Header as='h4'>Comentario:</Header>
                                            <Segment attached color='teal'>{item.comment}</Segment>
                                        </GridColumn>
                                    </Grid.Row>
                                </Grid>
                            </div>
                    )}
                </Segment>
            </Container>
        </React.Fragment>
    )
}

export default CommentsList
