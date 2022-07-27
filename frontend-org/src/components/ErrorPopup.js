import React from 'react';
import Modal from 'react-bootstrap/Modal';

const ErrorPopup = ({error, setError}) => {

    const handleClose = () => {
        setError(null)
    };

    const showModal = (
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Ooops!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>{error}</Modal.Body>
        </Modal>
    )

    const hideModal = (
        <Modal show={false} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Ooops!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>{error}</Modal.Body>
        </Modal>
    )


    return ( 

        <>
            
            {
                error != null ? showModal : hideModal
            }

        </>

    );
}
 
export default ErrorPopup;