import React from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';

export const ModalTemplate = (props) => {

    return (
        <Modal
            show={props.showModal}
            scrollable={true}
            onHide={props.handleCloseModal}
            size={props.type === "notif" ? "sm" : "md"}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h5>{props.title}</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        {
                            props.type === "view" ?
                                <Col xs={12}>
                                    {
                                        <>
                                            <Button onClick={props.handleDisabled} hidden={props.disabled ? false : true} className='float-right mr-2' size='md'>Edit</Button>
                                            <Button onClick={props.handleDisabled} hidden={props.disabled ? true : false} className='float-right mr-2' size='md'>Finish Edit</Button>
                                        </>
                                    }
                                </Col>
                                :
                                null
                        }
                    </Row>
                    <Row>
                        <Col xs={12}>
                            {
                                props.body
                            }
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={props.disabled} onClick={props.handleSuccess} variant='success' size='md'>Confirm</Button>
                <Button className={props.type !== "view" ? null : 'mr-4'} onClick={props.handleCloseModal} variant='danger' size='md'>{"Close"}</Button>
            </Modal.Footer>
        </Modal>
    )
}