import Nav from 'react-bootstrap/Nav';
import {LinkContainer} from 'react-router-bootstrap';

const Header = () => {
    return ( 
        <header>
            <Nav className="justify-content-end px-3 py-2">
                <LinkContainer to="/">
                    <Nav.Link><i className="fa-solid fa-bell"></i></Nav.Link>
                </LinkContainer>
                
                <LinkContainer to="/">
                    <Nav.Link>Profile</Nav.Link>
                </LinkContainer>
            </Nav>
        </header>
  );
}
 
export default Header;