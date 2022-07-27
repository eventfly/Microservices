import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";


function HeaderAndFooterExample() {
  return (
    <Card className="text-center">
      <Card.Header>100 BDT/month</Card.Header>
      <Card.Body>
        <Card.Title>Gold Package</Card.Title>
        <Card.Text>
            <ul style={{"listStyle":"none"}}>
                <li>
                    <i class="fa-solid fa-check"></i> With supporting text below as a natural lead-in to additional content.
                </li>

                <li>
                    <i class="fa-solid fa-check"></i> With supporting text below as a natural lead-in to additional content.
                </li>

                <li>
                    <i class="fa-solid fa-xmark"></i> With supporting textd-in to additional content.
                </li>

            </ul>
            
        </Card.Text>

        
        <Link to="#">
            <Button variant="primary">Buy Package</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default HeaderAndFooterExample;