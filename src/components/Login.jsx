import React, { Fragment } from 'react'
import '../css/Login.css'
import {auth, db, firebase} from '../config/firebase'
import {withRouter} from 'react-router-dom'
import { Card, Icon, Button, Container} from 'semantic-ui-react'


const Login = (props) => {
    

    React.useEffect(() => {
     
        if(props.firebaseUser !== null){
            props.history.push('/')
        }
       // eslint-disable-next-line
    }, [props.firebase, props.history])


    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [error, setError] = React.useState(null)
 

    const [esRegistro, setEsRegistro] = React.useState(false)

    const procesarDatos = e => {
        e.preventDefault()
        if(!email.trim() || !pass.trim()){
            console.log('Datos vacíos email!')
            setError('Datos vacíos email!')
            return
        }
        if(!pass.trim()){
            console.log('Datos vacíos pass!')
            setError('Datos vacíos pass!')
            return
        }
        if(pass.length < 6){
            console.log('6 o más carácteres')
            setError('6 o más carácteres en pass')
            return
        }
        console.log('correcto...')
        setError(null)

        if(esRegistro){
            registrar()
            
        }else{
            login()
        }

    }

    const login = React.useCallback(async () => {
        try {
            const res = await auth.signInWithEmailAndPassword(email, pass)
            console.log(res.user)
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/')
        } catch (error) {
            console.log(error)
            if(error.code === 'auth/invalid-email'){
                setError('Email no válido')
            }
            if(error.code === 'auth/user-not-found'){
                setError('Email no registrado')
            }
            if(error.code === 'auth/wrong-password'){
                setError('Contraseña incorrecta')
            }
        }
    }, [email, pass, props.history])

    const registrar = React.useCallback(async() => {

        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass)
            console.log(res.user)
            await db.collection('usuarios').doc(res.user.email).set({
                email: res.user.email,
                uid: res.user.uid,
                role: 'user'
            })
           
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/')
        } catch (error) {
            console.log(error)
            if(error.code === 'auth/invalid-email'){
                setError('Email no válido')
            }
            if(error.code === 'auth/email-already-in-use'){
                setError('Email ya utilizado')
            }
        }

    }, [email, pass, props.history])


const ingresoGoogle = React.useCallback(async() => {

    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const res = await auth.signInWithPopup(provider);
      
        console.log(res.user);
    
        const usuario = {
          uid: res.user.uid,
          email: res.user.email,
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
          role: 'user'
        };
       
        const usuarioDB = await db.collection("usuarios").doc(usuario.email).get();
        console.log(usuarioDB);
        if (usuarioDB.exists) {
          // cuando existe el usuario en firestore
          props.history.push('/')
        } else {
          // no existe el usuario en firestore
          await db.collection("usuarios").doc(usuario.email).set(usuario);
          props.history.push('/')
        }
      } catch (error) {
        console.log(error);    
      }
     
 }, [props.history])






    return (
        <Fragment>
        <Container  align='center' vertical-align='center'>
        
        <Card>
            <Card.Content>
                 <Card.Header align= 'center'>Ingresa con Google</Card.Header>
                <Card.Meta>
                
                </Card.Meta>
                <Card.Description align= 'center'>
                    <Icon color='blue' name='google'/>
                </Card.Description>
             </Card.Content>
            <Card.Content extra align='center'>
            <Button
             basic 
             color='red' 
             content='Acceder'
             onClick={() => ingresoGoogle()}
            // disabled={loading}
            />
            </Card.Content>
       </Card>
      
        </Container>
        <div className="mt-5">
            <h3 className="text-center">
                {
                    esRegistro ? 'Registro' : 'Login'
                }
            </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
                        {
                            error ? (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            ) : null
                        }
                        <input 
                            type="email" 
                            className="form-control mb-2"
                            placeholder="Ingrese Email"
                            onChange={ e => setEmail(e.target.value) }
                            value={email}
                        />
                        <input 
                            type="password" 
                            className="form-control mb-2"
                            placeholder="Ingrese Contraseña"
                            onChange={ e => setPass(e.target.value) }
                            value={pass}
                        />
                        <button 
                            className="btn btn-lg btn-dark btn-block"
                            type="submit"
                        >
                            {esRegistro ? 'Registrar' : 'Acceder'}
                        </button>
                        <button 
                            className="btn btn-sm btn-info btn-block"
                            type="button"
                            onClick={() => setEsRegistro(!esRegistro)}
                        >
                            {esRegistro ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
                        </button>
                        {
                            !esRegistro ? (
                                <button 
                                    className="btn btn-lg btn-danger btn-sm mt-2"
                                    type="button"
                                    onClick={() => props.history.push('/reset')}
                                >
                                    Recuperar contraseña
                                </button>
                            ) : null
                        }
                    </form>
                </div>
            </div>
        </div>
        </Fragment>
    )
}

export default withRouter(Login)
