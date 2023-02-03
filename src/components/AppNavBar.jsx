import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCartThunk } from '../store/slices/cart.slice';

const AppNavBar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logout = () => {
        localStorage.setItem("token", "")
        navigate('/login')
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        dispatch(getCartThunk())
    }, [])

    const cart = useSelector(state => state.cart)

    console.log(cart)

    return (
        <>
            <Navbar expand="md" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to='/'>Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to='/purchases'>Purchases</Nav.Link>
                            <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                            <Nav.Link onClick={() => handleShow()}>Cart</Nav.Link>
                            <Nav.Link onClick={() => logout()}>Log out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul>
                        {cart.map( item => (
                            <li key={item.id}>
                                {item.product?.title}
                                <p>{item.quantity}</p>
                                <p>Price: {`${item.quantity * item.product?.price}`}</p>
                            </li>
                        ))}
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default AppNavBar;