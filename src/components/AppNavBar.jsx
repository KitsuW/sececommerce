import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AppNavBar = () => {
    return (
        <Navbar expand="md" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to='/'>Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to='/products'>Products</Nav.Link>
                        <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                        <Nav.Link>Cart</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavBar;