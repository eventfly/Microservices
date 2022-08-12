import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function PopupModal({show, onHide, size, header, bodyComponent, saveButtonText, saveButtonAction, willDelete}) {
  return (
    <Modal
      show={show}
      backdrop='static'
      keyboard='false'
      onHide={onHide}
      // size only one of these three values: 'sm' | 'lg' | 'xl'
      size={size} 
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{backgroundColor:'#2591FE', border: '2px solid #2591FE'}}>
        <Modal.Title id="contained-modal-title-vcenter" style={{textAlign:'center',width:'100%'}}>
          {header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {bodyComponent}
      </Modal.Body>
      <Modal.Footer>
        <div className="d-grid gap-3 d-md-flex justify-content-md-start">
          <Button onClick={saveButtonAction} variant={willDelete == true ? "danger" : "success"}>
              {saveButtonText}  
          </Button>
          <Button onClick={onHide}>Close</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default PopupModal;