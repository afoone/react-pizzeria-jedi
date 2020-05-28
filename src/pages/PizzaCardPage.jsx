import React, { useEffect, useState } from 'react'
import { Grid, Image, Table, Header, Container } from 'semantic-ui-react'
import CommentForm from '../components/CommentForm'
import CommentsList from '../components/CommentsList'
import { connect } from 'react-redux'
import { fetchPizzas } from '../actions'
import { useParams } from 'react-router-dom'
import { db } from '../config/firebase'

const PizzaCardPage = (props) => {

    const { dispatch } = props;
    const idPizza = useParams().id;
    const pizzas = props.pizzas.filter(element => element.id === idPizza)
    const [pizza, setPizza] = useState({})
    const [precio, setPrecio] = useState();
    const [comments, setComments] = useState([])



    //obtención de las pizzas desde redux
    useEffect(
        () => {
            dispatch(fetchPizzas());
        }, [dispatch])

    useEffect(
        () => {
            setPizza(pizzas[0] ? pizzas[0] : {})

        }, [props.pizzas, pizzas]
    )

    useEffect(
        () => {
            //console.log('pizza', pizza.ingredientes)
            if (pizza.ingredientes) {

                setPrecio(parseFloat(pizza.price) + pizza.ingredientes.map(
                    item => parseFloat(item.price)
                ).reduce((a, value) => a + parseFloat(value)) + 10)
            }

        }, [pizza]
    )

    //obtención de los comentarios
    const getComments = async () => {
        const res = await db.collection('pizzas').doc(idPizza).collection('comments').get();
        const e = res.docs.map(
            i => i.data()
        );
        setComments(e);
    }

    useEffect(
        () => {
            getComments();
        }

    )
    //guardamos el nuevo comentario en la base de datos
    const commentHandle = (comment) => {
        db.collection('pizzas').doc(idPizza).collection('comments').add(comment)
        setComments([...comments, comment])
    }

    const RenderIngredients = () => {
        return (
            pizza.ingredientes ? pizza.ingredientes.map(
                (res, index) =>
                    <Table.Row key={index}>
                        <Table.Cell>{res.label}</Table.Cell>
                        <Table.Cell>{res.price} €</Table.Cell>
                    </Table.Row>
            ) : <Table.Row><Table.Cell>"Cargando"</Table.Cell></Table.Row>
        )
    }

    return (
        <Container style={{ minWidth: '500px' }}>
            <Grid divided relaxed>
                <Grid.Row columns={2}>
                    <Grid.Column width={6}>
                        <Header as='h2' content={pizza.name || ''}/>
                        <Image src={pizza.image || ''} style={{ maxWidth: '200px' }} />
                        <Header as='h3' content={`Precio: ${precio} €`} />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Header as='h1' content='Ingredientes'/>
                        <Table unstackable>
                            <Table.Body>
                                <RenderIngredients/>
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
                        <CommentsList comments={comments} />
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
