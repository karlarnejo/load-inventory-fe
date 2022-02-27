import React from 'react';
import { Modal, Button} from 'react-bootstrap';

export const ModalTemplate = (props) => {
    
    return (
        <Modal
            show={props.showModal}
            scrollable={true}
            onHide={props.handleCloseModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h5>{props.title}</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.handleCloseModal} variant='danger' size='sm'>{"Close"}</Button>
            </Modal.Footer>
        </Modal>
    )
}