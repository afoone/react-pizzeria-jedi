import React, { useState, Fragment, useContext } from 'react'
import { Form, Header, Input, Button, Segment, Rating, Label } from 'semantic-ui-react'
import { UsuarioContext } from '../context/UsuarioProvider'

/******************************************************
 *          FORMULARIO INTRODUCCIÓN COMENTARIOS
 * 
 * Padre: /pages/PizzaCardPage.jsx
 * 
 * Recibe por props la función que guardará el nuevo comentario en Firestore
 * El comentario es el objeto:
 *              const newComment = {
            user: usuario.usuario.displayName,
            date: fecha,
            score: score,
            comment: comment
        }
 * El noombre de usuario lo recibe por context 
 */
const CommentForm = (props) => {

    const usuario = useContext(UsuarioContext);
    const [score, setScore] = useState('');
    const [comment, setComment] = useState('')

    const onChangeValue = (e) => {
        setComment(e.target.value)
    }

    const handleRate = (e, { rating }) => {
        setScore(rating);
        console.log('score', score, 'rating', rating)
    }

    const onClickHandle = e => {
        const placeholder = document.getElementById('comment-comment')

        if (comment === '') {
            placeholder.style.backgroundColor = 'mistyrose';
            placeholder.placeholder = '¡El comentario no puede estar vacio!';

        } else {
            placeholder.style.backgroundColor = 'white';
            placeholder.placeholder = 'Deja aquí tu comentario';
            const fecha = new Date().toLocaleDateString();
            const newComment = {
                user: usuario.usuario.displayName,
                date: fecha,
                score: score,
                comment: comment
            }
            //envía el comentario y limpia el formulario
            props.commentHandle(newComment);
            //console.log('comment',newComment)
            setComment('');
            setScore('');

        }
    }


    return (
        <Fragment>
            <Header as='h2'>Deja tu comentario</Header>
            <Segment raised>
                <Form>
                <Label content='Puntuanos' style={{fontFamily:'Lato'}}/>
                    <Rating
                        
                        icon='star'
                        maxRating={5}
                        rating={score}
                        onRate={handleRate}
                        clearable
                    />
                    <Form.TextArea
                        id='comment-comment'
                        name='comment'
                        type='text'
                        placeholder='Deja aquí tu comentario'
                        value={comment}
                        onChange={onChangeValue}
                    />
                </Form>
            </Segment>
            <Button content='Guardar' onClick={onClickHandle} />
        </Fragment>
    )
}

export default CommentForm
