import React, { useContext, useEffect } from 'react'
import tktk from '../images/tktk.jpg'
import Navbar from 'react-bootstrap/Navbar';
import { Link, withRouter } from 'react-router-dom';
import { UserContext } from './UserContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { app } from '../firebase'
import { getDoc,doc,getFirestore} from 'firebase/firestore'
import { ColorContext } from './ColorContext';
import { Button } from 'react-bootstrap';


const HeaderPage = ({history}) => {
    const db = getFirestore(app)
    const {user, setUser} = useContext(UserContext);
    const {color, setColor} = useContext(ColorContext);
    const email = sessionStorage.getItem('email');

    const onLogout = () => {
        sessionStorage.removeItem('email');
        setUser(null);
        history.push("/");
    }

    const getUser = async() => {
        const result= await getDoc(doc(db,'users',email));
        setUser(result.data());
    }

    useEffect(()=>{
        getUser();
    },[email]);

  return (
    <div className='header'>
        <img src={tktk} style={{width:'100%'}}/>
        <Navbar bg={color} variant="dark">
            <Container>
                <Nav>
            <Link to="/">홈</Link>
            <Link to="/users">사용자목록</Link>
            {user && <Link to="/chat">채팅</Link>}
            {user ?
                <Link to="/logout" onClick={onLogout}>로그아웃</Link>
                :
                <Link to="/login">로그인</Link>
            }
            </Nav>
            <div>
            {(user && user.photo ) &&
                <img src={user.photo} style={{width:'50px', borderRadius:'10px'}}/>}
            {(user && user.name) &&
                <Link to='mypage'>{user.name}님</Link>
            }
            <Button onClick={()=>setColor('dark')}variant='dark'>검정</Button>
            <Button onClick={()=>setColor('primary')}variant='primary'>파랑</Button>
            <Button onClick={()=>setColor('success')}variant='success'>녹색</Button>
            <Button onClick={()=>setColor('danger')}variant='danger'>빨강</Button>
            <Button onClick={()=>setColor('warning')}variant='warning'>노랑</Button>
            </div>
            </Container>
      </Navbar>
      

    </div>
  )
}

export default withRouter(HeaderPage)