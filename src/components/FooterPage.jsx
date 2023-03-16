import React, { useContext } from 'react'
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ColorContext } from './ColorContext';

const FooterPage = () => {
  const {color, setColor} = useContext(ColorContext);
  return (
    <Navbar bg={color} variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
            <Button onClick={()=>setColor('dark')}variant='dark'>dark</Button>
            <Button onClick={()=>setColor('primary')}variant='primary'>primary</Button>
            <Button onClick={()=>setColor('success')}variant='success'>success</Button>
            <Button onClick={()=>setColor('danger')}variant='danger'>danger</Button>
            <Button onClick={()=>setColor('warning')}variant='warning'>warning</Button>
        </Container>
      </Navbar>
  )
}

export default FooterPage