import React from 'react'
import { Grid, Image, Table, Header, Container } from 'semantic-ui-react'
import image from './pizza-de-peperoni.jpg'
import { sampleIngredients, sampleComments } from '../config/sampleData'
import CommentForm from '../components/CommentForm'
import CommentsList from '../components/CommentsList'

const commentHandle = (comment) => {
    //console.log('añadir comentario', comment);
}


const PizzaCardPage = (props) => {

    console.log('props pizza',props.location.pizza)
    const pizza=props.location.pizza;

    const precioPizza=()=>{
        const coste=sampleIngredients.map(
            item=>parseFloat(item.price)
        ).reduce((a,price)=>a+parseFloat(price));
        console.log('coste pizza', coste);
        return coste+10
    }

    return (
        <Container style={{ minWidth: '500px' }}>

            <Grid divided relaxed>
                <Grid.Row columns={2}>
                    <Grid.Column width={6}>
                        <Header as='h2'>{pizza.name}</Header>
                        <Image src={pizza.image} style={{ maxWidth: '200px' }} />
                        <Header as='h3'>{`Precio: ${precioPizza()}`}</Header>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Header as='h1'>Ingredientes</Header>
                        <Table unstackable>
                            <Table.Body>
                                {
                                    sampleIngredients.map(
                                        (res, index) =>
                                            <Table.Row key={index}>
                                                <Table.Cell>{res.name}</Table.Cell>
                                                <Table.Cell>{res.price}</Table.Cell>
                                            </Table.Row>
                                    )
                                }
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <CommentForm commentHandle={commentHandle} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <CommentsList comments={sampleComments} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}

export default PizzaCardPage
