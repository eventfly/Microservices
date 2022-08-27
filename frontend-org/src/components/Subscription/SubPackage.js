import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { useState } from 'react';

import SubscriptionModal from './SubscriptionModal';
import StripePaymentModal from './StripePaymentModal';



function SubPackage({headerColor,isBuyOptionAvailable, pkgData}) {


  return (
    <Card className="text-center subpackage">
      <Card.Header className="subpackage-header" style={{backgroundColor: `${headerColor}`}}>{pkgData.name}</Card.Header>
      <Card.Body>
        <Card.Title> <strong> {pkgData.price} BDT/month </strong></Card.Title>

        <ul>
        <Card.Text>

            {
              pkgData && pkgData.perks.map((item, index)=>{
                return(

                  <li key={index}>
                      <i className="fa-solid fa-check" style={{
                        marginRight: '2%'
                      }}></i> 
                      {item}
                  </li>

                )
              })
            }
            
        </Card.Text>
        </ul>
        

        {/* {
          isBuyOptionAvailable ? <SubscriptionModal pkgData={pkgData} />
          : <></>
        } */}

        {
          isBuyOptionAvailable ? <StripePaymentModal pkgData={pkgData} />
          : <></>
        }
       

      </Card.Body>
    </Card>
  );
}

export default SubPackage;