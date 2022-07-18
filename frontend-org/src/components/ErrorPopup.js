import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ErrorPopup = ({show, setShow, error}) => {

    const handleClose = () => setShow(false);


    return ( 

        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Ooops!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>{error}</Modal.Body>
            </Modal>

        </>

    );
}
 
export default ErrorPopup;