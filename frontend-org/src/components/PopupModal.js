import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PopupModal({show, onHide, header, bodyComponent, saveButtonText, saveButtonAction}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {bodyComponent}
      </Modal.Body>
      <Modal.Footer>
        <div className="d-grid gap-3 d-md-flex justify-content-md-start">
          <Button onClick={saveButtonAction} variant="success">
              {saveButtonText}  
          </Button>
          <Button onClick={onHide}>Close</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default PopupModal;