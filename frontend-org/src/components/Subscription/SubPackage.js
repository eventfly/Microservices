import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { useState } from 'react';

import PopupModal from '../PopupModal';
import SubscriptionModal from './SubscriptionModal';


function SubPackage({headerColor}) {

  //useState for modal
  const [modalShow, setModalShow] = useState(false);

  return (
    <Card className="text-center subpackage">
      <Card.Header className="subpackage-header" style={{backgroundColor: `${headerColor}`}}>100 BDT/month</Card.Header>
      <Card.Body>
        <Card.Title>Gold Package</Card.Title>
        <Card.Text>
            <ul>
                <li>
                    <i className="fa-solid fa-check"></i> With supporting text below as a natural lead-in to additional content.
                </li>

                <li>
                    <i className="fa-solid fa-check"></i> With supporting text below as a natural lead-in to additional content.
                </li>

                <li>
                    <i className="fa-solid fa-xmark"></i> With supporting textd-in to additional content.
                </li>

            </ul>
            
        </Card.Text>

        
        
        <Button variant="success" onClick={() => setModalShow(true)}>Buy Package</Button>
        

        <PopupModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          header="Buy Package"
          bodyComponent={<SubscriptionModal />}
          size="lg"
        />

      </Card.Body>
    </Card>
  );
}

export default SubPackage;