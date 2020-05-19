import React, { useState } from 'react'
import { Form, Header, Input, Button, Segment } from 'semantic-ui-react'


const CommentForm = (props) => {

    const [score, setScore] = useState('');
    const [comment, setComment] = useState('')
    
    const onChangeValue=(e)=>{
        if(e.target.name==='score'){
            setScore(e.target.value);
        }
        else if(e.target.name==='comment'){
            setComment(e.target.value)
        }
    }
     const onClickHandle=e=>{
         const comm={
             score:score,
             comment:comment
         }

         props.commentHandle(comm)

     }

    return (
        <>
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
        <Button content='Guardar' onClick={onClickHandle}/> 
        </>   
    )
}

export default CommentForm
