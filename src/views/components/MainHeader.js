import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {rootRoutes} from '../../store';
import '../../includes/custom/css/header.css';

const MainHeader = (props) => {

    const dispatch = useDispatch()

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>React Codebase</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {rootRoutes.map((route, i) => {
                            return (
                                route.path && route.showNav ? <Nav.Link as={Link} key={i} href={route.path} to={route.path}>{route.label}</Nav.Link> : ""
                            );
                        })}
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={() => dispatch(props.logoutUser())}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MainHeader;