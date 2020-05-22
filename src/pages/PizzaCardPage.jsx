import React, { useEffect, useState } from 'react'
import { Grid, Image, Table, Header, Container } from 'semantic-ui-react'
import { sampleIngredients, sampleComments } from '../config/sampleData'
import CommentForm from '../components/CommentForm'
import CommentsList from '../components/CommentsList'
import { connect } from 'react-redux'
import { fetchPizzas } from '../actions'
import { useParams } from 'react-router-dom'


const commentHandle = (comment) => {
    //console.log('añadir comentario', comment);
}


const PizzaCardPage = (props) => {

    const { dispatch } = props;
    const idPizza = useParams().id;
    const pizzas = props.pizzas.filter(element => element.id === idPizza)
    const [pizza, setPizza] = useState({})

    useEffect(
        () => {
            dispatch(fetchPizzas());
        }, [dispatch])

    useEffect(
        () => {
            setPizza(pizzas[0] ? pizzas[0]: {})          
        }, [props.pizzas]
    )

    console.log('pizza', pizza.ingredientes)


    const precioPizza = () => {
        const coste = sampleIngredients.map(
            item => parseFloat(item.price)
        ).reduce((a, price) => a + parseFloat(price));
        return coste + 10
    }

    return (

        <Container style={{ minWidth: '500px' }}>
            <Grid divided relaxed>
                <Grid.Row columns={2}>
                    <Grid.Column width={6}>
                        <Header as='h2'>{pizza.name || ''}</Header>
                        <Image src={pizza.image || ''} style={{ maxWidth: '200px' }} />
                        <Header as='h3'>{`Precio: ${precioPizza()}`}</Header>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Header as='h1'>Ingredientes</Header>
                        <Table unstackable>
                            <Table.Body>
                                {   pizza.ingredientes?pizza.ingredientes.map(
                                        (res, index) =>
                                            <Table.Row key={index}>
                                                <Table.Cell>{res.label}</Table.Cell>
                                                <Table.Cell>{res.price}</Table.Cell>
                                            </Table.Row>
                                    ):"Cargando"
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

function mapStateToProps(state) {
    return {
        pizzas: state.pizzas
    }
}
export default connect(mapStateToProps)(PizzaCardPage)
