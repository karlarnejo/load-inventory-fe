import React from 'react';
import { Modal, Button} from 'react-bootstrap';

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
                {props.body}
            </Modal.Body>
            <Modal.Footer>
                {
                    props.type === "notif" ? 
                        <Button onClick={props.handleSuccess} variant='success' size='sm'>{"Confirm"}</Button> 
                        : null
                }
                <Button onClick={props.handleCloseModal} variant='danger' size='sm'>{"Close"}</Button>
            </Modal.Footer>
        </Modal>
    )
}