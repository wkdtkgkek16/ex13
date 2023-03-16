import React, { useContext, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { app } from '../firebase'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { getDoc,doc,getFirestore} from 'firebase/firestore'
import { UserContext } from './UserContext'
import LoadingPage from './LoadingPage'

const LoginPage = ({history}) => {
    const db = getFirestore(app);
    const {user, setUser} = useContext(UserContext)
    const auth = getAuth(app);
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        email:'user01@email.com',
        password: '12341234'
    });

    const getUser = async() => {
        const result= await getDoc(doc(db,'users',email));
        // console.log(result.data());
        setUser(result.data());
    }
    const {email, password} = form

    const onChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
    }
    const onLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        signInWithEmailAndPassword(auth,email,password)
        .then((success)=>{
            // getUser();
            setLoading(false)
            // alert('성공')
            sessionStorage.setItem('email', email)
            history.push('/')
        })
        .catch((error)=>{
            setLoading(false)
            alert(error.message);
        });
    }
    if(loading) return <LoadingPage/>
  return (
    <div>
        <Row className='justify-content-center my-5'>
            <Col xl={5}>
                <Card>
                    <Card.Title className='text-center mt-2'><h3>로그인</h3></Card.Title>
                    <Card.Body>
                        <Form className='text-center' onSubmit={onLogin}>
                            <Form.Control name="email"
                            value={email} onChange={onChange}
                            placeholder='✉  Email' className='mb-3'/>
                            <Form.Control name="password"
                            value={password} onChange={onChange}
                            placeholder='🔒 Password' type="password" className='mb-3'/>
                            <Button type="submit" variant='success' style={{width:'100%'}}>로그인</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default LoginPage