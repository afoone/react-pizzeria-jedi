import React, { useState, useEffect } from 'react'
import { Segment, Header, Grid, GridColumn, Label } from 'semantic-ui-react'
import { db } from '../config/firebase'
import '../css/CommentList.css'

const CommentsList = (props) => {
    //console.log('props', props)

    const [comments, setComments] = useState([])
    const [obtener, setObtener] = useState(true)


    //console.log('resultado', comments)

    useEffect(
        () => {
            db.collection('pizzas').doc(props.idPizza).collection('comments').get().then(
                res => {
                    //console.log('comment docs', res.docs);
                    const elements = res.docs.map(
                        i => {
                            //console.log('comments', i.data())
                            return i.data()
                        }
                    );
                    //console.log('comments', elements)
                    setComments(elements)
                    setObtener(false)
                }
            )

        }, [obtener, props.idPizza]
    )

    return (
        <React.Fragment>
            <Header as='h2'>Comentarios</Header>
            <Segment raised className='comentarios' >

                {comments.map(
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
                                        <Label>Puntuación:</Label> {item.score}
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
        </React.Fragment>
    )
}

export default CommentsList
