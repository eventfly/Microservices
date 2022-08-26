import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { useState } from 'react';

import SubscriptionModal from './SubscriptionModal';



function SubPackage({headerColor,isBuyOptionAvailable, pkgData}) {


  return (
    <Card className="text-center subpackage">
      <Card.Header className="subpackage-header" style={{backgroundColor: `${headerColor}`}}>{pkgData.name}</Card.Header>
      <Card.Body>
        <Card.Title> <strong> {pkgData.price} BDT/month </strong></Card.Title>

        <ul>
        <Card.Text>
            <li>
                <i className="fa-solid fa-check"></i> With supporting text below as a natural lead-in to additional content.
            </li>

            <li>
                <i className="fa-solid fa-check"></i> With supporting text below as a natural lead-in to additional content.
            </li>

            <li>
                <i className="fa-solid fa-xmark"></i> With supporting textd-in to additional content.
            </li>
            
        </Card.Text>
        </ul>
        

        {
          isBuyOptionAvailable ? <SubscriptionModal pkgData={pkgData} />
          : <></>
        }
       

      </Card.Body>
    </Card>
  );
}

export default SubPackage;