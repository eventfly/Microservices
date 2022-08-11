import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { useState } from 'react';

import SubscriptionModal from './SubscriptionModal';

import PollModal from '../Feed/Poll/PollModal';
import QuizModal from '../Feed/Quiz/QuizModal'




function SubPackage({headerColor}) {


  return (
    <Card className="text-center subpackage">
      <Card.Header className="subpackage-header" style={{backgroundColor: `${headerColor}`}}>100 BDT/month</Card.Header>
      <Card.Body>
        <Card.Title>Gold Package</Card.Title>

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
        
        
        

        
        <SubscriptionModal />

       

      </Card.Body>
    </Card>
  );
}

export default SubPackage;