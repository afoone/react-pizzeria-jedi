import React, { useState, Fragment, useContext} from 'react'
import { Form, Header, Input, Button, Segment } from 'semantic-ui-react'
import { UsuarioContext } from '../context/UsuarioProvider'


const CommentForm = (props) => {

    const usuario = useContext(UsuarioContext);

    //console.log("user detectado", usuario.usuario.displayName);


    const [score, setScore] = useState('');
    const [comment, setComment] = useState('')



    const onChangeValue = (e) => {
        if (e.target.name === 'score') {
            setScore(e.target.value);
        }
        else if (e.target.name === 'comment') {
            setComment(e.target.value)
        }
    }


    const onClickHandle = e => {
        const fecha = new Date().toLocaleDateString();
        const comm = {
            user: usuario.usuario.displayName,
            date: fecha,
            score: score,
            comment: comment
        }

        props.commentHandle(comm)

    }

    return (
        <Fragment>
            <Header as='h2'>Deja tu comentario</Header>
            <Segment raised>
                <Form>
                    <Form.Input
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
