import React, { useState, Fragment, useContext } from 'react'
import { Form, Header, Input, Button, Segment } from 'semantic-ui-react'
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
        if (e.target.name === 'score') {
            const valor = e.target.value;
            const placeholder = document.getElementById(e.target.id)

            if (valor < 0 || valor > 5) {
                //console.log('valor erroneo',e.target);
                e.target.value = ''
                placeholder.style.backgroundColor = 'mistyrose';
                e.target.placeholder = '¡No es posible! El valor debe ser entre 0 y 5';
            } else {
                placeholder.style.backgroundColor = 'white';
                setScore(e.target.value);
            }

        }
        else if (e.target.name === 'comment') {
            setComment(e.target.value)
        }
    }


    const onClickHandle = e => {
        const placeholder = document.getElementById('comment-comment')

        if (comment === '') {
            placeholder.style.backgroundColor = 'mistyrose';
            placeholder.placeholder = '¡El comentario no puede estar vacio!';

        } else {
            placeholder.style.backgroundColor = 'white';
            placeholder.placeholder = 'Deja aquí tu comentario';
            const fecha=new Date().toLocaleDateString();
            const newComment = {
                user: usuario.usuario.displayName,
                date: fecha,
                score: score,
                comment: comment
            }
            //envía el comentario y limpia el formulario
            props.commentHandle(newComment);
            setComment('');
            setScore('');

        }
    }


return (
    <Fragment>
        <Header as='h2'>Deja tu comentario</Header>
        <Segment raised>
            <Form>
                <Form.Input
                    id='comment-score'
                    name='score'
                    control={Input}
                    type='number'
                    min={0}
                    max={5}
                    placeholder='Puntuación'
                    value={score}
                    onChange={onChangeValue}
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
