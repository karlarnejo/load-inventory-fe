import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Container } from 'react-bootstrap';
import CardTemplate from '../../components/CardTemplate';

const CustomerPage = () => {
    
    const collapseSidebar = useSelector(state => state.landingePage.collapseSidebar)

    return (
        <div style={{ backgroundColor: "#f0f2f5" }} className={"mainContent " + (collapseSidebar ? "open-sidebar" : "close-sidebar")}>
            <Container fluid>
                <Card>
                    <Row>
                        <Col xs={4}>
                            <CardTemplate className={"open-width mainContent " + (collapseSidebar ? "open-sidebar" : "close-sidebar")}
                                cardTitle='Smart'
                                cardDesc='Lorem ipsum dolor sit amet. Eum dolore enim sit enim temporibus id fugit consectetur ad repellat libero sit illo quidem.'
                                cardButtonName='Go'
                            // onClick
                            />
                        </Col>
                        <Col xs={4}>
                            <CardTemplate className={"open-width mainContent " + (collapseSidebar ? "open-sidebar" : "close-sidebar")}
                                cardTitle='Smart'
                                cardDesc='Lorem ipsum dolor sit amet. Eum dolore enim sit enim temporibus id fugit consectetur ad repellat libero sit illo quidem.'
                                cardButtonName='Go'
                            // onClick
                            />
                        </Col>
                        <Col xs={4}>
                            <CardTemplate className={"open-width mainContent " + (collapseSidebar ? "open-sidebar" : "close-sidebar")}
                                cardTitle='Smart'
                                cardDesc='Lorem ipsum dolor sit amet. Eum dolore enim sit enim temporibus id fugit consectetur ad repellat libero sit illo quidem.'
                                cardButtonName='Go'
                            // onClick
                            />
                        </Col>
                    </Row>
                </Card>
            </Container>
        </div>
    )
}

export default CustomerPage;